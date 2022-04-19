<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('reservas', function (Blueprint $table) {
      $table->id('id_reserva');
      $table->unsignedBigInteger('id_reg_sct')->nullable();
      $table
        ->foreign('id_reg_sct')
        ->references('id_reg_sct')
        ->on('registro_solicitudes');
      $table->time('hora_inicio_reserva');
      $table->time('hora_fin_reserva');
      $table->date('fecha_reserva');
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
    Schema::dropIfExists('reservas');
  }
}
