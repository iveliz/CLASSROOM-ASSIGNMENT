<?php

namespace Database\Seeders;
Use App\Models\User;
Use App\Models\DocenteMateria;
Use App\Models\Materia;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         User::factory(10)->create();
         DocenteMateria::factory(10)->create();
         Materia::factory(10)->create();
        }
}
