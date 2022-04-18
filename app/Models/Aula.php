<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AulaReserva;

class Aula extends Model
{
  use HasFactory;
  protected $fillable = [
    'numero_aula',
    'letra_aula',
    'capacidad_aula',
    'ubicacion_aula',
    'piso_aula',
    'descripcion_aula',
    'hora_apertura_aula',
    'hora_cierre_aula',
  ];

  public function AulasReservadas()
  {
    return $this->hasMany(AulaReserva::class);
  }
}
