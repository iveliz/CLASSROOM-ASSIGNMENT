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
      $table->string('usuario_sct_cnt', 250);
      $table->string('correo_principal_sct_cnt', 250);
      $table->string('correo_secundario_sct_cnt', 250);
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
    Schema::dropIfExists('solicitud_cuentas');
  }
}
