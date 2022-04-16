<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use app\Models\User;
use App\Models\DocenteMateria;
use app\Models\Materia;
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
    $docentesComun = User::select('name')->get();
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
      'id_usuario' => 'require',
      'nombre_usuario' => 'require',
      'email_usuario' => 'require',
      'contrasenia_usuario' => 'require',
      'token_recordado_usuario' => 'require',
      'rol_usuario' => 'require',
    ]);
  }

  /**
   * Display the specified resource.
   *
   * @param  string  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $materiasNomDocente = DocenteMateria::join(
      'users',
      'docente_materias.id_usuario',
      '=',
      'users.id'
    )
      ->select('docente_materias.id_materia')
      ->where('users.name', 'LIKE', $id)
      ->get();
    $docentesidMaterias = DocenteMateria::join(
      'materias',
      'docente_materias.id_materia',
      '=',
      'materias.id_materia'
    )
      ->select('docente_materias.id_usuario')
      ->whereIn('materias.id_materia', $materiasNomDocente)
      ->get();
    $docentesComun = User::select('name', 'id')
      ->whereIn('id', $docentesidMaterias)
      ->get();
    return $docentesComun;
  }
  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show2($id)
  {
    $materiasNomDocente = DocenteMateria::join(
      'users',
      'docente_materias.id_usuario',
      '=',
      'users.id'
    )
      ->select('docente_materias.id_materia')
      ->where('users.id', $id)
      ->get();
    $docentesidMaterias = DocenteMateria::join(
      'materias',
      'docente_materias.id_materia',
      '=',
      'materias.id_materia'
    )
      ->select('docente_materias.id_usuario')
      ->whereIn('materias.id_materia', $materiasNomDocente)
      ->get();
    $docentesComun = User::select('name', 'id')
      ->whereIn('id', $docentesidMaterias)
      ->get();
    return $docentesComun;
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
