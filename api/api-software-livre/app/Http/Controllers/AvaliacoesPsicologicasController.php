<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AvaliacoesPsicologicas;

class AvaliacoesPsicologicasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AvaliacoesPsicologicas::with('paciente:id,nomePaciente')->where('userId', $request->idUser)->get();
    }
    

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'pacienteId' => 'required|exists:pacientes,id', 
            'dataAvaliacao' => 'required|date',
            'observacoes' => 'nullable|string'
        ]);

        try {
            $avaliacao = AvaliacoesPsicologicas::create([
                'pacienteId' => $validatedData['pacienteId'],
                'dataAvaliacao' => $validatedData['dataAvaliacao'],
                'observacoes' => $validatedData['observacoes'],
                'userId' => $request->userId
            ]);

            return response()->json([
                'message' => 'Avaliação psicológica criada com sucesso!',
                'avaliacao' => $avaliacao
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }


    
    public function show(string $id)
    {
        //
    }

    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
