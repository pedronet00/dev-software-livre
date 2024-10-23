<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('avaliacoes_psicologicas', function (Blueprint $table) {
            $table->integer('userId');
        });

        Schema::table('sessoes_terapia', function (Blueprint $table) {
            $table->integer('userId');
        });

        Schema::table('planos_tratamento', function (Blueprint $table) {
            $table->integer('userId');
        });

        Schema::table('diagnosticos', function (Blueprint $table) {
            $table->integer('userId');
        });

        Schema::table('problemas_identificados', function (Blueprint $table) {
            $table->integer('userId');
        });

        Schema::table('prescricoes', function (Blueprint $table) {
            $table->integer('userId');
        });

        Schema::table('encaminhamentos', function (Blueprint $table) {
            $table->integer('userId');
        });

        Schema::table('agendamentos', function (Blueprint $table) {
            $table->integer('userId');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tables', function (Blueprint $table) {
            //
        });
    }
};
