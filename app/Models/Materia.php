<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Grupo;
class Materia extends Model
{
  use HasFactory;
  protected $fillable = ['nombre_materia'];

  public function Grupos()
  {
    return $this->hasMany(Grupo::class);
  }
}
