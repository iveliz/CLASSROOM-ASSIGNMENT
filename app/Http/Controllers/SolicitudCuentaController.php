<?php

namespace App\Http\Controllers;
use App\Models\SolicitudCuenta;
use App\Models\MateriaSolicitada;
use App\Models\RegistroCuenta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
      DB::raw("(DATE_FORMAT(created_at, '%d-%m-%Y')) as fecha")
    )
      ->where('estado_sct_cnt', 'Pendiente')
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
            strtolower($soli->usuario_sct_cnt),
            strtolower($usuariosActuales[$i]->user_name)
          ) <= 2 ||
          $soli->correo_principal_sct_cnt == $usuariosActuales[$i]->user_name
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
      $solicitud_existente = SolicitudCuenta::select('id_sct_cnt')
        ->where('usuario_sct_cnt', $datos_solicitud->usuario_sct_cnt)
        ->where('correo_principal_sct_cnt', $datos_solicitud->correo_principal)
        ->get();
      $usuariosActuales = DB::table('users')
        ->join(
          'correo__electronicos',
          'users.id',
          '=',
          'correo__electronicos.id_usuario'
        )
        ->select('users.user_name', 'correo__electronicos.email_principal')
        ->where('users.user_name', $datos_solicitud->usuario_sct_cnt)
        ->Orwhere(
          'correo__electronicos.email_principal',
          $datos_solicitud->correo_principal
        )
        ->get();
      if (count($solicitud_existente) == 0) {
        if (count($usuariosActuales) == 0) {
          $nueva_solicitud = new SolicitudCuenta();
          $nueva_solicitud->nombre_sct_cnt = $datos_solicitud->nombre_sct_cnt;
          $nueva_solicitud->usuario_sct_cnt = $datos_solicitud->usuario_sct_cnt;
          $nueva_solicitud->correo_principal_sct_cnt =
            $datos_solicitud->correo_principal;
          $nueva_solicitud->correo_secundario_sct_cnt =
            $datos_solicitud->correo_secundario;
          $nueva_solicitud->estado_sct_cnt = 'Pendiente';
          $nueva_solicitud->save();
          $res = 1;
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
        $nueva_solicitud->estado_reg_cnt = 'Aceptada';
        $nueva_solicitud->save();
        SolicitudCuenta::where(
          'id_sct_cnt',
          $datos_solicitud->id_sct_cnt
        )->update(['estado_sct_cnt' => 'Aceptada']);
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
        $nueva_solicitud->estado_reg_cnt = 'Rechazada';
        $nueva_solicitud->save();
        SolicitudCuenta::where(
          'id_sct_cnt',
          $datos_solicitud->id_sct_cnt
        )->update(['estado_sct_cnt' => 'Rechazada']);
        $res = 1;
      }
    } catch (\Throwable $th) {
      $res = $th;
    }
    return $res;
  }
}
