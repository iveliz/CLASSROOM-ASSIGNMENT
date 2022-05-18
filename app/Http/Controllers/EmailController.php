<?php

namespace App\Http\Controllers;

use App\Models\CorreoElectronico;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
        
       
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
        $corElectronico=new CorreoElectronico();
        $corElectronico->email_principal=$request->email_principal;
        $corElectronico->email_secundario=$request->email_secundario;
        $corElectronico->id_usuario=$request->id_usuario;
        $corElectronico->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $id=$request->id_usuario;
        $correos= CorreoElectronico:: 
        select("email_secundario","email_principal")
        ->where('id_usuario', $id)
        ->get();
        return $correos;
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
       CorreoElectronico::where('id_usuario', $request->id_usuario)
      -> update(['email_secundario' => $request->email_secundario,'email_principal' 
      => $request->email_principal]);
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
