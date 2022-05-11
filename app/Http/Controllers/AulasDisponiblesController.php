<?php

namespace App\Http\Controllers;

use App\Models\Aula;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AulasDisponiblesController extends Controller
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
     * @param  \App\Models\Aula  $aula
     * @return \Illuminate\Http\Response
     */
    public function show(Aula $aula)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Aula  $aula
     * @return \Illuminate\Http\Response
     */
    public function edit(Aula $aula)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Aula  $aula
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Aula $aula)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Aula  $aula
     * @return \Illuminate\Http\Response
     */
    public function destroy(Aula $aula)
    {
        //
    }
    public function aulasDisponibles(Request $request){
        $fecha = $request->fecha;
        $horaIni = $request->hora_ini;
        $cantAlum = $request->cantAlum;
        //$facultad = $request->facultad; //para facultades se tendria que añadir en la consulta y en la bd
        $aulasNoDispo = DB::table('reservas')->join('aulas_reservadas', 'reservas.id_reserva', '=', 'aulas_reservadas.id_reserva')
            ->where(function ($query) use ($fecha){
                $query->where('reservas.fecha_reserva','=',$fecha);
            })->where(function ($query) use ($horaIni){
                $query->where('reservas.hora_inicio_reserva','<=',$horaIni)
                ->where('reservas.hora_fin_reserva','>',$horaIni);
            })
            ->get();
        $aulasNoDispoArr = array();
        foreach($aulasNoDispo as $aula){
            array_push($aulasNoDispoArr,$aula->id_aula_res);
        }

        $aulasDispo = Aula::whereNotIn('id_aula',$aulasNoDispoArr)
            ->get();
        return $aulasDispo;
    }
}
