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
        Schema::create('avaliacoes_psicologicas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pacienteId');
            $table->date('dataAvaliacao');
            $table->text('observacoes')->nullable();
            $table->timestamps();

            // Definindo a chave estrangeira
            $table->foreign('pacienteId')->references('id')->on('pacientes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avaliacoes_psicologicas');
    }
};
