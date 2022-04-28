<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aula;
use App\Models\Reserva;
use App\Models\AulaReserva;
use App\Models\RegistroSolicitud;

class AulaController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $id = 1;
    $SolicitudEstado = Reserva::join(
      'registro_solicitudes',
      'registro_solicitudes.id_reg_sct',
      '=',
      'reservas.id_reg_sct'
    )
      ->select(
        'registro_solicitudes.id_reg_sct',
        'registro_solicitudes.estado_solicitud_reg_sct'
      )
      ->where('registro_solicitudes.id_solicitud', '=', $id)
      ->get();
    $Estado = 'Aceptada';
    if ($Estado == 'Aceptada') {
      $idSoli = 1;

      $Reservas = Reserva::select('id_reserva')
        ->where('id_reg_sct', '=', $idSoli)
        ->get();
      foreach ($Reservas as $reserva) {
        $idres = $reserva->id_reserva;
      }
      $AulaReserva = Aula::join(
        'aulas_reservadas',
        'aulas_reservadas.id_aula',
        '=',
        'aulas.id_aula'
      )
        ->select(
          'aulas.numero_aula',
          'aulas.letra_aula',
          'aulas.capacidad_aula',
          'aulas.ubicacion_aula'
        )
        ->where('aulas_reservadas.id_reserva', '=', $idres)
        ->get();
    }
    if ($Estado == 'Rechazada') {
      $AulaReserva = 'Aula NO reservada, Solicitud Rechazada';
    }
    return $AulaReserva;
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function AulaElegida(Request $request)
  {
    $id = $request->id;
    $SolicitudEstado = Reserva::join(
      'registro_solicitudes',
      'registro_solicitudes.id_reg_sct',
      '=',
      'reservas.id_reg_sct'
    )
      ->select(
        'registro_solicitudes.id_reg_sct',
        'registro_solicitudes.estado_solicitud_reg_sct'
      )
      ->where('registro_solicitudes.id_solicitud', '=', $id)
      ->get();
    $Estado = 'Aceptada';
    if ($Estado == 'Aceptada') {
      $idSoli = 1;

      $Reservas = Reserva::select('id_reserva')
        ->where('id_reg_sct', '=', $idSoli)
        ->get();
      foreach ($Reservas as $reserva) {
        $idres = $reserva->id_reserva;
      }
      $AulaReserva = Aula::join(
        'aulas_reservadas',
        'aulas_reservadas.id_aula',
        '=',
        'aulas.id_aula'
      )
        ->select(
          'aulas.numero_aula',
          'aulas.letra_aula',
          'aulas.capacidad_aula',
          'aulas.ubicacion_aula'
        )
        ->where('aulas_reservadas.id_reserva', '=', $idres)
        ->get();
    }
    /*if ($Estado == 'Rechazada') {
      $AulaReserva = 'Aula NO reservada, Solicitud Rechazada';
    }
    return $AulaReserva;*/
    return $SolicitudEstado;
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
}
