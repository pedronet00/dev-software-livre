<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//* CONTROLLERS
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\AvaliacoesPsicologicasController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//* PACIENTES
Route::get('/pacientes', [PacienteController::class, 'index']);
Route::get('/qtdePacientes', [PacienteController::class, 'pacienteCount']);
Route::post('/paciente', [PacienteController::class, 'store']);
Route::get('/paciente/{id}', [PacienteController::class, 'show']);
Route::delete('/post/{id}', [PacienteController::class, 'destroy']);

//* AVALIAÇÕES PSICOLÓGICAS
Route::get('/avaliacoes', [AvaliacoesPsicologicasController::class, 'index']);
Route::post('/avaliacoes', [AvaliacoesPsicologicasController::class, 'store']);

//* AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


