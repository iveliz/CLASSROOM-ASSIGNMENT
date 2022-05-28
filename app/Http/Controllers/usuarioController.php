<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Grupo;
use App\Models\Materia;
use Illuminate\Support\Facades\Redirect;
class usuarioController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $docentesComun = User::select('id', 'name')->get();
    return $docentesComun;
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
    $request->validate([
      'name' => 'required',
      'user_name' => 'required',
      'email_principal' => 'required',
      'rol' => 'required',
    ]);
  }

  private function generarContra()
  {
    $comb = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = [];
    $combLen = strlen($comb) - 1;
    for ($i = 0; $i < 8; $i++) {
      $n = rand(0, $combLen);
      $pass[] = $comb[$n];
    }
    return (implode($pass)); 
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

  public function ObtenerDocentes()
  {
    $docentesComun = User::select('id', 'name')->get();
    return $docentesComun;
  }

  public function ObtenerDocentesId(Request $request)
  {
    $id = $request->Id;
    $materiasNomDocente = Grupo::join(
      'users',
      'grupos.id_usuario',
      '=',
      'users.id'
    )
      ->select('grupos.id_materia')
      ->where('users.id', $id)
      ->get();
    $docentesidMaterias = Grupo::join(
      'materias',
      'grupos.id_materia',
      '=',
      'materias.id_materia'
    )
      ->select('grupos.id_usuario')
      ->whereIn('materias.id_materia', $materiasNomDocente)
      ->get();
    $docentesComun = User::select('name', 'id')
      ->whereIn('id', $docentesidMaterias)
      ->get();
    return $docentesComun;
  }
}
