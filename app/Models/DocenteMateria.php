<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
Use App\Models\User;

class DocenteMateria extends Model
{
    use HasFactory;
    
    public function User(){
        return $this->belogsTo(User::class);
    }
}
