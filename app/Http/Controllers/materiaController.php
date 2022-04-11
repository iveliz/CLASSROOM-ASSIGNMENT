<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MateriaDocente;
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
    public function show($idDocentes)
    {
        foreach($idDocentes as $idDocente){
          $contador=0;
          //materias como objeto?sacar solo el nombre
          $materiasIdDocente = docente_materias:: find($idDocente)->id_materia;
          
          $listMateriasDocente= [];
          $listMateriasDocente=Arr::add( $listMateriasDocente,count, $materiasIdDocente);
          $contador=$contador+1;
        }
        $materiasComun=array();
        $tamaño=count($listMateriasDocente);
        for ($x = 0; $x < $tamaño-1; $x++) {
            $ListMaterias= $listMateriasDocente[$x];
            $tamañoLista=count($ListMaterias);
            for ($i = 0; $i <  $tamañoLista; $i++) {
                $materia = $listMateriasDocente[$i];
                 if (in_array($materia,$listMateriasDocente[$x+1] ) and !(in_array($materia,$materiasComun[$x+1] ))){
                          array_push($materiasComun, $materia);
                     }
                    }
                
            
        }
        return Inertia::render('solicitar', ['materiasComun' => $materiasComun]);
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
