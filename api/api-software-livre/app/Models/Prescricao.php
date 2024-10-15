<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prescricao extends Model
{
    protected $table = 'prescricoes';

    protected $fillable = [
        'paciente_id', 
        'data', 
        'descricao'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }
}

