<?php

namespace App\Http\Controllers;

use App\Models\Solicitudes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SolicitudAulaAdmController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * 
     * Obtiene solicitudes que no han sido registradas y solicitudes cuya fecha_requerida_solicitud es del dia de hoy
     * y que tambien no han sido registradas
     * Hace un ordenamiento si la solicitud cuya fecha_requerida_solicitud es para hoy entonces se pondra al principio
     * de la lista a menos que una solicitud realizada con anterioridad cuya fecha_requerida_solicitud tambien sea para el
     * día de hoy, entonces se podria detras de esa solicitud si es que otra no le gana en prioridad
     */
    public function index()
    {
        $solicitudesRegJson = DB::table('registro_solicitudes')->select("id_solicitud")->get();
        $solicitudesRegJson = json_decode($solicitudesRegJson, true);
        $solicitudesReg = array();
        foreach($solicitudesRegJson as $soli){
            array_push($solicitudesReg,$soli['id_solicitud']);
        }
        
        $solicitudesHoy = Solicitudes::where("fecha_requerida_solicitud",date('Y/m/d'))
            ->whereNotIn("id_solicitud",$solicitudesReg)
            ->get();
        
        $solicitudes = Solicitudes::whereNotIn("id_solicitud",$solicitudesReg)->get();

        return $solicitudes;
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
     * @param  \App\Models\Solicitudes  $solicitudes
     * @return \Illuminate\Http\Response
     */
    public function show(Solicitudes $solicitudes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Solicitudes  $solicitudes
     * @return \Illuminate\Http\Response
     */
    public function edit(Solicitudes $solicitudes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Solicitudes  $solicitudes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Solicitudes $solicitudes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Solicitudes  $solicitudes
     * @return \Illuminate\Http\Response
     */
    public function destroy(Solicitudes $solicitudes)
    {
        //
    }
}
