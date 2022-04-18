<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitudes;
use App\Models\GrupoSolicitudes;
use App\Models\DocenteSolicitudes;
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
            $consulta_grupos_solicitud = GrupoSolicitudes::getGruposDeSolicitud($soli['id_solicitud']);
            $grupos_solicitud = array();
            foreach ($consulta_grupos_solicitud as $grupo){
                array_push($grupos_solicitud,$grupo->codigo_grupo_sct);
            }
            
            $consulta_docentes_solicitud = DocenteSolicitudes::getNombreDeDocentes($soli['id_solicitud']);
            $docentes_solicitud = array();
            foreach ($consulta_docentes_solicitud as $docente){
                array_push($docentes_solicitud,$docente->nombre_doc_std);
            }

            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
        }
        /*echo "<script>console.log('Console: " . $grupos_solicitud . "' );</script>";*/
        return $solicitudes;
        /*printf('lista');*/
    }

    public function filtrarSolicitudes(Request $id_usuario, $estado){
        $solicitudes = Solicitudes::join('registro_solicitudes','solicitudes.id_solicitud','=','registro_solicitudes.id_solicitud')
        ->select('solicitudes.id_solicitud','registro_solicitudes.fecha_inicio_reg_sct','registro_solicitudes.id_reg_sct','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud')
        ->where('solicitudes.id_usuario',$id_usaurio)
        ->where('solicitudes.estado_solicitud',$estado)
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
                array_push($docentes_solicitud,$docente->nombre_doc_std);
            }

            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
        }

        return $solicitudes;
    }

    public function listarPendientes(int $id_usuario)
    {
        /*$solicitudes_pendientes = filtrarSolicitudes($id_usaurio, "pendiente");
        return $solicitudes_pendientes;*/

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
                array_push($docentes_solicitud,$docente->nombre_doc_std);
            }

            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
        }

        return $solicitudes;
    }

    public function listarRechazados(Request $id_usuario)
    {
        $solicitudes_rechazadas = filtrarSolicitudes($id_usaurio, "rechazado");
        return $solicitudes_rechazadas;
    }

    public function listarAceptados(Request $id_usuario)
    {
        $solicitudes_aceptadas = filtrarSolicitudes($id_usaurio, "aceptado");
        return $solicitudes_aceptadas;
    }

    public function crearSolicitud(Request $datos_solicitud){
        $id_nueva_solicitud = $datos_solicitud.id;
        $nueva_solicitud = new Solicitudes; 
        $nueva_solicitud = $datos_solicitud->input('Materia');
        $nueva_solicitud = $datos_solicitud->input('Cantidad');
        $nueva_solicitud = $datos_solicitud->input('Tipo');
        $nueva_solicitud = $datos_solicitud->input('Periodo');
        $nueva_solicitud = $datos_solicitud->input('Fecha');
        $nueva_solicitud = $datos_solicitud->input('Horario');
        Solicitudes::insert($nueva_solicitud);
        foreach ($datos_solicitud.grupos as $grupo){
            GrupoSolicitudes::insert($id_nueva_solicitud,$grupo);
        }
        foreach ($datos_solicitud.docentes as $docente){
            DocenteSolicitudes::insert($id_nueva_solicitud,$docente);
        }
        
        //GrupoSolicitudes.add($datos_solicitud);
        /** crear solicitud */
        /** crear grupos en una solicitud*/
        /** crear docentes en una solicitud */
        /** crear registro solicitud */
        /** retornar 1 si se guardo 0 si fallo*/
    }

    public function eliminarSolicitud($id_nueva_solicitud){
        
        /** eliminar grupos en una solicitud*/
        /** eliminar docentes en una solicitud */
        /** eliminar solicitud */

        /** retornar 1 si se elimino 0 si fallo*/
    }

}
