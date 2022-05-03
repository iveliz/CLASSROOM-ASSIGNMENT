<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RegistroSolicitudes;
use App\Models\Aula;
use App\Models\Reserva;

class AulaReserva extends Model
{
  use HasFactory;
  protected $hidden = 'id_aula_res';
  public function Aulas()
  {
    return $this->belogsTo(Aula::class);
  }

  public function Reservadas()
  {
    return $this->belogsTo(Reserva::class);
  }

  public static function destroy($id_solicitud){
    $id_reserva = RegistroSolicitudes::select('id_reserva')->where('id_solicitud',$id_solicitud);
    AulasReserva::where("aulas_reservadas.id_reserva",$id_reserva)->delete();
  }
}
