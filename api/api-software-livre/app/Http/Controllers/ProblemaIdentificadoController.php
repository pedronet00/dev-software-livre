<?php

namespace App\Http\Controllers;

use App\Models\ProblemaIdentificado;
use Illuminate\Http\Request;

class ProblemaIdentificadoController extends Controller
{
    public function index(Request $request)
    {
        $problemas = ProblemaIdentificado::where('userId', $request->idUser)->get();
        return $problemas;
    }

    public function store(Request $request)
    {
        $request->validate([
            'pacienteId' => 'required',
            'dataIdentificacao' => 'required|date',
            'problema' => 'required',
        ]);

        ProblemaIdentificado::create($request->all());
        return redirect()->back()->with('success', 'Problema registrado com sucesso.');
    }

    public function update(Request $request, $id)
    {
        $problema = ProblemaIdentificado::findOrFail($id);
        $problema->update($request->all());

        return redirect()->back()->with('success', 'Problema atualizado com sucesso.');
    }
}

