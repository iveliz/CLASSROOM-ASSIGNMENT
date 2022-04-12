<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListaMateriasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lista_materias', function (Blueprint $table) {
            $table->bigIncrements('id_lista_mat');
            $table->bigInteger('id_carrera')->nullable()->index('FK_TIENE_UNA');
            $table->bigInteger('id_materia')->nullable()->index('FK_ESTA_EN');
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
        Schema::dropIfExists('lista_materias');
    }
}
