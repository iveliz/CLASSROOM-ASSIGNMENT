<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grupo;
use App\Models\Materia;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class materiaController extends Controller
{
    /**
     * Display a listing of the resource.
      $idDocentes
     * @return \Illuminate\Http\Response
     */
    
    public function index()
    {
 
        return Inertia::render('SolicitarPage');
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
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
      
        $ides=array();
        $ides=$request->docentesId;
        $ids= $ides;
        $tamaño=count($ids);
      
        $MateriaPorId = Grupo::join("materias", "materias.id_materia", "=", "grupos.id_materia")
        ->whereIn('grupos.id_usuario', $ids)
        ->groupBY("materias.id_materia")
        ->selectRaw("materias.id_materia,count(*)as cuantos")
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
                ->whereIn('id_materia',$materiasComun)
                ->get();
               
                return Inertia::render('SolicitarPage', [
                    'materiasIdDocente' => $MateriaPorIdComun
                    ]);
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