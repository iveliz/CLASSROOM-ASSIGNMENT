<?php

namespace App\Http\Controllers;

use App\Models\Aula;
use App\Models\Vecino;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr\Cast\Object_;
use stdClass;

use function PHPUnit\Framework\isEmpty;

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
        $cantAlum = $request->capacidad;
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
            ->take(5)
            ->get();

        if(empty($aulasDispo)){
            $aulasDispo = Aula::whereNotIn('id_aula',$aulasNoDispoArr)
            ->take(10)
            ->get();
            if(empty($aulasDispo)){
                $aulasDispo = Aula::whereNotIn('id_aula',$aulasNoDispoArr)
                ->get();
            }
        }
        
        $res = array();
        
        foreach($aulasDispo as $aulas){
            $subres = array();
            $vecinos = array();
            $vecinos = $this->vecinos($aulas->id_aula,$cantAlum-($aulas->capacidad_aula),$aulasNoDispoArr);
            
            $aulaAct = new stdClass();
            $aulaAct->id_aula = $aulas->id_aula;
            $aulaAct->numero_aula = $aulas->numero_aula;
            $aulaAct->letra_aula = $aulas->letra_aula;
            $aulaAct->capacidad_aula = $aulas->capacidad_aula;

            array_unshift($vecinos,$aulaAct);

            if(count($vecinos)>1 or $aulaAct->capacidad_aula>=$cantAlum){
                $subres["vecinos"] = $vecinos;
                $subres["capacidad_total"] = $this->capTotal($vecinos);
                array_push($res,$subres);
            }
        }
        
        return $res;
    }

    private function vecinos($id, $capacidad, $aulasNoDispo){
        $vecinos = Vecino::where("vecinos.id_aula",$id)
            ->whereNotIn("vecinos.id_aula_vecina",$aulasNoDispo)
            ->orderBy('distancia')
            ->get();
        $idVecinos = array();
        foreach($vecinos as $veci){
            array_push($idVecinos,$veci->id_aula_vecina);
        }

        #->select('aulas.id_aula','aulas.numero_aula','aulas.letra_aula','aulas.capacidad_aula','aulas.ubicacion_aula','aulas.piso_aula','aulas.descripcion_aula','aulas.hora_apertura_aula','aulas.hora_cierre_aula')
        $aulas = Aula::whereIn('id_aula',$idVecinos)
            ->select('aulas.id_aula','aulas.numero_aula','aulas.letra_aula','aulas.capacidad_aula')
            ->get();
        $i = 0;
        $total = 0;
        $res = array();
        foreach($aulas as $au){
            if($total <= $capacidad){
                $au->distancia = $vecinos[$i]->distancia;
                $i++;
                $total = $total + ($au->capacidad_aula);
                array_push($res,$au);
            }
        }
        return $res;
    }

    private function capTotal($aulas){
        $total = 0;
        foreach($aulas as $au){
            $total = $total + $au->capacidad_aula;
        }
        return $total;
    }
}
