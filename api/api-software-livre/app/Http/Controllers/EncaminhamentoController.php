<?php

namespace App\Http\Controllers;

use App\Models\Encaminhamento;
use Illuminate\Http\Request;

class EncaminhamentoController extends Controller
{
    public function index(Request $request)
    {
        $encaminhamentos = Encaminhamento::where('userId', $request->idUser)->get();
        return $encaminhamentos;
    }

    public function store(Request $request)
    {
        $request->validate([
            'pacienteId' => 'required',
            'dataEncaminhamento' => 'required|date',
            'descricaoEncaminhamento' => 'required',
            'profissionalEncaminhado' => 'required',
        ]);

        Encaminhamento::create($request->all());
        return redirect()->back()->with('success', 'Encaminhamento registrado com sucesso.');
    }
}

