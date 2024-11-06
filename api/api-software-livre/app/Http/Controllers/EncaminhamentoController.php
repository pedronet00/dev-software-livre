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

    public function show($id)
    {
        $encaminhamento = Encaminhamento::find($id);

        return $encaminhamento;
    }

    public function update(Request $request, $id)
    {
        $encaminhamento = Encaminhamento::find($id);

        $encaminhamento->update($request->all());

        return $encaminhamento;
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

    public function destroy($id)
    {
        $encaminhamento = Encaminhamento::findOrFail($id);

        $encaminhamento->delete();

        return response()->json([
            'message' => "Excluído com sucesso!"
        ]);
    }
}

