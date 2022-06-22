<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistroGruposTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('registro_grupos', function (Blueprint $table) {
      $table->id('id_reg_grupos');
      $table->unsignedBigInteger('id_admin')->nullable();
      $table
        ->foreign('id_admin')
        ->references('id')
        ->on('users')
        ->onDelete('set null');
      $table->unsignedBigInteger('id_docente')->nullable();
      $table
        ->foreign('id_docente')
        ->references('id')
        ->on('users')
        ->onDelete('set null');
      $table->unsignedBigInteger('id_materia')->nullable();
      $table
        ->foreign('id_materia')
        ->references('id_materia')
        ->on('materias')
        ->onDelete('set null');
      $table->unsignedBigInteger('id_grupo')->nullable();
      $table
        ->foreign('id_grupo')
        ->references('id_grupo')
        ->on('grupos')
        ->onDelete('set null');
      $table->string('estado_reg_grupos', 50);
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
    Schema::dropIfExists('registro_grupos');
  }
}
