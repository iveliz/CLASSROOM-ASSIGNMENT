<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AulaReserva;
use App\Models\RegistroSolicitud;
use App\Models\RegistroSolicitudes;

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
  public static function destroy($id_solicitud){
    $id_reg_sct= RegistroSolicitudes::select('id_reg_sct')->where('id_solicitud',$id_solicitud);
    Reserva::where("reservas.id_reserva",$id_reg_sct)->delete();
  }
}
