<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DocenteMateria;
use App\Models\Materia;
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
        $ids= array(4,2);
        $tamaño=count($ids);
      
        $MateriaPorId = DocenteMateria::join("materias","id_materia","=","id")
        ->whereIn('id_usuario',$ids)
        ->groupBY("id_materia")
        ->selectRaw("id_materia,count(*)as cuantos")
        ->get();

        $materiasComun=array();
        foreach( $MateriaPorId as  $cuantasMaterias){
              $cuanto= $cuantasMaterias->cuantos; 
              if($cuanto==$tamaño){
                $idMat= $cuantasMaterias->id_materia;
                array_push($materiasComun,  $idMat);
              }      
        }
               $MateriaPorIdComun =Materia::  
                select('materias.nombre_materia')
                ->whereIn('id',$materiasComun)
                ->get();
        return Inertia::render('Materias', [
        'materiasIdDocente' => $MateriaPorIdComun
        ]);
       //fun
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
