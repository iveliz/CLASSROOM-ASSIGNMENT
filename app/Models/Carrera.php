<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Materia;

class Carrera extends Model
{
  use HasFactory;
  protected $table = 'carreras';
  protected $fillable = ['nombre_carrera', 'facultad_carrera'];
  public function Materias()
  {
    return $this->hasMany(Materia::class);
  }
}
