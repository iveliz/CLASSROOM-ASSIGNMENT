<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DocenteMateria;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class materiaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ids= array(1,2);
      
        $MateriaPorId = DocenteMateria::join("materias","id_materia","=","id_materia")
        ->whereIn('docente_materias.id_usuario',$ids)
        ->select('materias.nombre_materia','docente_materias.id_usuario')
        ->get();
        
        return Inertia::render('Materias', [
            'materiasIdDocente' => $MateriaPorId
        ]);
       
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
    public function show($idDocentes)
    {
    
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
