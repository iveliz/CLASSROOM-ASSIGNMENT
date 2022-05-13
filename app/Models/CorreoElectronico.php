<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class CorreoElectronico extends Model
{
    use HasFactory;
    protected $table = "correo__electronicos";
    protected $fillable = ['id_imail', 'email_principal', 'email_secundario','id_usuario'];
    public function User()
    {
      return $this->belogsTo(User::class);
    }
}
