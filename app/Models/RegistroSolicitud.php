<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Reserva;

class RegistroSolicitud extends Model
{
  use HasFactory;
  protected $fillable = [
    'fecha_inicio_reg_sct',
    'fecha_modificacion_reg_sct',
    'estado_solicitud_reg_sct',
  ];
  public function RegistroSolicitud()
  {
    return $this->belongsTo(Reserva::class);
  }
}
