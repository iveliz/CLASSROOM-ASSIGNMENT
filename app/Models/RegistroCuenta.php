<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroCuenta extends Model
{
  protected $table = 'registro_cuentas';
  protected $fillable = ['id', 'id_sct_cnt', 'estado_reg_cnt'];
  use HasFactory;
}
