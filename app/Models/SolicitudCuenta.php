<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolicitudCuenta extends Model
{
  protected $table = 'solicitud_cuentas';
  protected $fillable = [
    'id_sct_cnt',
    'nombre_sct_cnt',
    'usuario_sct_cnt',
    'correo_principal_sct_cnt',
    'correo_secundario_sct_cnt',
  ];
  use HasFactory;
}
