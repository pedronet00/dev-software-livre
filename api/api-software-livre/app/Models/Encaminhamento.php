<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Encaminhamento extends Model
{
    protected $table = 'encaminhamentos';

    protected $fillable = [
        'pacienteId', 
        'dataEncaminhamento', 
        'descricaoEncaminhamento', 
        'profissionalEncaminhado',
        'userId'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }
}

