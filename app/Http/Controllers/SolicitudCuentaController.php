<?php

namespace App\Http\Controllers;
use App\Models\SolicitudCuenta;
use App\Models\MateriaSolicitada;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;;
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
      DB::raw("(DATE_FORMAT(created_at, '%d-%m-%Y')) as fecha")
    )
      ->orderBy('created_at')
      ->get();

    return $solicitud;
  }
}
