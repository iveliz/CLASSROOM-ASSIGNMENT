<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitudes;
use Inertia\Inertia;

class SolicitudesController extends Controller
{
        /**
     * Display a listing of the resource
     * 
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $solicitudes = Solicitudes::join('registro_solicitudes','solicitudes.id_solicitud','=','registro_solicitudes.id_solicitud')
        ->select('solicitudes.id_solicitud','registro_solicitudes.fecha_inicio_reg_sct','registro_solicitudes.id_reg_sct','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud')->get();
        
        foreach ($solicitudes as $soli){
            $grupos_solicitud = Solicitudes::join('grupo_solicitudes','solicitudes.id_solicitud','=','grupo_solicitudes.id_solicitud')
            ->select('grupo_solicitudes.codigo_grupo_sct')
            ->where('solicitudes.id_solicitud',$soli['id_solicitud'])
            ->get();
            $docentes_solicitud = Solicitudes::join('docente_solicitudes','solicitudes.id_solicitud','=','docente_solicitudes.id_solicitud')
            ->select('docente_solicitudes.nombre_doc_std')
            ->where('solicitudes.id_solicitud',$soli['id_solicitud'])
            ->get();
            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
        }
        /*echo "<script>console.log('Console: " . $grupos_solicitud . "' );</script>";*/
        return Inertia::render('SolicitudesPage',['solicitudes'=>$solicitudes]);
        /*printf('lista');*/
    }

    private function filtrarSolicitudes($id_usuario, $estado){
        $solicitudes = Solicitudes::join('registro_solicitudes','solicitudes.id_solicitud','=','registro_solicitudes.id_solicitud')
        ->select('solicitudes.id_solicitud','registro_solicitudes.fecha_inicio_reg_sct','registro_solicitudes.id_reg_sct','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud')
        ->where('solicitudes.id_usuario',$id_usaurio)
        ->get();
        
        foreach ($solicitudes as $soli){
            $grupos_solicitud = Solicitudes::join('grupo_solicitudes','solicitudes.id_solicitud','=','grupo_solicitudes.id_solicitud')
            ->select('grupo_solicitudes.codigo_grupo_sct')
            ->where('solicitudes.id_solicitud',$soli['id_solicitud'])
            ->get();
            $docentes_solicitud = Solicitudes::join('docente_solicitudes','solicitudes.id_solicitud','=','docente_solicitudes.id_solicitud')
            ->select('docente_solicitudes.nombre_doc_std')
            ->where('solicitudes.id_solicitud',$soli['id_solicitud'])
            ->get();
            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
        }

        return $solicitudes;
    }

    public function listarPendientes($id_usuario)
    {
        $solicitudes_pendientes = filtrarSolicitudes($id_usaurio, "pendiente");
    }

    public function listarRechazados($id_usuario)
    {
        $solicitudes_pendientes = filtrarSolicitudes($id_usaurio, "rechazados");
    }

    public function listarAceptados($id_usuario)
    {
        $solicitudes_pendientes = filtrarSolicitudes($id_usaurio, "aceptados");
    }
}
