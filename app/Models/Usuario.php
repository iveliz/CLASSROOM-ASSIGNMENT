<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    protected $primarykey = 'id_usuario';
    protected $fillable = ['id_usuario','usuarios',
    'id_usuario',
    'nombre_usuario',
    'email_usuario', 
    'contrasenia_usuario',
    'token_recordado_usuario',
    'rol_usuario'];
}
