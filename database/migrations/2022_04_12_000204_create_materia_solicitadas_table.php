<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMateriaSolicitadasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('materia_solicitadas', function (Blueprint $table) {
      $table->bigIncrements('id_mat_sct');
      $table->unsignedBigInteger('id_sct_cnt');
      $table
        ->foreign('id_sct_cnt')
        ->references('id_sct_cnt')
        ->on('solicitud_cuentas');
      $table->bigInteger('id_materia_solicitada');
      $table->bigInteger('id_grupo_solicitado');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('materia_solicitadas');
  }
}
