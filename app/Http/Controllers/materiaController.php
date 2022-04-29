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
        $ides=$request->docentesId;
        $ids= $ides;
        $tamaño=count($ids);
        $mats1=collect();
        $mats2=collect();
        
        
        $bb=true;
        for ($x = 0; $x < $tamaño; $x++) {
           if($bb){
            $mats1=collect(Grupo::join("materias", "materias.id_materia", "=", "grupos.id_materia")
            ->select("materias.id_materia","nombre_materia")
            ->where('grupos.id_usuario','=', $ids[$x])
            ->groupBY("materias.id_materia")
            ->get());
            $bb=false;
           }else{
               $mats2=collect( Grupo::join("materias", "materias.id_materia", "=", "grupos.id_materia")
               ->select("materias.id_materia","nombre_materia")
               ->where('grupos.id_usuario','=', $ids[$x])
               ->groupBY("materias.id_materia")
               ->get());
               $mats1=$mats1->intersect($mats2);

           }
        }

        $res = array();
        foreach($mats1 as $value){
            array_push($res,$value);
        }
            
    return $res;
                    
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