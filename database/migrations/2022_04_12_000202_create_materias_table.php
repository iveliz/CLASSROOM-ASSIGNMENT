<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMateriasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('materias', function (Blueprint $table) {
      $table->id('id_materia');
      $table->unsignedBigInteger('id_carrera')->nullable();
      $table
        ->foreign('id_carrera')
        ->references('id_carrera')
        ->on('carreras')
        ->onDelete('set null');
      $table->string('nombre_materia', 250);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('materias');
  }
}
