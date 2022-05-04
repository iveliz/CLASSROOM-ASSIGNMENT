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
  protected $table = "aulas_reservadas";
  //protected $hidden = 'id_aula_res';
  protected $fillable = [
    'id_aula_res',
    'id_reserva',
  ];
  public function Aulas()
  {
    return $this->belogsTo(Aula::class);
  }

  public function Reservadas()
  {
    return $this->belogsTo(Reserva::class);
  }

  public static function destroy( $id_solicitud){
    $reg_sct = RegistroSolicitudes::select('id_reg_sct')->where('id_solicitud',$id_solicitud)->get();
    if(count($reg_sct)!=0){
      $id_reg_sct=$reg_sct[0]->id_reg_sct;
      $reserva=Reserva::select('reservas.id_reserva')->where("reservas.id_reg_sct",$id_reg_sct)->get();
      if(count($reserva)!=0){
        $id_reserva = $reserva[0]->id_reserva;
        AulaReserva::where("id_reserva",$id_reserva)->delete();
      }
    }
  }
}
