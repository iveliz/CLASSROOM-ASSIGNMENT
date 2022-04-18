<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocenteSolicitudes extends Model
{
    protected $table = "docente_solicitudes";
    protected $fillable = [
        'id_doc_Std',
        'id_solicitud',
        'nombre_doc_std'
    ];

    public static function getNombreDeDocentes($id_solicitud){
        return DocenteSolicitudes::select('nombre_doc_std')
        ->where('id_solicitud',$id_solicitud)->get();
    }
    use HasFactory;
}
