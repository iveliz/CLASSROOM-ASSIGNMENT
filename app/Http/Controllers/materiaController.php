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
        if (is_array($request) || is_object($request)){
        foreach( $request as  $idDoc){
            $idDocen= $idDoc->id;
           array_push($ides,$idDocen); 
        }
        
    }
       $ids= $ides;
        $tamaño=count($ids);
      
        $MateriaPorId = DocenteMateria::join("materias", "materias.id_materia", "=", "docente_materias.id_materia")
        ->whereIn('docente_materias.id_usuario', $ids)
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
                foreach($MateriaPorIdComun as $MateriaP){
                    error_log( $MateriaP-> nombre_materia. "\n hola");
               //imprimir
                }
                
                return Inertia::render('SolicitarPage', [
                    'materiasIdDocente' =>$MateriaPorIdComun
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
