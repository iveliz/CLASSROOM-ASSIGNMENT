<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('usuarios', function (Blueprint $table) {
      $table->bigIncrements('id_usuario');
      $table->string('nombre_usuario', 250);
      $table->string('email_usuario', 250);
      $table->string('contrasenia_usuario', 250);
      $table->string('token_recordado_usuario', 250)->nullable();
      $table->char('rol_usuario', 20);
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
    Schema::dropIfExists('usuarios');
  }
}
