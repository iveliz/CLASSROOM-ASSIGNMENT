<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistroSolicitudesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('registro_solicitudes', function (Blueprint $table) {
      $table->id('id_reg_sct');
      $table->unsignedBigInteger('id_solicitud');
      $table
        ->foreign('id_solicitud')
        ->references('id_solicitud')
        ->on('solicitudes');
      $table->unsignedBigInteger('id_usuario')->nullable();
      $table
        ->foreign('id_usuario')
        ->references('id')
        ->on('users');
      $table->date('fecha_inicio_reg_sct');
      $table->date('fecha_modificiacion_reg_sct');
      $table->string('estado_solicitud_reg_sct', 250);
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
    Schema::dropIfExists('registro_solicitudes');
  }
}
