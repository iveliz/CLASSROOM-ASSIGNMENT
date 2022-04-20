<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitudes;
use App\Models\GrupoSolicitudes;
use App\Models\DocenteSolicitudes;
use Illuminate\Support\Facades\DB;
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
        ->select('solicitudes.id_solicitud','registro_solicitudes.fecha_inicio_reg_sct','registro_solicitudes.id_reg_sct','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud')
        ->get();
        
        foreach ($solicitudes as $soli){
            $consulta_grupos_solicitud = GrupoSolicitudes::getGruposDeSolicitud($soli['id_solicitud']);
            $grupos_solicitud = array();
            foreach ($consulta_grupos_solicitud as $grupo){
                array_push($grupos_solicitud,$grupo->codigo_grupo_sct);
            }
            
            $consulta_docentes_solicitud = DocenteSolicitudes::getNombreDeDocentes($soli['id_solicitud']);
            $docentes_solicitud = array();
            foreach ($consulta_docentes_solicitud as $docente){
                array_push($docentes_solicitud,$docente->nombre_doc_sct);
            }

            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
        }
        
        return $solicitudes;
        /*printf('lista');*/
    }
    
    public function listarPendientes(int $id_usuario)
    {
        $solicitudes = Solicitudes::join('registro_solicitudes','solicitudes.id_solicitud','=','registro_solicitudes.id_solicitud')
        ->select('solicitudes.id_solicitud','registro_solicitudes.fecha_inicio_reg_sct','registro_solicitudes.id_reg_sct','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud')
        ->where('solicitudes.id_usuario',$id_usuario)
        ->where('solicitudes.estado_solicitud',"pendiente")
        ->get();
        
        foreach ($solicitudes as $soli){
            $consulta_grupos_solicitud = GrupoSolicitudes::getGruposDeSolicitud($soli['id_solicitud']);
            $grupos_solicitud = array();
            foreach ($consulta_grupos_solicitud as $grupo){
                array_push($grupos_solicitud,$grupo->codigo_grupo_sct);
            }
            
            $consulta_docentes_solicitud = DocenteSolicitudes::getNombreDeDocentes($soli['id_solicitud']);
            $docentes_solicitud = array();
            foreach ($consulta_docentes_solicitud as $docente){
                array_push($docentes_solicitud,$docente->nombre_doc_sct);
            }

            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
        }

        return $solicitudes;
    }

    public function listarRechazados(int $id_usuario)
    {
        $solicitudes = Solicitudes::join('registro_solicitudes','solicitudes.id_solicitud','=','registro_solicitudes.id_solicitud')
        ->select('registro_solicitudes.motivo_reg_sct','solicitudes.id_solicitud','registro_solicitudes.fecha_inicio_reg_sct','registro_solicitudes.id_reg_sct','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud')
        ->where('solicitudes.id_usuario',$id_usuario)
        ->where('solicitudes.estado_solicitud',"rechazada")
        ->where('registro_solicitudes.estado_solicitud_reg_sct',"rechazada")
        ->get();
        
        foreach ($solicitudes as $soli){
            $consulta_grupos_solicitud = GrupoSolicitudes::getGruposDeSolicitud($soli['id_solicitud']);
            $grupos_solicitud = array();
            foreach ($consulta_grupos_solicitud as $grupo){
                array_push($grupos_solicitud,$grupo->codigo_grupo_sct);
            }
            
            $consulta_docentes_solicitud = DocenteSolicitudes::getNombreDeDocentes($soli['id_solicitud']);
            $docentes_solicitud = array();
            foreach ($consulta_docentes_solicitud as $docente){
                array_push($docentes_solicitud,$docente->nombre_doc_sct);
            }

            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
        }

        return $solicitudes;
    }

    public function listarAceptados(int $id_usuario)
    {
        $solicitudes = Solicitudes::join('registro_solicitudes','solicitudes.id_solicitud','=','registro_solicitudes.id_solicitud')
        ->select('solicitudes.id_solicitud','registro_solicitudes.fecha_inicio_reg_sct','registro_solicitudes.id_reg_sct','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud')
        ->where('solicitudes.id_usuario',$id_usuario)
        ->where('solicitudes.estado_solicitud',"aceptada")
        ->get();
        
        foreach ($solicitudes as $soli){
            $consulta_grupos_solicitud = GrupoSolicitudes::getGruposDeSolicitud($soli['id_solicitud']);
            $grupos_solicitud = array();
            foreach ($consulta_grupos_solicitud as $grupo){
                array_push($grupos_solicitud,$grupo->codigo_grupo_sct);
            }
            
            $consulta_docentes_solicitud = DocenteSolicitudes::getNombreDeDocentes($soli['id_solicitud']);
            $docentes_solicitud = array();
            foreach ($consulta_docentes_solicitud as $docente){
                array_push($docentes_solicitud,$docente->nombre_doc_sct);
            }

            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
        }

        return $solicitudes;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Solicitudes  $request
     * @return \Illuminate\Http\Response
     */
    public function crearSolicitud(Request $datos_solicitud){
        $res = 3;
        try {
            $id_nueva_solicitud = $datos_solicitud->id_solicitud;
            $nueva_solicitud = new Solicitudes;
            $nueva_solicitud->id_usuario = $datos_solicitud->id_usuario;
            $nueva_solicitud->id_solicitud =  $id_nueva_solicitud; 
            $nueva_solicitud->materia_solicitud = $datos_solicitud->materia_solicitud;
            $nueva_solicitud->cantidad_estudiantes_solicitud = $datos_solicitud->cantidad_estudiantes_solicitud;
            $nueva_solicitud->motivo_reserva_solicitud = $datos_solicitud->motivo_reserva_solicitud;
            $nueva_solicitud->periodos_solicitud = $datos_solicitud->periodos_solicitud;
            $nueva_solicitud->fecha_requerida_solicitud = $datos_solicitud->fecha_requerida_solicitud;
            $nueva_solicitud->hora_requerida_solicitud = $datos_solicitud->hora_requerida_solicitud; /**/
            $nueva_solicitud->estado_solicitud = 'pendiente';
            $nueva_solicitud->save();
        
            foreach ($datos_solicitud->grupos_solicitud as $grupo){
                $nuevo_grupo = new GrupoSolicitudes;
                $nuevo_grupo->id_solicitud = $id_nueva_solicitud;
                $nuevo_grupo->codigo_grupo_sct = $grupo;
                $nuevo_grupo->save();
            }
            foreach ($datos_solicitud->nombres_docentes_solicitud as $docente){
                $nuevo_docente = new DocenteSolicitudes;
                $nuevo_docente->id_solicitud = $id_nueva_solicitud;
                $nuevo_docente->nombre_doc_sct = $docente;
                $nuevo_docente->save();

            }
            $res = 1;
        } catch (\Throwable $th) {
            //throw $th;
            $res = 0;
        }
        

        /** retornar 1 si se guardo 0 si fallo*/
        return $res;
    }

    public function destroy(int $id_solicitud){
        $res = 3;
        try {
            DocenteSolicitudes::destroy($id_solicitud);
            GrupoSolicitudes::destroy($id_solicitud);
            Solicitudes::where("solicitudes.id_solicitud",$id_solicitud)->delete();
            $res = 1;
        } catch (\Throwable $th) {
            //throw $th;
            $res = 0;
        }

        /** retornar 1 si se elimino 0 si fallo*/
        return $res;
    }

}
