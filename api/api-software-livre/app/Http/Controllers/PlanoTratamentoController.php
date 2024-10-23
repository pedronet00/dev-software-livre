<?php

namespace App\Http\Controllers;

use App\Models\PlanoTratamento;
use Illuminate\Http\Request;

class PlanoTratamentoController extends Controller
{
    public function index()
    {
        $planos = PlanoTratamento::all();
        return $planos;
    }

    public function store(Request $request)
    {
        $request->validate([
            'paciente_id' => 'required',
            'data_inicio' => 'required|date',
            'objetivos_terapeuticos' => 'required',
            'userId' => 'required'
        ]);

        PlanoTratamento::create($request->all());
        return redirect()->back()->with('success', 'Plano de tratamento criado com sucesso.');
    }

    public function update(Request $request, $id)
    {
        $plano = PlanoTratamento::findOrFail($id);
        $plano->update($request->all());

        return redirect()->back()->with('success', 'Plano de tratamento atualizado com sucesso.');
    }
}

