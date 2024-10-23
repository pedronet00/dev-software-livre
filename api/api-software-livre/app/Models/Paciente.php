<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomePaciente',
        'idadePaciente',
        'sexoPaciente',
        'telefonePaciente',
        'emailPaciente',
        'dataNascimentoPaciente',
        'enderecoPaciente',
        'userId'
    ];

    public function avaliacoes()
    {
        return $this->hasMany(AvaliacoesPsicologicas::class, 'pacienteId');
    }
}
