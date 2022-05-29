<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\CorreoElectronico;
use Illuminate\Support\Facades\DB;
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
  public function store(Request $input)
  {

    $password = $this->generarContra();

    $input->validate([
      'name' => ['required', 'string', 'max:255'],
      'user_name' => ['required', 'string', 'max:255', 'unique:users'],
      'email_principal' => ['required', 'string', 'email', 'max:255'],
      'email_secundario' => ['string', 'email', 'max:255'],
      'id_role' => ['required'],
      'id_admin' => ['required'],
      'id_sct_cnt' => ['required'],
    ]);

    $nuevo = User::create([
      'name' => $input->name,
      'user_name' => $input->user_name,
      'email'=>$input->email_principal,
      'password' => Hash::make($password),
      'id_role' => $input->id_role,
    ]);

    $corElectronico = new CorreoElectronico();
    $corElectronico->email_principal = $input->email_principal;
    $corElectronico->email_secundario = $input->email_secundario;
    $corElectronico->id_usuario = $nuevo->id;
    $corElectronico->save();

    DB::table('registro_cuentas')->insert([
      'id' => $nuevo->id,
      'id_sct_cnt' => $input->id_sct_cnt,
      'fecha_reg_cnt' => date('Y-m-d', time()),
      'estado_reg_cnt' => 'aceptada',
      'fecha_creacion_reg_cnt' => date('Y-m-d', time()),
      'fecha_actualizacion_reg_cnt' => date('Y-m-d', time()),
    ]);

    return $password;
  }

  private function generarContra()
  {
    $comb = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = [];
    $combLen = strlen($comb) - 1;
    for ($i = 0; $i < 10; $i++) {
      $n = rand(0, $combLen);
      $pass[] = $comb[$n];
    }
    return implode($pass);
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
