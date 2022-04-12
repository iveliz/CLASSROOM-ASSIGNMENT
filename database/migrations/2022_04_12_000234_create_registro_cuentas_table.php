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
            $table->bigIncrements('id_reg_cnt');
            $table->bigInteger('id_usuario')->nullable()->index('FK_ADMIN_REGISTRA');
            $table->bigInteger('id_sct_cnt')->nullable()->index('FK_ES_REGISTRADA');
            $table->date('fecha_reg_cnt');
            $table->string('estado_reg_cnt', 250);
            $table->date('fecha_creacion_reg_cnt');
            $table->date('fecha_actualizacion_reg_cnt');
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
        Schema::dropIfExists('registro_cuentas');
    }
}
