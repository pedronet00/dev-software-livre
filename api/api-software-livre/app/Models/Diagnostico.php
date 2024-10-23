<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diagnostico extends Model
{
    protected $table = 'diagnosticos';

    protected $fillable = [
        'paciente_id', 
        'data', 
        'descricao', 
        'detalhamento',
        'userId'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }
}

