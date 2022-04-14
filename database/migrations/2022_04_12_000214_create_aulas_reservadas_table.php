<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAulasReservadasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('aulas_reservadas', function (Blueprint $table) {
      $table->bigIncrements('id_aula_res');
      $table->unsignedbigInteger('id_reserva')->nullable();
      $table->unsignedbigInteger('id_aula')->nullable();
      $table->timestamp('created_at')->nullable();
      $table->timestamp('update_at')->nullable();
      $table
        ->foreign('id_reserva')
        ->references('id_reserva')
        ->on('reservas');
      $table
        ->foreign('id_aula')
        ->references('id_aula')
        ->on('aulas');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('aulas_reservadas');
  }
}
