<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Exception;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::all();
    }

    public function getLastPost()
    {
        $ultimoPost = Post::orderBy('created_at', 'desc')->first();;

        return $ultimoPost;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{

            if(!$request->tituloPost){
                throw new Exception("O título do post não pode estar vazio!");
            }

            $post = Post::create([
                'tituloPost' => $request->tituloPost,
                'subtituloPost' => $request->subtituloPost,
                'textoPost' => $request->textoPost,
                'imgPost' => $request->imgPost
            ]);

        } catch(Exception $e){
            return response() ->json([
                'status' => false,
                'message' => "Erro: ". $e->getMessage()
            ], 500);
        }

        return response()->json([
            "status" => true,
            "message" => "Post inserido com sucesso!"
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::find($id);

        return $post;
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

        try{
            $post = Post::find($id);
    
            if(!$post){
                throw new Exception("O post não existe!");
            }
            $post->delete();

            return response()->json([
                "status" => true,
                "message" => "Post excluído com sucesso!"
            ], 200);
            
        } catch(Exception $e){
            return response()->json([
                "status" => false,
                "message" => "Erro: ". $e->getMessage()
            ], 500);
        }
        

        
    }
}
