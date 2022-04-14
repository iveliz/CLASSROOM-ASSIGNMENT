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
      $table
        ->foreignid('id_reg_sct')
        ->nullOnDelete()
        ->constrained('registro_solicitudes');
      $table->time('hora_inicio_reserva');
      $table->time('hora_fin_reserva');
      $table->date('fecha_reserva');
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
    Schema::dropIfExists('reservas');
  }
}