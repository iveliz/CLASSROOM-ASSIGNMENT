<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitudes extends Model
{
    protected $table = "solicitudes";
    protected $fillable = [
        'id_solicitud',
        'materia_solicitud',
        'cantidad_estudiantes_solicitud',
        'motivo_reserva_solicitu',
        'fecha_requerida_solicitud',
        'hora_requerida_solicitud',
        'periodos_solicitud'];
    use HasFactory;
}
