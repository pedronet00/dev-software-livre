<?php

namespace App\Http\Controllers;

use App\Models\Agendamento;
use Illuminate\Http\Request;

class AgendamentoController extends Controller
{
    public function index()
    {
        $agendamentos = Agendamento::all();
        return $agendamentos;
    }

    public function store(Request $request)
    {
        $request->validate([
            'paciente_id' => 'required',
            'data' => 'required|date',
            'hora' => 'required',
        ]);

        Agendamento::create($request->all());
        return redirect()->back()->with('success', 'Agendamento criado com sucesso.');
    }
}

