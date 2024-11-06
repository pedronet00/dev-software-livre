<?php

namespace App\Http\Controllers;

use App\Models\Prescricao;
use Illuminate\Http\Request;

class PrescricaoController extends Controller
{
    public function index(Request $request)
    {
        $prescricoes = Prescricao::where('userId', $request->idUser)->get();
        return $prescricoes;
    }

    public function store(Request $request)
    {
        $request->validate([
            'paciente_id' => 'required',
            'data' => 'required|date',
            'descricao' => 'required',
        ]);

        Prescricao::create($request->all());
        return redirect()->back()->with('success', 'Prescrição registrada com sucesso.');
    }

    public function update(Request $request, $id)
    {
        $prescricao = Prescricao::findOrFail($id);

        $prescricao->update($request->all());

        return $prescricao;
    }

    public function show($id)
    {
        $prescricao = Prescricao::find($id);

        return $prescricao;
    }
}

