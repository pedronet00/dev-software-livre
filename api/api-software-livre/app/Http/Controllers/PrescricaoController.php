<?php

namespace App\Http\Controllers;

use App\Models\Prescricao;
use Illuminate\Http\Request;

class PrescricaoController extends Controller
{
    public function index()
    {
        $prescricoes = Prescricao::all();
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
}

