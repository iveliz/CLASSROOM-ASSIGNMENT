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
      $table->id('id_lista_mat');
      $table->unsignedBigInteger('id_materia');
      $table
        ->foreign('id_materia')
        ->references('id_materia')
        ->on('materias');
      $table->unsignedBigInteger('id_carrera');
      $table
        ->foreign('id_carrera')
        ->references('id_carrera')
        ->on('carreras');
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
