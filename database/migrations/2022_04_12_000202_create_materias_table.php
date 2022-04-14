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
      $table->string('nombre_materia', 250);
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
    Schema::dropIfExists('materias');
  }
}