<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolicitudesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('solicitudes', function (Blueprint $table) {
      $table->bigIncrements('id_solicitud');
      $table
        ->foreignid('id')
        ->nullOnDelete()
        ->constrained('users');
      $table->string('materia_solicitud', 250);
      $table->integer('cantidad_estudiantes_solicitud');
      $table->string('motivo_reserva_solicitud', 250);
      $table->date('fecha_requerida_solicitud');
      $table->time('hora_requerida_solicitud');
      $table->integer('periodos_solicitud');
      $table->string('estado_solicitud', 250);
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
    Schema::dropIfExists('solicitudes');
  }
}
