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
use App\Models\SolicitudCuenta;
use App\Models\Carrera;
use App\Models\Materia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Mail;
use App\Mail\userMail;

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

    $usuarioActual = DB::table('users')
      ->select('users.user_name')
      ->where('users.user_name', $input->user_name)
      ->get();
    $correoActual = CorreoElectronico::select('email_principal')
      ->where('email_principal', $input->email_principal)
      ->get();

    $res = 0;
    try {
      if (count($usuarioActual) == 0) {
        if (count($correoActual) == 0) {
          $nuevo = User::create([
            'name' => $input->name,
            'user_name' => $input->user_name,
            'email' => $input->email_principal,
            'password' => Hash::make($password),
            'id_role' => $input->id_role,
          ]);

          $send = new User();

          $send->user_name = $input->user_name;
          $send->email = $input->email_principal;
          $send->password = $password;
          $send->id_role = $input->id_role;

          $corElectronico = new CorreoElectronico();
          $corElectronico->email_principal = $input->email_principal;
          $corElectronico->email_secundario = $input->email_secundario;
          $corElectronico->id_usuario = $nuevo->id;
          $corElectronico->save();

          DB::table('registro_cuentas')->insert([
            'id' => $input->id_admin,
            'id_sct_cnt' => $input->id_sct_cnt,
            'estado_reg_cnt' => 'aceptada',
          ]);

          SolicitudCuenta::where('id_sct_cnt', $input->id_sct_cnt)->update([
            'estado_sct_cnt' => 'aceptada',
          ]);

          Mail::to($input->email_principal)->send(new userMail($send));

          $res = 1;
        } else {
          $res = 2;
        }
      } else {
        $res = 3;
      }
    } catch (\Throwable $th) {
      $res = $th;
    }
    return $res;
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

  public function agregarMateria(Request $request)
  {
    $carrera = $request->id_carrera;
    $materia = $request->id_materia;
    $usuario = $request->id_usuario;
    $grupo = $request->id_grupo;
    $codgrupo = $request->codigo_grupo;
    $res = 0;
    try {
      $materiaOcupada = Grupo::join(
        'materias',
        'materias.id_materia',
        '=',
        'grupos.id_materia'
      )
        ->join('carreras', 'carreras.id_carrera', '=', 'materias.id_carrera')
        ->select('materias.id_materia')
        ->where('carreras.id_carrera', '=', $carrera)
        ->where('materias.id_materia', '=', $materia)
        ->where('grupos.id_grupo', '=', $grupo)
        ->get();
      if (count($materiaOcupada) == 0) {
        $grupoDocente = new Grupo();
        $grupoDocente->id_materia = $materia;
        $grupoDocente->id_usuario = $usuario;
        $grupoDocente->codigo_grupo = $codgrupo;
        $grupoDocente->save();
        $res = 1; //Docente con nuevo grupo en materias
      } else {
        Grupo::join('materias', 'materias.id_materia', '=', 'grupos.id_materia')
          ->join('carreras', 'carreras.id_carrera', '=', 'materias.id_carrera')
          ->where('carreras.id_carrera', '=', $carrera)
          ->where('materias.id_materia', '=', $materia)
          ->where('grupos.id_grupo', '=', $grupo)
          ->update(['grupos.id_usuario' => $usuario]);
        $res = 2; //Docente de reemplazo de grupo en materias
      }
    } catch (\Throwable $th) {
      $res = $th;
    }
    return $res;
  }

  public function eliminarMateria(Request $request)
  {
    $carrera = $request->id_carrera;
    $materia = $request->id_materia;
    $usuario = $request->id_usuario;
    $grupo = $request->id_grupo;
    $res = 0;
    try {
      Grupo::where('grupos.id_grupo', '=', $grupo)
        ->where('grupos.id_materia', '=', $materia)
        ->where('grupos.id_usuario', '=', $usuario)
        ->delete();
      $res = 1;
    } catch (\Throwable $th) {
      $res = $th;
    }
    return $res;
  }
}
