<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AulaReserva;
use App\Models\RegistroSolicitud;

class Reserva extends Model
{
  use HasFactory;
  protected $fillable = [
    'hora_inicio_reserva',
    'hora_fin_reserva',
    'fecha_reserva',
  ];
  public function AulasReservadas()
  {
    return $this->hasMany(AulaReserva::class);
  }
  public function RegistroSolicitud()
  {
    return $this->hasOne(RegistroSolicitud::class);
  }
}
