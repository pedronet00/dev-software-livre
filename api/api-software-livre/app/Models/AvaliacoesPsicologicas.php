<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvaliacoesPsicologicas extends Model
{
    use HasFactory;

    protected $fillable = [
        'pacienteId',
        'dataAvaliacao',
        'observacoes'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'pacienteId');
    }
}
