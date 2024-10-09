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
        Schema::create('sessoes_terapia', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pacienteId');
            $table->date('dataSessao');
            $table->text('notas')->nullable();
            $table->text('tecnicasUtilizadas')->nullable();
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
        Schema::dropIfExists('sessoes_terapia');
    }
};
