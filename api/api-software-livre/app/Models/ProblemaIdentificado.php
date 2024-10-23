<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProblemaIdentificado extends Model
{
    protected $table = 'problemas_identificados';

    protected $fillable = [
        'paciente_id', 
        'data', 
        'descricao', 
        'evolucao',
        'userId'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }
}

