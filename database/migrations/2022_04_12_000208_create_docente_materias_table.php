<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocenteMateriasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('docente_materias', function (Blueprint $table) {
      $table->bigIncrements('id_doc_mat');
      $table->unsignedBigInteger('id_usuario')->nullable();
      $table
        ->foreign('id_usuario')
        ->references('id')
        ->on('users')->onDelete('set null');
      $table->unsignedBigInteger('id_materia')->nullable();
      $table
        ->foreign('id_materia')
        ->references('id_materia')
        ->on('materias')->onDelete('set null');
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
    Schema::dropIfExists('docente_materias');
  }
}
