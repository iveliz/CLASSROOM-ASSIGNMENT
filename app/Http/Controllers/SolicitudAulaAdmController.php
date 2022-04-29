<?php

namespace App\Http\Controllers;

use App\Models\Solicitudes;
use App\Models\RegistroSolicitudes;
use Illuminate\Http\Request;
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
        $solicitudesRegJson = DB::table('registro_solicitudes')->select("id_solicitud")->get();
        $solicitudesRegJson = json_decode($solicitudesRegJson, true);
        $solicitudesReg = array();
        foreach ($solicitudesRegJson as $soli) {
            array_push($solicitudesReg, $soli['id_solicitud']);
        }

        date_default_timezone_set("Etc/GMT+4");

        //solicitudes de hoy, mañana y mañana pasado
        $solicitudesCercanas = Solicitudes::where("fecha_requerida_solicitud", date('Y-m-d'))
        ->orWhere("fecha_requerida_solicitud", date('Y-m-d', strtotime('+1 day')))
        ->orWhere("fecha_requerida_solicitud", date('Y-m-d', strtotime('+2 day')))
        ->whereNotIn("id_solicitud", $solicitudesReg)
            ->orderBy("fecha_requerida_solicitud")
            ->orderBy("created_at")
            ->get();

        $solicitudes = Solicitudes::whereNotIn("id_solicitud", $solicitudesReg)
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
                if (($solicitudes[$j]["fecha_requerida_solicitud"] == date('Y-m-d') && $solicitudesCercanas[$i]["hora_requerida_solicitud"] < date("H:i:s")) || $solicitudes[$j]["fecha_requerida_solicitud"] < date('Y-m-d')) {
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
                    if (($solicitudes[$j]["fecha_requerida_solicitud"] == date('Y-m-d') && $solicitudesCercanas[$i]["hora_requerida_solicitud"] < date("H:i:s")) || $solicitudes[$j]["fecha_requerida_solicitud"] < date('Y-m-d')) {
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

        for($i = 0; $i<$cont; $i++){
            $res[$i]["prioridad"] = "alta";
        }

        return $res;
    }

    public function rechazarSoliVencida($s){
        $nuevo_registro_solicitud = new RegistroSolicitudes;
        $nuevo_registro_solicitud->id_solicitud = $s["id_solicitud"];
        $nuevo_registro_solicitud->id_usuario = $s["id_usuario"];
        $nuevo_registro_solicitud->fecha_inicio_reg_sct = $s["fecha_requerida_solicitud"];
        $nuevo_registro_solicitud->fecha_modificacion_reg_sct =  date('Y-m-d');
        $nuevo_registro_solicitud->estado_solicitud_reg_sct = 'rechazado';
        $nuevo_registro_solicitud->motivo_reg_sct = 'La fecha solicitada de reserva esta vencida';
        $nuevo_registro_solicitud->save();
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
