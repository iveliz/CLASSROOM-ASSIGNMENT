<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistroSolicitudesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('registro_solicitudes', function (Blueprint $table) {
            $table->bigIncrements('id_reg_sct');
            $table->bigInteger('id_solicitud')->nullable()->index('FK_ESTA_EN_UN');
            $table->bigInteger('id_usuario')->nullable()->index('FK_ADMIN_MODIFICA');
            $table->date('fecha_inicio_reg_sct');
            $table->date('fecha_modificiacion_reg_sct');
            $table->string('estado_solicitud_reg_sct', 250);
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
        Schema::dropIfExists('registro_solicitudes');
    }
}
