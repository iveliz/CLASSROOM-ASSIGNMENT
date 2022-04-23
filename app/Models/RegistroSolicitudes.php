<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroSolicitudes extends Model
{
    protected $table = "registro_solicitudes";
    protected $fillable = [
        'id_solicitud',
        'id_usuario',
        'fecha_inicio_reg_sct',
        'fecha_modificacion_reg_sct',
        'estado_solicitud_reg_sct',
        'motivo_reg_sct'];

    public static function destroy($id_solicitud){
        RegistroSolicitudes::where("registro_solicitudes.id_solicitud",$id_solicitud)->delete();
    }
    use HasFactory;
}
