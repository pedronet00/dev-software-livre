<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Paciente;
use Exception;

class PacienteController extends Controller
{
    
    public function index(Request $request)
    {
        return Paciente::where('userId', $request->idUser)->get();
    }

    public function pacienteCount(Request $request){
        return Paciente::where('userId', $request->idUser)->count();
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
                'userId' => $request->userId
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

    
    public function update(Request $request, string $id)
    {
        try {
            // Verifica se o ID foi passado
            if(!$id) {
                return response()->json([
                'message' => 'ID do paciente não informado!'
                ], 400);
            }

            // Busca o paciente pelo ID
            $paciente = Paciente::find($id);

            // Verifica se o paciente foi encontrado
            if(!$paciente) {
                return response()->json([
                'message' => 'Paciente não encontrado!'
                ], 404);
            }

            // Atualiza os campos do paciente
            $paciente->update([
                'nomePaciente' => $request->nomePaciente,
                'idadePaciente' => $request->idadePaciente,
                'sexoPaciente' => $request->sexoPaciente,
                'dataNascimentoPaciente' => $request->dataNascimentoPaciente,
                'telefonePaciente' => $request->telefonePaciente,
                'emailPaciente' => $request->emailPaciente,
                'enderecoPaciente' => $request->enderecoPaciente,
                'userId' => $request->userId
            ]);

        } catch(Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
        'message' => 'Paciente atualizado com sucesso!',
        'paciente' => $paciente
        ], 200);
    }

    public function destroy(string $id)
    {
        try {
            // Verifica se o ID foi passado
            if(!$id) {
                return response()->json([
                'message' => 'ID do paciente não informado!'
                ], 400);
            }

            // Busca o paciente pelo ID
            $paciente = Paciente::find($id);

            // Verifica se o paciente foi encontrado
            if(!$paciente) {
                return response()->json([
                'message' => 'Paciente não encontrado!'
                ], 404);
            }

            // Deleta o paciente
            $paciente->delete();

        } catch(Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
        'message' => 'Paciente excluído com sucesso!'
        ], 200);
    }

}
