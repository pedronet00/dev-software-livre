<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    
    public function index()
    {
        return Comment::all();
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {

        try{

            if(!$request->textoComentario){
                throw new Exception("O comentário não pode estar vazio!");
            }

            $comment = Comment::create([
                'idPost' => $request->idPost,
                'idUsuario' => $request->idUsuario,
                'textoComentario' => $request->textoComentario,
            ]);

        } catch(Exception $e){
            return response() -> json([
                'message' => 'Erro: '. $e->getMessage()
            ], 500);
        }

        return response() -> json([
            'message' => 'Comentário postado com sucesso!'
        ], 200);

        
    }
   
    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
