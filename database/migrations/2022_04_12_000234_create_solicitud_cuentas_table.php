<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolicitudCuentasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('solicitud_cuentas', function (Blueprint $table) {
      $table->id('id_sct_cnt');
      $table->string('nombre_sct_cnt', 250);
      $table->string('correo_sct_cnt', 250);
      $table->unsignedBigInteger('id_mat_sct');
      $table
        ->foreign('id_mat_sct')
        ->references('id_mat_sct')
        ->on('materia_solicitadas');
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
    Schema::dropIfExists('solicitud_cuentas');
  }
}
