<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MateriaSolicitada extends Model
{
  protected $table = 'materia_solicitadas';
  protected $fillable = [
    'id_mat_sct',
    'id_sct_cnt',
    'id_materia_solicitada',
    'id_grupo_solicitado',
  ];
  use HasFactory;
}
