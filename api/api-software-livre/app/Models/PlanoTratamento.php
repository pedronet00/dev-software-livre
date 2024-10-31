<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Paciente;

class PlanoTratamento extends Model
{
    protected $table = 'planos_tratamento';

    protected $fillable = [
        'pacienteId', 
        'dataInicio', 
        'objetivos', 
        'progresso',
        'userId'
    ];

    // Relacionamento com o Paciente
    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }
}

