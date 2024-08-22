<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// POSTS
Route::get('/posts', [PostController::class, 'index']);
Route::post('/post', [PostController::class, 'store']);
Route::get('/post/{id}', [PostController::class, 'show']);
Route::get('/ultimoPost', [PostController::class, 'getLastPost']);
Route::delete('/post/{id}', [PostController::class, 'destroy']);

// AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// COMMENTS
Route::get('/comments/{id}', [CommentController::class, 'getCommentsByPostId']);
Route::post('/comments', [CommentController::class, 'store']);
