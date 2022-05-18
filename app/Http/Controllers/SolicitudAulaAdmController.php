<?php

namespace App\Http\Controllers;

use App\Models\Solicitudes;
use App\Models\RegistroSolicitudes;
use Illuminate\Http\Request;
use App\Models\Reserva;
use App\Models\AulaReserva;
use Illuminate\Support\Facades\DB;

class SolicitudAulaAdmController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * 
     * Obtiene solicitudes que no han sido registradas y solicitudes cuya fecha_requerida_solicitud es del dia de hoy
     * y que tambien no han sido registradas
     * Hace un ordenamiento si la solicitud cuya fecha_requerida_solicitud es para hoy entonces se pondra al principio
     * de la lista a menos que una solicitud realizada con anterioridad cuya fecha_requerida_solicitud tambien sea para el
     * día de hoy, entonces se podria detras de esa solicitud si es que otra no le gana en prioridad
     */
    public function index()
    {
        /*$solicitudesRegJson = DB::table('solicitudes')->select("id_solicitud")->get();
        $solicitudesRegJson = json_decode($solicitudesRegJson, true);
        $solicitudesReg = array();
        foreach ($solicitudesRegJson as $soli) {
            array_push($solicitudesReg, $soli['id_solicitud']);
        }
        */
        date_default_timezone_set("Etc/GMT+4");

        //solicitudes de hoy, mañana y mañana pasado
        $solicitudesCercanas = Solicitudes::join('users', 'users.id', '=', 'solicitudes.id_usuario')
            ->select(
                'id_solicitud',
                'id_usuario',
                'name',
                'materia_solicitud',
                'cantidad_estudiantes_solicitud',
                'motivo_reserva_solicitud',
                'fecha_requerida_solicitud',
                'hora_requerida_solicitud',
                'periodos_solicitud',
                'estado_solicitud',
                'solicitudes.created_at',
                'solicitudes.updated_at'
            )
            ->where("estado_solicitud", 'pendiente')
            ->where(function ($query){
                $query->where("fecha_requerida_solicitud", date('Y-m-d'))
                ->orWhere("fecha_requerida_solicitud", date('Y-m-d', strtotime('+1 day')))
                ->orWhere("fecha_requerida_solicitud", date('Y-m-d', strtotime('+2 day')));
            })
            ->orderBy("fecha_requerida_solicitud")
            ->orderBy("created_at")
            ->get();

        $solicitudes = Solicitudes::join('users', 'users.id', '=', 'solicitudes.id_usuario')
            ->select(
                'id_solicitud',
                'id_usuario',
                'name',
                'materia_solicitud',
                'cantidad_estudiantes_solicitud',
                'motivo_reserva_solicitud',
                'fecha_requerida_solicitud',
                'hora_requerida_solicitud',
                'periodos_solicitud',
                'estado_solicitud',
                'solicitudes.created_at',
                'solicitudes.updated_at'
            )
            ->where("estado_solicitud", "pendiente")
            ->orderBy("created_at")
            ->get();

        $solicitudesCercanas = json_decode($solicitudesCercanas, true);
        $solicitudes = json_decode($solicitudes, true);

        $n = count($solicitudesCercanas);
        $m = count($solicitudes);
        $i = 0;
        $j = 0;
        $res = array();
        $cont = 0; //contador de solicitudes cercanas para ponerles prioridad
        while ($i < $n || $j < $m) {
            if ($i < $n && $j < $m) {
                if (($solicitudes[$j]["fecha_requerida_solicitud"] == date('Y-m-d') && $solicitudes[$j]["hora_requerida_solicitud"] < date("H:i:s")) || $solicitudes[$j]["fecha_requerida_solicitud"] < date('Y-m-d')) {
                    $this->rechazarSoliVencida($solicitudes[$j]);
                    $j++;
                } else {
                    if ($solicitudesCercanas[$i]["fecha_requerida_solicitud"] < $solicitudes[$j]["fecha_requerida_solicitud"]) {
                        if (!in_array($solicitudesCercanas[$i], $res)) {
                            //$solicitudesCercanas[$i]["prioridad"] = "alta";
                            array_push($res, $solicitudesCercanas[$i]);
                            $i++;
                            $cont++;
                        } else {
                            $i++;
                        }
                    } else {
                        if (!in_array($solicitudes[$j], $res)) {
                            array_push($res, $solicitudes[$j++]);
                        } else {
                            $j++;
                        }
                    }
                }
            } else {
                if ($i < $n) {
                    if (!in_array($solicitudesCercanas[$i], $res)) {
                        array_push($res, $solicitudesCercanas[$i++]);
                        $cont++;
                    } else {
                        $i++;
                    }
                } else if ($j < $m) {
                    if (($solicitudes[$j]["fecha_requerida_solicitud"] == date('Y-m-d') && $solicitudes[$j]["hora_requerida_solicitud"] < date("H:i:s")) || $solicitudes[$j]["fecha_requerida_solicitud"] < date('Y-m-d')) {
                        $this->rechazarSoliVencida($solicitudes[$j]);
                        $j++;
                    } else {
                        if (!in_array($solicitudes[$j], $res)) {
                            array_push($res, $solicitudes[$j++]);
                        } else {
                            $j++;
                        }
                    }
                }
            }
        }

        for ($i = 0; $i < $cont; $i++) {
            $res[$i]["prioridad"] = "alta";
        }

        for ($i = 0; $i < count($res); $i++) {
            $docentes = Solicitudes::join('docente_solicitudes', 'docente_solicitudes.id_solicitud', '=', 'solicitudes.id_solicitud')
                ->where('solicitudes.id_solicitud', $res[$i]['id_solicitud'])
                ->select('nombre_doc_sct')
                ->get();
            $docentes = json_decode($docentes, true);
            $docentesArr = array();
            foreach ($docentes as $doc) {
                array_push($docentesArr, $doc['nombre_doc_sct']);
            }
            $grupos = Solicitudes::join('grupo_solicitudes', 'grupo_solicitudes.id_solicitud', '=', 'solicitudes.id_solicitud')
                ->where('solicitudes.id_solicitud', $res[$i]['id_solicitud'])
                ->select('codigo_grupo_sct')
                ->get();
            $grupos = json_decode($grupos, true);
            $gruposArr = array();
            foreach ($grupos as $grup) {
                array_push($gruposArr, $grup['codigo_grupo_sct']);
            }
            $res[$i]['hora_fin_solicitud'] = $this->horaFin($res[$i]['hora_requerida_solicitud'], $res[$i]['periodos_solicitud']);
            $res[$i]['docentes'] = $docentesArr;
            $res[$i]['grupos'] = $gruposArr;
        }

        return $res;
    }

    public function rechazarSoliVencida($s)
    {
        $soli = Solicitudes::findOrFail($s['id_solicitud']);
        $soli->estado_solicitud = "rechazada";
        $soli->save();

        $nuevo_registro_solicitud = new RegistroSolicitudes;
        $nuevo_registro_solicitud->id_solicitud = $s["id_solicitud"];
        $nuevo_registro_solicitud->id_usuario = $s["id_usuario"];
        $nuevo_registro_solicitud->fecha_inicio_reg_sct = $s["fecha_requerida_solicitud"];
        $nuevo_registro_solicitud->fecha_modificacion_reg_sct =  date('Y-m-d');
        $nuevo_registro_solicitud->estado_solicitud_reg_sct = 'rechazada';
        $nuevo_registro_solicitud->motivo_reg_sct = 'La fecha solicitada de reserva esta vencida';
        $nuevo_registro_solicitud->save();
    }

    private function horaFin($hora, $periodos)
    {
        #hora = 00:00:00
        $hh = substr($hora, 0, 2);
        $mm = substr($hora, 3, 2);
        $ss = substr($hora, 6, 2);
        $hh_int = intval($hh);
        $mm_int = intval($mm);
        $ss_int = intval($ss);
        $mm_int = (int)($periodos * 45 + $mm) % 60;
        $hh_int = (int)($hh + ($periodos * 45 + $mm) / 60);
        if ($mm_int < 10) {
            $mm = "0" . strval($mm_int);
        } else {
            $mm = strval($mm_int);
        }
        if ($hh_int < 10) {
            $hh = "0" . strval($hh_int);
        } else {
            $hh = strval($hh_int);
        }
        return $hh . ":" . $mm . ":" . $ss;
    }
    public function confirmarSoli(Request $datos_solicitud)
  {
    $res = 0;
    try {
      foreach ($datos_solicitud->id_aulas as $aula) {
        $reserva_existente = AulaReserva::select('id_reserva')
          ->where('id_aula', $aula)
          ->get();
      }
      if (count($reserva_existente) == 0) {
        $solicitud_existente = RegistroSolicitudes::select('id_reg_sct')
          ->where('id_solicitud', $datos_solicitud->id_solicitud)
          ->get();
        if (count($solicitud_existente) == 0) {
          $nuevo_registro_solicitud = new RegistroSolicitudes();
          $nuevo_registro_solicitud->id_solicitud =
            $datos_solicitud->id_solicitud;
          $nuevo_registro_solicitud->id_usuario = $datos_solicitud->id_usuario;
          $nuevo_registro_solicitud->fecha_inicio_reg_sct =
            $datos_solicitud->fecha_requerida_solicitud;
          $nuevo_registro_solicitud->fecha_modificacion_reg_sct = date('Y-m-d');
          $nuevo_registro_solicitud->estado_solicitud_reg_sct = 'aceptada';
          $nuevo_registro_solicitud->save();
          $id_guardado = $nuevo_registro_solicitud->id;
          Solicitudes::where(
            'id_solicitud',
            $datos_solicitud->id_solicitud
          )->update(['estado_solicitud' => 'aceptada']);
          $nueva_reserva = new Reserva();
          $nueva_reserva->id_reg_sct = $id_guardado;
          $nueva_reserva->hora_inicio_reserva = $datos_solicitud->hora_inicio;
          $nueva_reserva->hora_fin_reserva = $datos_solicitud->hora_fin;
          $nueva_reserva->fecha_reserva =
            $datos_solicitud->fecha_requerida_solicitud;
          $nueva_reserva->save();
          $id_guardada = $nueva_reserva->id;
          foreach ($datos_solicitud->id_aulas as $aula) {
            $nueva_aula_reservada = new AulaReserva();
            $nueva_aula_reservada->id_reserva = $id_guardada;
            $nueva_aula_reservada->id_aula = $aula;
            $nueva_aula_reservada->save();
          }
          $res = 1;
        } else {
          $res = 2;
        }
      }
    } catch (\Throwable $th) {
      //throw $th;
      $res = $th;
    }
    return $res;
  }

  public function rechazarSoli(Request $datos_solicitud)
  {
    $res = 0;
    $solicitud_existente = RegistroSolicitudes::select('id_reg_sct')
      ->where('id_solicitud', $datos_solicitud->id_solicitud)
      ->get();
    if (count($solicitud_existente) == 0) {
      $nuevo_registro_solicitud = new RegistroSolicitudes();
      $nuevo_registro_solicitud->id_solicitud = $datos_solicitud->id_solicitud;
      $nuevo_registro_solicitud->id_usuario = $datos_solicitud->id_usuario;
      $nuevo_registro_solicitud->fecha_inicio_reg_sct =
        $datos_solicitud->fecha_requerida_solicitud;
      $nuevo_registro_solicitud->fecha_modificacion_reg_sct = date('Y-m-d');
      $nuevo_registro_solicitud->estado_solicitud_reg_sct = 'rechazada';
      $nuevo_registro_solicitud->motivo_reg_sct = $datos_solicitud->motivo;
      $nuevo_registro_solicitud->save();
      Solicitudes::where(
        'id_solicitud',
        $datos_solicitud->id_solicitud
      )->update(['estado_solicitud' => 'rechazada']);
      $res = 1;
    }
    return $res;
  }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Solicitudes  $solicitudes
     * @return \Illuminate\Http\Response
     */
    public function show(Solicitudes $solicitudes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Solicitudes  $solicitudes
     * @return \Illuminate\Http\Response
     */
    public function edit(Solicitudes $solicitudes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Solicitudes  $solicitudes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Solicitudes $solicitudes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Solicitudes  $solicitudes
     * @return \Illuminate\Http\Response
     */
    public function destroy(Solicitudes $solicitudes)
    {
        //
    }
}