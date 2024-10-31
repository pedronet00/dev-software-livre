<?php

namespace App\Http\Controllers;

use App\Models\PlanoTratamento;
use Illuminate\Http\Request;
use Exception;

class PlanoTratamentoController extends Controller
{
    public function index(Request $request)
    {
        $planos = PlanoTratamento::where('userId', $request->idUser)->get();
        return $planos;
    }

    public function show(string $id){

        $plano = PlanoTratamento::find($id);

        return $plano;
    }

    public function store(Request $request)
    {
        try{
            $request->validate([
                'pacienteId' => 'required',
                'dataInicio' => 'required|date',
                'objetivos' => 'required',
                'userId' => 'required'
            ]);
    
            $plano = PlanoTratamento::create($request->all());
        } catch(Exception $e){
            return response()->json([
                'message' => 'Erro!',
                'erros' => $e->getMessage()
            ]);
        }
        return response()->json([
            'message' => 'Sucesso!',
            'plano' => $plano
        ]);
    }

    public function update(Request $request, $id)
    {
        $plano = PlanoTratamento::findOrFail($id);
        $plano->update($request->all());

        return redirect()->back()->with('success', 'Plano de tratamento atualizado com sucesso.');
    }
}

