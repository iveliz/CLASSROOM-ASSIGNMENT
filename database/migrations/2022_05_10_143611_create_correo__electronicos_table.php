<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCorreoElectronicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('correo__electronicos', function (Blueprint $table) {
            $table->bigIncrements('id_imail');
            $table
            ->foreign('id_usuario')
            ->references('id')
            ->on('users')
            ->onDelete('set null');
            $table->string('email_principal', 250)->unique();
            $table->string('email_secundario', 250)->unique();;
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
        Schema::dropIfExists('correo__electronicos');
    }
}
