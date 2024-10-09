<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Paciente;
use Exception;

class PacienteController extends Controller
{
    
    public function index()
    {
        //

        return Paciente::all();
    }

    
    public function store(Request $request)
    {
        try{

            $paciente = Paciente::create([
                'nomePaciente' => $request->nomePaciente,
                'idadePaciente' => $request->idadePaciente,
                'sexoPaciente' => $request->sexoPaciente,
                'dataNascimentoPaciente' => $request->dataNascimentoPaciente,
                'telefonePaciente' => $request->telefonePaciente,
                'emailPaciente' => $request->emailPaciente,
                'enderecoPaciente' => $request->enderecoPaciente,
            ]);
            
        } catch(Exception $e){

            return response()->json([
                'error' => $e->getMessage()
            ],500);
        }

        return response()->json([
           'message' => 'Paciente criado com sucesso!',
            'paciente' => $paciente
        ], 201);
    }

    
    public function show(string $id)
    {
        try{

            if(!$id){
                return response()->json([
                   'message' => 'ID do paciente não informado!'
                ], 400);
            }

            $paciente = Paciente::find($id);

            if(!$paciente){
                return response()->json([
                   'message' => 'Paciente não encontrado!'
                ], 404);
            }

        } catch(Exception $e){

            return response()->json([
                'error' => $e->getMessage()
            ],500);
        }

        return response()->json([
            'paciente' => $paciente
        ], 200);
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
