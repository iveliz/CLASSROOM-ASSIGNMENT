<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
Use App\Models\DocenteMateria;
class Materia extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_materia',
    ];

    public function docenteMaterias(){
        return $this->hasMany(DocenteMateria::class);
    }
}
