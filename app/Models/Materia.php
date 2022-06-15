<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Grupo;
use App\Models\Carrera;
class Materia extends Model
{
  use HasFactory;
  protected $table = 'materias';
  protected $fillable = ['nombre_materia'];

  public function Grupos()
  {
    return $this->hasMany(Grupo::class);
  }
  public function Carrera()
  {
    return $this->belogsTo(Carrera::class);
  }
}
