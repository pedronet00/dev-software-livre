<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//* CONTROLLERS
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\AvaliacoesPsicologicasController;
use App\Http\Controllers\PlanoTratamentoController;
use App\Http\Controllers\DiagnosticoController;
use App\Http\Controllers\ProblemaIdentificadoController;
use App\Http\Controllers\PrescricaoController;
use App\Http\Controllers\EncaminhamentoController;
use App\Http\Controllers\AgendamentoController;
use App\Http\Controllers\SessoesTerapiaController;

//* ROTA USER (com autenticação sanctum)
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

//* PLANOS DE TRATAMENTO
Route::get('/planos-tratamento', [PlanoTratamentoController::class, 'index']);
Route::post('/plano-tratamento', [PlanoTratamentoController::class, 'store']);
Route::put('/plano-tratamento/{id}', [PlanoTratamentoController::class, 'update']);

//* DIAGNÓSTICOS
Route::get('/diagnosticos', [DiagnosticoController::class, 'index']);
Route::post('/diagnostico', [DiagnosticoController::class, 'store']);
Route::put('/diagnostico/{id}', [DiagnosticoController::class, 'update']);

//* PROBLEMAS IDENTIFICADOS
Route::get('/problemas-identificados', [ProblemaIdentificadoController::class, 'index']);
Route::post('/problema-identificado', [ProblemaIdentificadoController::class, 'store']);
Route::put('/problema-identificado/{id}', [ProblemaIdentificadoController::class, 'update']);

//* PRESCRIÇÕES
Route::get('/prescricoes', [PrescricaoController::class, 'index']);
Route::post('/prescricao', [PrescricaoController::class, 'store']);

//* ENCAMINHAMENTOS
Route::get('/encaminhamentos', [EncaminhamentoController::class, 'index']);
Route::post('/encaminhamento', [EncaminhamentoController::class, 'store']);

//* AGENDAMENTOS
Route::get('/agendamentos', [AgendamentoController::class, 'index']);
Route::post('/agendamento', [AgendamentoController::class, 'store']);


//* AGENDAMENTOS
Route::get('/sessoes', [SessoesTerapiaController::class, 'index']);
Route::post('/sessoes', [SessoesTerapiaController::class, 'store']);
