<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGruposTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('grupos', function (Blueprint $table) {
      $table->bigIncrements('id_grupo');
      $table->unsignedBigInteger('id_materia')->nullable();
      $table
        ->foreign('id_materia')
        ->references('id')
        ->on('materias')->onDelete('set null');
      $table->string('codigo_grupo', 10);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('grupos');
  }
}
