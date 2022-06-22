<?php

namespace App\Http\Controllers;
use App\Models\SolicitudCuenta;
use App\Models\MateriaSolicitada;
use App\Models\RegistroCuenta;
use App\Models\CorreoElectronico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Mail\userMailRechazo;
use App\Models\RegistroSolicitudes;
use App\Models\User;
use App\Notifications\SoliNotification;
use Illuminate\Support\Facades\Mail;
class SolicitudCuentaController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    //
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
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    //
  }

  /**
   * Obtener Solicitudes de cuenta por orden de llegada.
   *
   * @return \Illuminate\Http\Response
   */
  public function verSolicitud()
  {
    $solicitud = SolicitudCuenta::select(
      'id_sct_cnt',
      'nombre_sct_cnt',
      'usuario_sct_cnt',
      'correo_principal_sct_cnt',
      'correo_secundario_sct_cnt',
      'created_at',
      DB::raw("(DATE_FORMAT(created_at, '%d-%m-%Y')) as fecha")
    )
      ->where('estado_sct_cnt', 'pendiente')
      ->orderBy('fecha')
      ->get();

    $usuariosActuales = DB::table('users')
      ->join(
        'correo__electronicos',
        'users.id',
        '=',
        'correo__electronicos.id_usuario'
      )
      ->select(
        'users.name',
        'users.user_name',
        'correo__electronicos.email_principal'
      )
      ->get();
    foreach ($solicitud as $soli) {
      $i = 0;
      $encontrado = false;
      while ($i < count($usuariosActuales) && !$encontrado) {
        if (
          levenshtein(
            strtolower($soli->nombre_sct_cnt),
            strtolower($usuariosActuales[$i]->name)
          ) <= 5
        ) {
          $soli->usuarioSimilar = $usuariosActuales[$i];
          $encontrado = true;
        }
        $i = $i + 1;
      }
    }

    return $solicitud;
  }

  public function crearSolicitudCuenta(Request $datos_solicitud)
  {
    $res = 0;
    try {
      $usuario_solicitud_existente = SolicitudCuenta::select('id_sct_cnt')
        ->where('usuario_sct_cnt', $datos_solicitud->usuario_sct_cnt)
        ->get();
      $correo_solicitud_existente = SolicitudCuenta::select('id_sct_cnt')
        ->where('correo_principal_sct_cnt', $datos_solicitud->correo_principal)
        ->get();
      $usuarioActual = DB::table('users')
        ->select('users.user_name')
        ->where('users.user_name', $datos_solicitud->usuario_sct_cnt)
        ->get();
      $correoActual = CorreoElectronico::select('email_principal')
        ->where('email_principal', $datos_solicitud->correo_principal)
        ->get();
      if (count($usuario_solicitud_existente) == 0) {
        if (count($correo_solicitud_existente) == 0) {
          if (count($usuarioActual) == 0) {
            if (count($correoActual) == 0) {
              $nueva_solicitud = new SolicitudCuenta();
              $nueva_solicitud->nombre_sct_cnt =
                $datos_solicitud->nombre_sct_cnt;
              $nueva_solicitud->usuario_sct_cnt =
                $datos_solicitud->usuario_sct_cnt;
              $nueva_solicitud->correo_principal_sct_cnt =
                $datos_solicitud->correo_principal;
              $nueva_solicitud->correo_secundario_sct_cnt =
                $datos_solicitud->correo_secundario;
              $nueva_solicitud->estado_sct_cnt = 'pendiente';
              $nueva_solicitud->save();

              $this->enviarNotificacion($datos_solicitud->usuario_sct_cnt,$nueva_solicitud->id);
              $res = 1;
            } else {
              $res = 5;
            }
          } else {
            $res = 4;
          }
        } else {
          $res = 3;
        }
      } else {
        $res = 2;
      }
    } catch (\Throwable $th) {
      $res = $th;
    }
    return $res;
  }
  public function confirmarSolicitudCuenta(Request $datos_solicitud)
  {
    $res = 0;
    try {
      $solicitud_existente = RegistroCuenta::select('id_reg_cnt')
        ->where('id_sct_cnt', $datos_solicitud->id_sct_cnt)
        ->get();
      if (count($solicitud_existente) == 0) {
        $nueva_solicitud = new RegistroCuenta();
        $nueva_solicitud->id = $datos_solicitud->id;
        $nueva_solicitud->id_sct_cnt = $datos_solicitud->id_sct_cnt;
        $nueva_solicitud->estado_reg_cnt = 'aceptada';
        $nueva_solicitud->save();
        SolicitudCuenta::where(
          'id_sct_cnt',
          $datos_solicitud->id_sct_cnt
        )->update(['estado_sct_cnt' => 'aceptada']);
        $res = 1;
      }
    } catch (\Throwable $th) {
      $res = $th;
    }
    return $res;
  }
  public function rechazarSolicitudCuenta(Request $datos_solicitud)
  {
    $res = 0;
    try {
      $solicitud_existente = RegistroCuenta::select('id_reg_cnt')
        ->where('id_sct_cnt', $datos_solicitud->id_sct_cnt)
        ->get();
      if (count($solicitud_existente) == 0) {
        $nueva_solicitud = new RegistroCuenta();
        $nueva_solicitud->id = $datos_solicitud->id;
        $nueva_solicitud->id_sct_cnt = $datos_solicitud->id_sct_cnt;
        $nueva_solicitud->estado_reg_cnt = 'rechazada';
        $nueva_solicitud->save();
        SolicitudCuenta::where(
          'id_sct_cnt',
          $datos_solicitud->id_sct_cnt
        )->update(['estado_sct_cnt' => 'rechazada']);
        $res = 1;

        $send = new RegistroSolicitudes();
        $send->motivo_reg_sct = $datos_solicitud->motivo;

        Mail::to($datos_solicitud->correoDocente)->send(
          new userMailRechazo($send)
        );
      }
    } catch (\Throwable $th) {
      $res = $th;
    }
    return $res;
  }
  public function enviarNotificacion($nombre,$id_sct_cnt){
    //$usuario = User::where('id',$id_usuario)->first();
    //$nombre = $usuario->user_name;
    $mensaje = "Ha recibido una nueva solicitud (Registro) de: ".$nombre;
    //$usuario->notify(new SoliNotificationDB($mensaje,$id_solicitud));
    User::where('id_role',1)
        ->each(function(User $user) use ($mensaje,$id_sct_cnt){
            $user->notify(new SoliNotification($mensaje,$id_sct_cnt,'soli_cuenta'));
        }); 
  }
}
