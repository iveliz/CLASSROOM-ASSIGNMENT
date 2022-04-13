<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Materia;

class DocenteMateriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            
            'id_usuario'=>User::all()->ramdom()->id,
            'id_materia'=>Materia::all()->ramdom()->id 

        ];
    }
}
