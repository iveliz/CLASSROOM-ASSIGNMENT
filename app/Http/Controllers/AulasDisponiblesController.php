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
    public function aulasDisponibles(Request $request)
    {
        $fecha = $request->fecha;
        $horaIni = $request->hora_ini;
        $horaFin = $request->hora_fin;
        $cantAlum = $request->capacidad;
        //$facultad = $request->facultad; //para facultades se tendria que añadir en la consulta y en la bd
        $bioseguridad = TRUE;
        if($bioseguridad){
            $cantAlum = $cantAlum*2;
        }
        $aulasNoDispo = DB::table('reservas')->join('aulas_reservadas', 'reservas.id_reserva', '=', 'aulas_reservadas.id_reserva')
            ->where(function ($query) use ($fecha) {
                $query->where('reservas.fecha_reserva', '=', $fecha);
            })->where(function ($query) use ($horaIni, $horaFin) {
                $query->where(function ($query) use ($horaIni) {
                    $query->where('reservas.hora_inicio_reserva', '<=', $horaIni)
                        ->where('reservas.hora_fin_reserva', '>', $horaIni);
                })->orWhere(function ($query) use ($horaFin) {
                    $query->where('reservas.hora_inicio_reserva', '<=', $horaFin)
                        ->where('reservas.hora_fin_reserva', '>', $horaFin);
                });
            })
            ->get();
        $aulasNoDispoArr = array();
        foreach ($aulasNoDispo as $aula) {
            array_push($aulasNoDispoArr, $aula->id_aula);
        }

        $aulasDispo = Aula::whereNotIn('id_aula', $aulasNoDispoArr)
            ->orderBy('capacidad_aula')
            ->get();

        $res = array();
        $vecinosCand = array();
        foreach ($aulasDispo as $ad) {
            if ($cantAlum < $ad->capacidad_aula) {
                $aulaAct = new stdClass();
                $aulaAct->id_aula = $ad->id_aula;
                $aulaAct->numero_aula = $ad->numero_aula;
                $aulaAct->letra_aula = $ad->letra_aula;
                $aulaAct->capacidad_aula = $ad->capacidad_aula;
                $aux = array();
                $aux["vecinos"] = array($aulaAct);
                $aux["capacidad_total"] = $aulaAct->capacidad_aula;
                array_push($res, $aux);

                foreach ($vecinosCand as $vc) {
                    $subres = array();
                    $vecinos = array();
                    $vecinosObj = $this->vecinos($vc->id_aula, $cantAlum - ($vc->capacidad_aula), $aulasNoDispoArr);

                    $vecinos = $vecinosObj->res;

                    $aulaAct = new stdClass();
                    $aulaAct->id_aula = $vc->id_aula;
                    $aulaAct->numero_aula = $vc->numero_aula;
                    $aulaAct->letra_aula = $vc->letra_aula;
                    $aulaAct->capacidad_aula = $vc->capacidad_aula;

                    array_unshift($vecinos, $aulaAct);

                    $capTotal = $this->capTotal($vecinos);
                    if ((count($vecinos) > 1 and $capTotal >= $cantAlum) or $aulaAct->capacidad_aula >= $cantAlum) {
                        $subres["vecinos"] = $vecinos;
                        $subres["capacidad_total"] = $capTotal;
                        if($this->estaDentro($res,$subres)==FALSE){
                            array_push($res, $subres);
                        }
                    }
                }
                break;
            } else {
                array_push($vecinosCand, $ad);
            }
        }

        if (count($res) < 1) {
            //buscar vecinos
            $cantidad_res = 7;
            $i = 0;
            foreach ($aulasDispo as $aulas) {
                if ($i < $cantidad_res) {
                    $subres = array();
                    $vecinos = array();
                    $vecinosObj = $this->vecinos($aulas->id_aula, $cantAlum - ($aulas->capacidad_aula), $aulasNoDispoArr);

                    $vecinos = $vecinosObj->res;

                    $aulaAct = new stdClass();
                    $aulaAct->id_aula = $aulas->id_aula;
                    $aulaAct->numero_aula = $aulas->numero_aula;
                    $aulaAct->letra_aula = $aulas->letra_aula;
                    $aulaAct->capacidad_aula = $aulas->capacidad_aula;

                    array_unshift($vecinos, $aulaAct);

                    $capTotal = $this->capTotal($vecinos);
                    if ((count($vecinos) > 1 and $capTotal >= $cantAlum) or $aulaAct->capacidad_aula >= $cantAlum) {
                        $subres["vecinos"] = $vecinos;
                        $subres["capacidad_total"] = $capTotal;
                        if($this->estaDentro($res,$subres)==FALSE){
                            array_push($res, $subres);
                            $i = $i+1;
                        }
                    }
                } else {
                    break;
                }
            }
        }

        usort($res, function ($a, $b) {
            return ($a['capacidad_total']) - ($b['capacidad_total']);
        });
        return $res;
    }

    private function vecinos($id, $capacidad, $aulasNoDispo)
    {
        $vecinos = Vecino::where("vecinos.id_aula", $id)
            ->whereNotIn("vecinos.id_aula_vecina", $aulasNoDispo)
            ->orderBy('distancia')
            ->get();
        $idVecinos = array();
        foreach ($vecinos as $veci) {
            array_push($idVecinos, $veci->id_aula_vecina);
        }

        #->select('aulas.id_aula','aulas.numero_aula','aulas.letra_aula','aulas.capacidad_aula','aulas.ubicacion_aula','aulas.piso_aula','aulas.descripcion_aula','aulas.hora_apertura_aula','aulas.hora_cierre_aula')
        $aulas = Aula::whereIn('id_aula', $idVecinos)
            ->select('aulas.id_aula', 'aulas.numero_aula', 'aulas.letra_aula', 'aulas.capacidad_aula')
            ->get();


        $total = 0;
        $objRes = new stdClass();
        $res = array();
        foreach ($aulas as $au) {
            if ($total <= $capacidad) {
                $au->distancia = $this->buscarVecino($vecinos,$au->id_aula)->distancia;
                $total = $total + ($au->capacidad_aula);
                array_push($res, $au);
            }
        }
        $objRes->res = $res;
        $objRes->capacidadTotal = $total;
        return $objRes;
    }

    private function buscarVecino($vecinos,$id_aula){
        foreach($vecinos as $vc){
            if($vc->id_aula_vecina == $id_aula){
                return $vc;
            }
        }
    }

    private function estaDentro($res,$subres){
        $capacidad = $subres["capacidad_total"];
        foreach($res as $rs){
            if($rs["capacidad_total"]==$capacidad){
                return TRUE;
            }
        }
        return FALSE;
    }

    private function capTotal($aulas)
    {
        $total = 0;
        foreach ($aulas as $au) {
            $total = $total + $au->capacidad_aula;
        }
        return $total;
    }
}
