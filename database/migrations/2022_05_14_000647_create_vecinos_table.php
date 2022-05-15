<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVecinosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vecinos', function (Blueprint $table) {
            $table->id('id_vecino');
            $table->unsignedBigInteger('id_aula')->nullable();
            $table->unsignedBigInteger('id_aula_vecina')->nullable();
            $table->integer('distancia');
            $table
                ->foreign('id_aula')
                ->references('id_aula')
                ->on('aulas')
                ->onDelete('set null');
            $table
                ->foreign('id_aula_vecina')
                ->references('id_aula')
                ->on('aulas')
                ->onDelete('set null');
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
        Schema::dropIfExists('vecinos');
    }
}
