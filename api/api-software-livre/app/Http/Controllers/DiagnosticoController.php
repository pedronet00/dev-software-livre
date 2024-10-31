<?php

namespace App\Http\Controllers;

use App\Models\Diagnostico;
use Illuminate\Http\Request;

class DiagnosticoController extends Controller
{
    public function index(Request $request)
    {
        $diagnosticos = Diagnostico::where('userId', $request->idUser)->with('paciente')->get();
        return $diagnosticos;
    }

    public function store(Request $request)
    {
        $request->validate([
            'pacienteId' => 'required',
            'dataDiagnostico' => 'required|date',
            'descricaoDiagnostico' => 'required',
        ]);

        Diagnostico::create($request->all());
        return redirect()->back()->with('success', 'Diagnóstico registrado com sucesso.');
    }

    public function update(Request $request, $id)
    {
        $diagnostico = Diagnostico::findOrFail($id);
        $diagnostico->update($request->all());

        return redirect()->back()->with('success', 'Diagnóstico atualizado com sucesso.');
    }
}

