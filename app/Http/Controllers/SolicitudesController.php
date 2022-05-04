<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitudes;
use App\Models\GrupoSolicitudes;
use App\Models\DocenteSolicitudes;
use App\Models\RegistroSolicitudes;
use App\Models\Reserva;
use App\Models\AulaReserva;
use App\Models\Aula;
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
        ->select('solicitudes.id_solicitud','registro_solicitudes.fecha_inicio_reg_sct','solicitudes.hora_requerida_solicitud','solicitudes.periodos_solicitud','registro_solicitudes.id_reg_sct','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud')
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
        $solicitudes = Solicitudes::
        select('solicitudes.id_solicitud','solicitudes.id_solicitud','solicitudes.created_at','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud','solicitudes.hora_requerida_solicitud','solicitudes.periodos_solicitud','solicitudes.estado_solicitud')
        ->where('solicitudes.id_usuario',$id_usuario)
        ->where('solicitudes.estado_solicitud',"pendiente")
        ->orderBy("solicitudes.created_at", 'desc')
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
        ->select('registro_solicitudes.motivo_reg_sct','registro_solicitudes.estado_solicitud_reg_sct','registro_solicitudes.created_at','solicitudes.id_solicitud','registro_solicitudes.fecha_inicio_reg_sct','registro_solicitudes.id_reg_sct','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud','solicitudes.hora_requerida_solicitud','solicitudes.periodos_solicitud','solicitudes.estado_solicitud')
        ->where('solicitudes.id_usuario',$id_usuario)
        ->where('registro_solicitudes.estado_solicitud_reg_sct',"rechazada")
        ->orderBy("registro_solicitudes.created_at", 'desc')
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
        ->select('solicitudes.id_solicitud','registro_solicitudes.created_at','registro_solicitudes.estado_solicitud_reg_sct','registro_solicitudes.fecha_inicio_reg_sct','registro_solicitudes.id_reg_sct','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud','solicitudes.hora_requerida_solicitud','solicitudes.periodos_solicitud','solicitudes.estado_solicitud')
        ->where('solicitudes.id_usuario',$id_usuario)
        ->where('registro_solicitudes.estado_solicitud_reg_sct',"aceptada")
        ->orderBy("registro_solicitudes.created_at", 'desc')
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

            $id_aulas_reservadas = Reserva::join('aulas_reservadas','reservas.id_reserva','=','aulas_reservadas.id_reserva')
            -> select('aulas_reservadas.id_aula')->where('reservas.id_reg_sct',$soli['id_reg_sct'])->get();
            $aulas_reservadas = array();
            foreach ($id_aulas_reservadas as $id_aula){
                $aula = Aula::select('numero_aula','letra_aula')->where('id_aula',$id_aula['id_aula'])->get();
                $numero_aula=(string)$aula[0]['numero_aula'];
                $letra_aula=$aula[0]['letra_aula'];
                $aula_reservada = "$numero_aula $letra_aula";
                array_push($aulas_reservadas,$aula_reservada);
            }

            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
            $soli->aulas=$aulas_reservadas;
        }

        $res = array();
        foreach ($solicitudes as $soli){
            array_push($res,$soli);
        }

        return $res;
    }

    public function listarAceptadasSinVencer(int $id_usuario)
    {
        $solicitudes = Solicitudes::join('registro_solicitudes','solicitudes.id_solicitud','=','registro_solicitudes.id_solicitud')
        ->select('solicitudes.id_solicitud','registro_solicitudes.created_at','registro_solicitudes.estado_solicitud_reg_sct','registro_solicitudes.fecha_inicio_reg_sct','registro_solicitudes.id_reg_sct','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud','solicitudes.hora_requerida_solicitud','solicitudes.periodos_solicitud','solicitudes.estado_solicitud')
        ->where('solicitudes.id_usuario',$id_usuario)
        ->where('registro_solicitudes.estado_solicitud_reg_sct',"aceptada")
        ->where('registro_solicitudes.created_at',">=",date('Y-m-d'))
        ->orderBy("registro_solicitudes.created_at", 'desc')
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

            $id_aulas_reservadas = Reserva::join('aulas_reservadas','reservas.id_reserva','=','aulas_reservadas.id_reserva')
            -> select('aulas_reservadas.id_aula')->where('reservas.id_reg_sct',$soli['id_reg_sct'])->get();
            $aulas_reservadas = array();
            foreach ($id_aulas_reservadas as $id_aula){
                $aula = Aula::select('numero_aula','letra_aula')->where('id_aula',$id_aula['id_aula'])->get();
                $numero_aula=(string)$aula[0]['numero_aula'];
                $letra_aula=$aula[0]['letra_aula'];
                $aula_reservada = "$numero_aula $letra_aula";
                array_push($aulas_reservadas,$aula_reservada);
            }

            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
            $soli->aulas=$aulas_reservadas;
        }

        $res = array();
        foreach ($solicitudes as $soli){
            array_push($res,$soli);
        }

        return $res;
    }

    public function listarAceptadasVencidas(int $id_usuario)
    {
        $solicitudes = Solicitudes::join('registro_solicitudes','solicitudes.id_solicitud','=','registro_solicitudes.id_solicitud')
        ->select('solicitudes.id_solicitud','registro_solicitudes.created_at','registro_solicitudes.estado_solicitud_reg_sct','registro_solicitudes.fecha_inicio_reg_sct','registro_solicitudes.id_reg_sct','solicitudes.materia_solicitud','solicitudes.cantidad_estudiantes_solicitud','solicitudes.fecha_requerida_solicitud','solicitudes.hora_requerida_solicitud','solicitudes.periodos_solicitud','solicitudes.estado_solicitud')
        ->where('solicitudes.id_usuario',$id_usuario)
        ->where('registro_solicitudes.estado_solicitud_reg_sct',"aceptada")
        ->where('registro_solicitudes.created_at',"<",date('Y-m-d'))
        ->orderBy("registro_solicitudes.created_at", 'desc')
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

            $id_aulas_reservadas = Reserva::join('aulas_reservadas','reservas.id_reserva','=','aulas_reservadas.id_reserva')
            -> select('aulas_reservadas.id_aula')->where('reservas.id_reg_sct',$soli['id_reg_sct'])->get();
            $aulas_reservadas = array();
            foreach ($id_aulas_reservadas as $id_aula){
                $aula = Aula::select('numero_aula','letra_aula')->where('id_aula',$id_aula['id_aula'])->get();
                $numero_aula=(string)$aula[0]['numero_aula'];
                $letra_aula=$aula[0]['letra_aula'];
                $aula_reservada = "$numero_aula $letra_aula";
                array_push($aulas_reservadas,$aula_reservada);
            }

            $soli->grupos=$grupos_solicitud;
            $soli->docentes=$docentes_solicitud;
            $soli->aulas=$aulas_reservadas;
        }

        $res = array();
        foreach ($solicitudes as $soli){
            array_push($res,$soli);
        }

        return $res;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Solicitudes  $request
     * @return \Illuminate\Http\Response
     */
    public function crearSolicitud(Request $datos_solicitud){
        $res = 0;
        try {
            
            $nueva_solicitud = new Solicitudes;
            $nueva_solicitud->id_usuario = $datos_solicitud->id_usuario;
            //$nueva_solicitud->id_solicitud =  $id_nueva_solicitud; 
            $nueva_solicitud->materia_solicitud = $datos_solicitud->materia_solicitud;
            $nueva_solicitud->cantidad_estudiantes_solicitud = $datos_solicitud->cantidad_estudiantes_solicitud;
            $nueva_solicitud->motivo_reserva_solicitud = $datos_solicitud->motivo_reserva_solicitud;
            $nueva_solicitud->periodos_solicitud = $datos_solicitud->periodos_solicitud;
            $nueva_solicitud->fecha_requerida_solicitud = $datos_solicitud->fecha_requerida_solicitud;
            $nueva_solicitud->hora_requerida_solicitud = $datos_solicitud->hora_requerida_solicitud; /**/
            $nueva_solicitud->estado_solicitud = 'pendiente';
            $solicitud_existente=Solicitudes::select('id_solicitud')
            ->where('materia_solicitud',$nueva_solicitud->materia_solicitud)
            ->where('id_usuario',$datos_solicitud->id_usuario)
            ->where('cantidad_estudiantes_solicitud',$nueva_solicitud->cantidad_estudiantes_solicitud)
            ->where('motivo_reserva_solicitud',$nueva_solicitud->motivo_reserva_solicitud)
            ->where('periodos_solicitud',$nueva_solicitud->periodos_solicitud)
            ->where('fecha_requerida_solicitud',$nueva_solicitud->fecha_requerida_solicitud)
            ->where('hora_requerida_solicitud',$nueva_solicitud->hora_requerida_solicitud)
            ->get();
            if(count($solicitud_existente)!=0){
                $cont = 0;
                $coincidencia = false;
                while($cont<count($solicitud_existente) && !$coincidencia){
                    $id_solicitud_existente = $solicitud_existente[$cont]->id_solicitud;
                    $docentes_existentes_en_solicitud=DocenteSolicitudes::select('nombre_doc_sct')
                    ->where('id_solicitud',$id_solicitud_existente)
                    ->get();
                    if(count($docentes_existentes_en_solicitud)==count($datos_solicitud->nombres_docentes_solicitud)){
                    
                        $docente_distinto=false;
                        $i=0;
                        while($i<count($docentes_existentes_en_solicitud) && !$docente_distinto){
                            $docente_existente=$docentes_existentes_en_solicitud[$i]->nombre_doc_sct;
                            $docente_nuevo=$datos_solicitud->nombres_docentes_solicitud[$i];
                            if($docente_existente != $docente_nuevo){
                                $docente_distinto=true;
                            }
                            $i=$i+1;
                        }
                        $coincidencia = $docente_distinto?false:true;  
                    }
                    $cont = $cont +1;
                }
                
                if($coincidencia==false){
                    $nueva_solicitud->save();
                    $id_nueva_solicitud = $nueva_solicitud->id;
                    
                    
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
                    $res=1;
                }
                //$res=$docente_distinto?1:0;
            }else{
                $nueva_solicitud->save();
                $id_nueva_solicitud = $nueva_solicitud->id;
                
                
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
                $res=1;
            }
            
            
            /*if(count($solicitud_existente)==0){
                
                $nueva_solicitud->save();
                $id_nueva_solicitud = $nueva_solicitud->id;
                
                
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
            }else{
                $res = 0;
            }*/
            
        } catch (\Throwable $th) {
            //throw $th;
            $res = $th;
        }
        

        /** retornar 1 si se guardo 0 si fallo*/
        return $res;
    }

    public function cancelarSolicitud(int $id_solicitud){
        $res = 0;
        try {
            //DB::table('registro_solicitudes')->where("registro_solicitudes.id_solicitud",$id_solicitud)->delete();
            DocenteSolicitudes::destroy($id_solicitud);
            GrupoSolicitudes::destroy($id_solicitud);

            //eliminar reservas y aulas_reservadas
            
            AulaReserva::destroy($id_solicitud);
            Reserva::destroy($id_solicitud);

            RegistroSolicitudes::destroy($id_solicitud);
            Solicitudes::where("solicitudes.id_solicitud",$id_solicitud)->delete();
            
            $res = 1;
        } catch (\Throwable $th) {
            //throw $th;
            $res = $th;
        }

        /** retornar 1 si se elimino 0 si fallo*/
        return $res;
    }

    public function cancelarSolicitudPorArreglo(Request $ids_solicitud){
        $ids_para_eliminar = $ids_solicitud->ids_selecionados;
        $res = 3;
        try {
            if(count($ids_para_eliminar)!=0){
                foreach ($ids_para_eliminar as $id) { 
                    //DB::table('registro_solicitudes')->where("registro_solicitudes.id_solicitud",$id)->delete();
                    DocenteSolicitudes::destroy($id);
                    GrupoSolicitudes::destroy($id);

                    //eliminar reservas y aulas_reservadas
            
                    AulaReserva::destroy($id);
                    Reserva::destroy($id);

                    RegistroSolicitudes::destroy($id);
                    Solicitudes::where("solicitudes.id_solicitud",$id)->delete();
                }
                $res = 1;
            }else {
                $res = 0;
            }
            
        } catch (\Throwable $th) {
            //throw $th;
            $res = $th;
        }

        /** retornar 1 si se elimino 0 si fallo*/
        return $res;
    }

}
