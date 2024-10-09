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
        Schema::create('problemas_identificados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pacienteId');
            $table->date('dataIdentificacao');
            $table->text('problema');
            $table->text('evolucao');
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
        Schema::dropIfExists('problemas_identificados');
    }
};
