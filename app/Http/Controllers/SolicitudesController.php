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
                array_push($docentes_solicitud,$docente->nombre_doc_std);
            }

            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
        }
        /*echo "<script>console.log('Console: " . $grupos_solicitud . "' );</script>";*/
        return $solicitudes;
        /*printf('lista');*/
    }

    static function filtrarSolicitudes(int $id_usuario, $estado){
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
        /*$solicitudes_pendientes = this.filtrarSolicitudes($id_usuario, "pendiente");
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
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Solicitudes  $request
     * @return \Illuminate\Http\Response
     */
    public function crearSolicitud(Request $datos_solicitud){
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
           //echo "<script>console.log('Console: " . $nuevo_grupo . "' );</script>";
           $nuevo_grupo->save();
           /*DB::table('grupo_solicitudes')->insert([
            'id_solicitud' => `$id_nueva_solicitud`,
            'codigo_grupo_sct' => `$grupo`,
        ]);*/
        }
        foreach ($datos_solicitud->nombres_docentes_solicitud as $docente){
            $nuevo_docente = new DocenteSolicitudes;
           $nuevo_docente->id_solicitud = $id_nueva_solicitud;
           $nuevo_docente->nombre_doc_std = $docente;
           //echo "<script>console.log('Console: " . $nuevo_docente . "' );</script>";
           $nuevo_docente->save();
           /*DB::table('docente_solicitudes')->insert([
            'id_solicitud' => `$id_nueva_solicitud`,
            'nombre_doc_std' => `$docente`
        ]);*/
        }
        //$abc = Solicitudes::crearSolicitud();
         
       
        //GrupoSolicitudes.add($datos_solicitud);
        /** crear solicitud */
        /** crear grupos en una solicitud*/
        /** crear docentes en una solicitud */
        /** crear registro solicitud */
        /** retornar 1 si se guardo 0 si fallo*/
        return $nueva_solicitud;
    }

    public function eliminarSolicitud($id_nueva_solicitud){
        
        /** eliminar grupos en una solicitud*/
        /** eliminar docentes en una solicitud */
        /** eliminar solicitud */

        /** retornar 1 si se elimino 0 si fallo*/
    }

}
