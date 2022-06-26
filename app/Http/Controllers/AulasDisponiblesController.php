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
    public function index(){
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(){
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Aula  $aula
     * @return \Illuminate\Http\Response
     */
    public function show(Aula $aula){
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Aula  $aula
     * @return \Illuminate\Http\Response
     */
    public function edit(Aula $aula){
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Aula  $aula
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Aula $aula){
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Aula  $aula
     * @return \Illuminate\Http\Response
     */
    public function destroy(Aula $aula){
        //
    }

    public function aulasDisponiblesMezcla(Request $request){
        $fecha = $request->fecha;
        $horaIni = $request->hora_ini;
        $horaFin = $request->hora_fin;
        $cantAlum = $request->capacidad;

        $bioseguridad = TRUE;
        if ($bioseguridad) {
            $cantAlum = $cantAlum * 2;
        }
        $aulasNoDispo = $this->aulasNoDisponibles($fecha, $horaIni, $horaFin);

        $aulasDispo = Aula::whereNotIn('id_aula', $aulasNoDispo)
            ->orderBy('capacidad_aula')
            ->get();

        $res = array();
        $vecinosCand = array();
        foreach ($aulasDispo as $ad) {
            if ($cantAlum < $ad->capacidad_aula) {
                $aulaAct = $this->crearAula($ad);
                $aux = array();
                $aux["vecinos"] = array($aulaAct);
                $aux["capacidad_total"] = $aulaAct->capacidad_aula;
                array_push($res, $aux);

                $vecinosAux = array_values($this->cargarArbolBB($vecinosCand, $cantAlum, $aulasNoDispo));
                $res = array_merge($res, $vecinosAux); 

                break;
            } else {
                array_push($vecinosCand, $ad);
            }
        }

        if (count($res) < 1) {
            $res = array_values($this->cargarArbolBB($aulasDispo, $cantAlum, $aulasNoDispo));
        }

        return $res;
    }

    public function aulasDisponibles(Request $request){
        $fecha = $request->fecha;
        $horaIni = $request->hora_ini;
        $horaFin = $request->hora_fin;
        $cantAlum = $request->capacidad;

        $bioseguridad = TRUE;
        if ($bioseguridad) {
            $cantAlum = $cantAlum * 2;
        }
        $aulasNoDispo = $this->aulasNoDisponibles($fecha, $horaIni, $horaFin);

        $tipo_orden = 'ASC';
        
        if($cantAlum>150){
            $tipo_orden = 'DESC';
        }

        $aulasDispo = Aula::whereNotIn('id_aula', $aulasNoDispo)
            ->orderBy('tipo_aula')
            ->orderBy('capacidad_aula',$tipo_orden)
            ->take(30)
            ->get();

        $res = array();
        $vecinosCand = array();
        foreach ($aulasDispo as $ad) {
            if ($cantAlum < $ad->capacidad_aula) {
                $aulaAct = $this->crearAula($ad);
                $aux = array();
                $aux["vecinos"] = array($aulaAct);
                $aux["capacidad_total#"] = $aulaAct->capacidad_aula;
                array_push($res, $aux);

                $vecinosAux = $this->cargarVecinos($vecinosCand, $cantAlum, $aulasNoDispo);
                $res = array_merge($res, $vecinosAux);
                $res = $vecinosAux;

                break;
            } else {
                array_push($vecinosCand, $ad);
            }
        }

        if (count($res) < 1) {
            //$res = array_values($this->cargarArbolBB($aulasDispo,$cantAlum,$aulasNoDispo));
            $res = $this->cargarVecinos($aulasDispo, $cantAlum, $aulasNoDispo);
        }

        return $res;
    }

    public function crearAula($aula){
        $aulaAct = new stdClass();
        $aulaAct->id_aula = $aula->id_aula;
        $aulaAct->numero_aula = $aula->numero_aula;
        $aulaAct->letra_aula = $aula->letra_aula;
        $aulaAct->capacidad_aula = $aula->capacidad_aula;
        return $aulaAct;
    }

    public function cargarVecinos($aulasDispo, $cantAlum, $aulasNoDispo){
        $res = array();
            $cantidad_res = 7;
            $i = 0;
            foreach ($aulasDispo as $aula) {
                if ($i < $cantidad_res) {
                    $subres = array();
                    $vecinos = array();
                    $vecinosObj = $this->vecinos($aula->id_aula, $cantAlum - ($aula->capacidad_aula), $aulasNoDispo);

                    $vecinos = $vecinosObj->res;

                    $aulaAct = $this->crearAula($aula);

                    array_unshift($vecinos, $aulaAct);

                    $capTotal = $aula->capacidad_aula+$vecinosObj->capacidadTotal;

                    if ($capTotal >= $cantAlum) {
                        $subres["vecinos"] = $vecinos;
                        $subres["capacidad_total"] = $capTotal;
                        $res[$capTotal] = $subres;
                        $i++;
                    }
                } else {
                    break;
                }
            }
            $res = array_values($res);
            return $res;
    }

    private function vecinos($id, $capacidad, $aulasNoDispo){

        $tipo_orden = 'ASC';
        
        if($capacidad>150){
            $tipo_orden = 'DESC';
        }

        $vecinos = Vecino::where("vecinos.id_aula", $id)
            ->whereNotIn("vecinos.id_aula_vecina", $aulasNoDispo)
            ->orderBy('distancia',$tipo_orden)
            ->get();
        $idVecinos = $vecinos->pluck('id_aula_vecina');

        #->select('aulas.id_aula','aulas.numero_aula','aulas.letra_aula','aulas.capacidad_aula','aulas.ubicacion_aula','aulas.piso_aula','aulas.descripcion_aula','aulas.hora_apertura_aula','aulas.hora_cierre_aula')
        $aulas = Aula::whereIn('id_aula', $idVecinos)
            ->select('aulas.id_aula', 'aulas.numero_aula', 'aulas.letra_aula', 'aulas.capacidad_aula')
            ->get();


        $total = 0;
        $objRes = new stdClass();
        $res = array();
        foreach ($aulas as $au) {
            if ($total <= $capacidad) {
                $au->distancia = $this->buscarVecino($vecinos, $au->id_aula)->distancia;
                $total = $total + ($au->capacidad_aula);
                array_push($res, $au);
            }
        }
        $objRes->res = $res;
        $objRes->capacidadTotal = $total;
        return $objRes;
    }

    private function buscarVecino($vecinos, $id_aula){
        foreach ($vecinos as $vc) {
            if ($vc->id_aula_vecina == $id_aula) {
                return $vc;
            }
        }
    }

    private function aulasNoDisponibles($fecha, $horaIni, $horaFin){
        $aulasNoDispo = DB::table('reservas')->join('aulas_reservadas', 'reservas.id_reserva', '=', 'aulas_reservadas.id_reserva')
            ->where(function ($query) use ($fecha) {
                $query->where('reservas.fecha_reserva', '=', $fecha);
            })->where(function ($query) use ($horaIni, $horaFin) {
                $query->orWhere(function ($query) use ($horaIni) {
                    $query->where('reservas.hora_inicio_reserva', '<=', $horaIni)
                        ->where('reservas.hora_fin_reserva', '>', $horaIni);
                })->orWhere(function ($query) use ($horaFin) {
                    $query->where('reservas.hora_inicio_reserva', '<=', $horaFin)
                        ->where('reservas.hora_fin_reserva', '>', $horaFin);
                })->orWhere(function ($query) use ($horaIni, $horaFin) {
                    $query->where('reservas.hora_inicio_reserva', '>=', $horaIni)
                        ->where('reservas.hora_fin_reserva', '<=', $horaFin);
                });
            })
            ->distinct('id_aula')
            ->pluck('id_aula');
        return $aulasNoDispo;
    }

    private function cargarArbolBB(&$aulasDispo, $cantAlum, $aulasNoDispo){
        $arbol = new ArbolBB($cantAlum);
        $res = array();
        $cantidad_res = 7;
        $i = 0;
        foreach ($aulasDispo as $aula) {
            if ($i < $cantidad_res) {
                $vecinos = array();
                $vecinosObj = $this->vecinos($aula->id_aula, $cantAlum - ($aula->capacidad_aula), $aulasNoDispo);

                $vecinos = $vecinosObj->res;

                $aulaAct = new stdClass();
                $aulaAct->id_aula = $aula->id_aula;
                $aulaAct->numero_aula = $aula->numero_aula;
                $aulaAct->letra_aula = $aula->letra_aula;
                $aulaAct->capacidad_aula = $aula->capacidad_aula;

                $arbol->insertar($aulaAct);
                foreach ($vecinos as $vc) {
                    $arbol->insertar($vc);
                }

                //array_unshift($vecinos, $aulaAct);

                $capTotal = $arbol->getCapacidadTotal();

                if ($capTotal >= $cantAlum) {
                    $res[$capTotal] = $arbol->listar();
                    $arbol->vaciar();
                    $i++;
                }
            } else {
                break;
            }
        }
        return $res;
    }
}

class Nodo{
    public $aula;
    public $izq;
    public $der;

    public function __construct($dato = NULL)
    {
        $this->aula = $dato;
        $this->izq = NULL;
        $this->der = NULL;
    }
}

class ArbolBB{
    private $raiz;
    private $capacidad_total;
    private $capacidad_max;

    public function __construct($cMax){
        $this->raiz = NULL;
        $this->capacidad_total = 0;
        $this->capacidad_max = $cMax;
    }

    public function isEmpty(){
        return $this->raiz == NULL;
    }

    public function insertar($dato){
        $p = new Nodo($dato);
        if ($this->capacidad_total < $this->capacidad_max) {
            if ($this->isEmpty()) {
                $this->raiz = $p;
                $this->capacidad_total += $p->aula->capacidad_aula;
                return true;
            } else {
                $this->insertarN($this->raiz, $p);
                return true;
            }
        } else {
            return false;
        }
    }

    private function insertarN($nodo, $p){
        if ($nodo->aula->capacidad_aula > $p->aula->capacidad_aula) { //raiz mayor al dato, se va a la izq
            if ($nodo->izq != NULL) {
                $this->insertarN($nodo->izq, $p);
            } else {
                $nodo->izq = $p;
                $this->capacidad_total += $p->aula->capacidad_aula;
            }
        } else if ($nodo->aula->capacidad_aula < $p->aula->capacidad_aula) { //raiz menor al dato, va a la der
            if ($nodo->der != NULL) {
                $this->insertarN($nodo->der, $p);
            } else {
                $nodo->der = $p;
                $this->capacidad_total += $p->aula->capacidad_aula;
            }
        } else {
            if ($nodo->aula->numero_aula . $nodo->aula->letra_aula != $p->aula->numero_aula . $p->aula->letra_aula) {
                if ($nodo->der != NULL) {
                    $this->insertarN($nodo->der, $p);
                } else {
                    $nodo->der = $p;
                    $this->capacidad_total += $p->aula->capacidad_aula;
                }
            }
        }
    }

    public function vaciar(){
        $this->raiz = NULL;
        $this->capacidad_total = 0;
    }

    public function listar(){
        $resR = new stdClass();
        $res = array();
        $this->llenar($this->raiz, $res);
        $resR->vecinos = $res;
        $resR->capacidad_total = $this->capacidad_total;
        return $resR;
    }

    private function llenar($arbol, &$res){
        if ($arbol != NULL) {
            $this->llenar($arbol->izq, $res);
            array_push($res, $arbol->aula);
            //$res[$this->aula->capacidad_aula] = $this->aula;
            $this->llenar($arbol->der, $res);
        }
    }

    public function getCapacidadTotal(){
        return $this->capacidad_total;
    }

    public function getCapacidadMax(){
        return $this->capacidad_max;
    }
}
