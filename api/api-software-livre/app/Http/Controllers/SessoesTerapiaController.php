<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SessoesTerapia;
use Exception;

class SessoesTerapiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SessoesTerapia::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{

            $sessaoTerapia = SessaoTerapia::create([
                'pacienteId' => $request->pacienteId,
                'dataSessao' => $request->dataSessao,
                'notasSessao' => $request->notasSessao,
                'tecnicasUtilizadasSessao' => $request->tecnicasUtilizadasSessao,
                'userId' => $request->userId
            ]);

        } catch(Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ],500);
        }

        return response()->json([
            'message' => 'Sessão de terapia criada com sucesso!',
           'sessaoTerapia' => $sessaoTerapia
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
