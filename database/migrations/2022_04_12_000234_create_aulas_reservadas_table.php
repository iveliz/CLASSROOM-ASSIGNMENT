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
            $table->bigInteger('id_reserva')->nullable()->index('FK_PUEDE_TENER');
            $table->bigInteger('id_aula')->nullable()->index('FK_ES_PARTE_DE');
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
        Schema::dropIfExists('aulas_reservadas');
    }
}
