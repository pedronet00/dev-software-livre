<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessoesTerapia extends Model
{
    use HasFactory;

    protected $table = 'sessoes_terapias';

    protected $fillable = [
        "pacienteId",
        "dataSessao",
        "notasSessao",
        "tecnicasUtilizadasSessao",
        'userId'
    ];
}
