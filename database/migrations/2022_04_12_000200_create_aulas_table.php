<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAulasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('aulas', function (Blueprint $table) {
      $table->bigIncrements('id_aula');
      $table->string('numero_aula',10);
      $table->string('letra_aula', 10)->nullable();
      $table->integer('capacidad_aula');
      $table->string('ubicacion_aula', 250);
      $table->string('piso_aula', 50);
      $table->string('descripcion_aula', 250);
      $table->string('tipo_aula', 250)->nullable();
      $table->time('hora_apertura_aula');
      $table->time('hora_cierre_aula');
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
    Schema::dropIfExists('aulas');
  }
}
