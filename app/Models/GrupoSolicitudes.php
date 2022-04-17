<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrupoSolicitudes extends Model
{
    protected $table = "grupo_solicitudes";
    protected $fillable = [
        'id_grupo_sct',
        'id_solicitud',
        'codigo_grupo_sct'
    ];

    public static function getGruposDeSolicitud($id_solicitud){
        return GrupoSolicitudes::select('codigo_grupo_sct')
        ->where('id_solicitud',$id_solicitud)->get();
    }

    public static function add($grupo){
        $this->fill($grupo);
        $this->save();
    }
    use HasFactory;
}
