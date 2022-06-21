<?php

namespace App\Http\Controllers;

use App\Mail\RecuperarContraseña;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Models\CorreoElectronico;
use Illuminate\Support\Facades\Mail;
use App\Mail\userMail;
use Illuminate\Support\Facades\Hash;

class recuperarContraseñaController extends Controller
{
  public $rute = 'http://127.0.0.1:8000/';
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
    public function show(Request $request)
    {
        $usuarioActual = DB::table('users')
        ->where('users.user_name', $request->user_name)
        ->get();
         
          if (count($usuarioActual) == 0) {
            return 0;
          }else{
            return 1;
          }
    }

    public function verifyEmail(Request $request)
    {
        $correoActual = CorreoElectronico::
        where('email_principal',$request->correo)->orWhere('email_secundario',$request->correo)
        ->get();
        if (count( $correoActual) == 0) {
            return 0;
          }else{


            $link= $this->rute.'reset-password/';
            Mail::to($request->correo)->send(new RecuperarContraseña($link));
            return 1;
           
          }
         
        
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
    public function update(Request $request)
    {
        $user_name=$request->nombre_usuario;
        $pass=$request->contraseña;


          $user=DB::table('users')
        ->where('users.user_name', $user_name)
        ->update(['users.password' => Hash::make($pass)]);
      
        return $user;
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
