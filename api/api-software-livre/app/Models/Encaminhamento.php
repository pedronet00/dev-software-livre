<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Encaminhamento extends Model
{
    protected $table = 'encaminhamentos';

    protected $fillable = [
        'paciente_id', 
        'data', 
        'motivo', 
        'profissional_nome'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }
}

