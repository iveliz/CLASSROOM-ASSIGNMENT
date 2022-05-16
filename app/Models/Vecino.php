<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vecino extends Model
{
    use HasFactory;
    protected $fillable = ['id_vecino', 'id_aula', 'id_aula_vecina','distancia'];
}
