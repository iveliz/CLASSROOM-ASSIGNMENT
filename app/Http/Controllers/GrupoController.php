<?php

namespace App\Http\Controllers;

use App\Models\Grupo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GrupoController extends Controller
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
     * @param  \App\Models\Grupo  $grupo
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $materia = $request->materia;
        $grupos = DB::table('grupos')->join('materias', 'grupos.id_materia', '=', 'materias.id_materia')
            ->where('materias.nombre_materia', $materia)->get();

        return Inertia::render('SolicitarPage', [
            'gruposMateria' => $grupos
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Grupo  $grupo
     * @return \Illuminate\Http\Response
     */
    public function edit(Grupo $grupo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Grupo  $grupo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Grupo $grupo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Grupo  $grupo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Grupo $grupo)
    {
        //
    }

    public function prueba()
    {
        $consulta = grupo::all();
        return $consulta;
    }

    public function grupoDe($id)
    {
        $consulta = grupo::where('id_materia', $id)->get();
        return $consulta;
    }

    public function gruposDe($id)
    {
        $materias = DB::table('grupos')->join('materias', 'grupos.id_materia', '=', 'materias.id_materia')
            ->join('users', 'grupos.id_usuario', '=', 'users.id')
            ->select('nombre_materia', 'codigo_grupo', 'name')
            ->where('users.id', $id)->get();
        print_r(json_decode($materias, true));
        return $materias;
    }

    public function gruposDeVarios()
    {
        $docentes = array(1, 2);
        $materias = DB::table('grupos')->join('materias', 'grupos.id_materia', '=', 'materias.id_materia')
            ->join('users', 'grupos.id_usuario', '=', 'users.id')
            ->select('nombre_materia', 'codigo_grupo', 'name')
            ->whereIn('users.id', $docentes)->get();
        print_r(json_decode($materias, true));
        return $materias;
    }

    public function grupoMateria($materia)
    {
        $consulta = DB::table('grupos')->join('materias', 'grupos.id_materia', '=', 'materias.id_materia')
            ->where('materias.nombre_materia', $materia)->get();
        return $consulta;
    }
}
