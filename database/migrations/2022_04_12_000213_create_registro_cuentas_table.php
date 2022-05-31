<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistroCuentasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('registro_cuentas', function (Blueprint $table) {
      $table->id('id_reg_cnt');
      $table
        ->foreignid('id')
        ->nullOnDelete()
        ->constrained('users');
      $table->unsignedBigInteger('id_sct_cnt')->nullable();
      $table
        ->foreign('id_sct_cnt')
        ->references('id_sct_cnt')
        ->on('solicitud_cuentas')
        ->onDelete('set null');
      $table->string('estado_reg_cnt', 250);
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
    Schema::dropIfExists('registro_cuentas');
  }
}
