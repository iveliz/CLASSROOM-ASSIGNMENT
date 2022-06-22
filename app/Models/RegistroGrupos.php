<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroGrupos extends Model
{
  protected $table = 'registro_grupos';
  protected $fillable = [
    'id_admin',
    'id_docente',
    'id_materia',
    'id_grupo',
    'estado_reg_grupos',
  ];
  use HasFactory;
}
