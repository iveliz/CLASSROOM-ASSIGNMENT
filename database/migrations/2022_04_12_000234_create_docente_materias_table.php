<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocenteMateriasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('docente_materias', function (Blueprint $table) {
            $table->bigIncrements('id_doc_mat');
            $table->bigInteger('id_materia')->nullable()->index('FK_PERTENECE_A');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('update_at')->nullable();
            $table->foreign('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('docente_materias');
    }
}
