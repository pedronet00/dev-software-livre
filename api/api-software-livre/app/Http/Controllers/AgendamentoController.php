<?php

namespace App\Http\Controllers;

use App\Models\Agendamento;
use Illuminate\Http\Request;

class AgendamentoController extends Controller
{
    public function index(Request $request)
    {
        $agendamentos = Agendamento::with('paciente')->where('userId', $request->idUser)->get();
        return $agendamentos;
    }

    public function show($id){
        $agendamento = Agendamento::find($id);

        return $agendamento;
    }

    public function update(Request $request, $id)
    {
        $agendamento = Agendamento::findOrFail($id);

        $agendamento->update($request->all());

        return $agendamento;
    }

    public function store(Request $request)
    {
        $request->validate([
            'pacienteId' => 'required',
            // 'data' => 'required|date',
            // 'hora' => 'required',
        ]);

        Agendamento::create($request->all());
        return redirect()->back()->with('success', 'Agendamento criado com sucesso.');
    }
}

