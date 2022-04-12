<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAulasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aulas', function (Blueprint $table) {
            $table->bigIncrements('id_aula');
            $table->integer('numero_aula');
            $table->char('letra_aula', 2)->nullable();
            $table->integer('capacidad_aula');
            $table->string('ubicacion_aula', 250);
            $table->string('piso_aula', 50);
            $table->string('descripcion_aula', 250);
            $table->time('hora_apertura_aula');
            $table->time('hora_cierre_aula');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('update_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('aulas');
    }
}
