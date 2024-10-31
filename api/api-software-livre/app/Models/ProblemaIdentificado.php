<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProblemaIdentificado extends Model
{
    protected $table = 'problemas_identificados';

    protected $fillable = [
        'pacienteId', 
        'dataIdentificacao', 
        'problema', 
        'evolucao',
        'userId'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }
}

