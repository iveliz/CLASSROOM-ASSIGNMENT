<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGrupoSolicitudesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('grupo_solicitudes', function (Blueprint $table) {
            $table->bigIncrements('id_grupo_sct');
            $table->bigInteger('id_solicitud')->nullable()->index('FK_GRUPOS_SOLICITADOS');
            $table->string('codigo_grupo_sct', 10);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('grupo_solicitudes');
    }
}
