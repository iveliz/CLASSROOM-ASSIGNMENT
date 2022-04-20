<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocenteSolicitudes extends Model
{
    protected $table = "docente_solicitudes";
    protected $fillable = [
        'id_doc_sct',
        'id_solicitud',
        'nombre_doc_sct'
    ];

    public static function getNombreDeDocentes($id_solicitud){
        return DocenteSolicitudes::select('nombre_doc_sct')
        ->where('id_solicitud',$id_solicitud)->get();
    }

    public static function destroy($id_solicitud){
        DocenteSolicitudes::where("docente_solicitudes.id_solicitud",$id_solicitud)->delete();
    }
    
    use HasFactory;
}
