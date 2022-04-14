<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocenteSolicitudesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('docente_solicitudes', function (Blueprint $table) {
      $table->bigIncrements('id_doc_std');
      $table->unsignedBigInteger('id_solicitud');
      $table
        ->foreign('id_solicitud')
        ->references('id_solicitud')
        ->on('solicitudes');
      $table->string('nombre_doc_std', 250);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('docente_solicitudes');
  }
}
