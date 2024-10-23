<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
    protected $table = 'agendamentos';

    protected $fillable = [
        'paciente_id', 
        'data', 
        'hora',
        'userId'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }
}

