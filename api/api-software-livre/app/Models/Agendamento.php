<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Paciente;

class Agendamento extends Model
{
    protected $table = 'agendamentos';

    protected $fillable = [
        'pacienteId', 
        'dataAgendamento', 
        'horaAgendamento',
        'userId',
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'pacienteId');
    }
}

