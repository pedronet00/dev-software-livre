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
        Schema::create('pacientes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nomePaciente');
            $table->integer('idadePaciente');
            $table->integer('sexoPaciente');
            $table->string('telefonePaciente');
            $table->string('emailPaciente');
            $table->string('enderecoPaciente');
            $table->date('dataNascimentoPaciente');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pacientes');
    }
};
