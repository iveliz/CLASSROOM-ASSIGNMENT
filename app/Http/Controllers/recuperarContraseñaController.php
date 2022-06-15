<?php

namespace App\Http\Controllers;

use App\Mail\RecuperarContraseñaMail;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Models\CorreoElectronico;
use Illuminate\Support\Facades\Mail;
use App\Mail\userMail;

class recuperarContraseñaController extends Controller
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
            return 1;
            Mail::to($request->email_principal)->send(new RecuperarContraseñaMail());
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
    public function update(Request $request, $id)
    {
        /*
        $user->forceFill([
            'password' => Hash::make($input['password']),
        ])->save();
        */
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
