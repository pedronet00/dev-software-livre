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
Route::put('/paciente/{id}', [PacienteController::class, 'update']);
Route::get('/paciente/{id}', [PacienteController::class, 'show']);
Route::delete('/post/{id}', [PacienteController::class, 'destroy']);

//* AVALIAÇÕES PSICOLÓGICAS
Route::get('/avaliacoes', [AvaliacoesPsicologicasController::class, 'index']);
Route::post('/avaliacoes', [AvaliacoesPsicologicasController::class, 'store']);
Route::get('/avaliacoes/{id}', [AvaliacoesPsicologicasController::class, 'show']);
Route::put('/avaliacoes/{id}', [AvaliacoesPsicologicasController::class, 'update']);
Route::delete('/avaliacoes/{id}', [AvaliacoesPsicologicasController::class, 'destroy']);

//* AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//* PLANOS DE TRATAMENTO
Route::get('/planos-tratamento', [PlanoTratamentoController::class, 'index']);
Route::post('/plano-tratamento', [PlanoTratamentoController::class, 'store']);
Route::put('/plano-tratamento/{id}', [PlanoTratamentoController::class, 'update']);
Route::get('/plano-tratamento/{id}', [PlanoTratamentoController::class, 'show']);
Route::delete('/plano-tratamento/{id}', [PlanoTratamentoController::class, 'destroy']);

//* DIAGNÓSTICOS
Route::get('/diagnosticos', [DiagnosticoController::class, 'index']);
Route::get('/diagnosticos/{id}', [DiagnosticoController::class, 'show']);
Route::post('/diagnostico', [DiagnosticoController::class, 'store']);
Route::put('/diagnostico/{id}', [DiagnosticoController::class, 'update']);
Route::delete('/diagnostico/{id}', [DiagnosticoController::class, 'destroy']);

//* PROBLEMAS IDENTIFICADOS
Route::get('/problemas-identificados', [ProblemaIdentificadoController::class, 'index']);
Route::get('/problemas-identificados/{id}', [ProblemaIdentificadoController::class, 'show']);
Route::post('/problema-identificado', [ProblemaIdentificadoController::class, 'store']);
Route::put('/problema-identificado/{id}', [ProblemaIdentificadoController::class, 'update']);
Route::delete('/problema-identificado/{id}', [ProblemaIdentificadoController::class, 'destroy']);

//* PRESCRIÇÕES
Route::get('/prescricoes', [PrescricaoController::class, 'index']);
Route::get('/prescricoes/{id}', [PrescricaoController::class, 'show']);
Route::post('/prescricao', [PrescricaoController::class, 'store']);
Route::put('/prescricao/{id}', [PrescricaoController::class, 'update']);
Route::delete('/prescricao/{id}', [PrescricaoController::class, 'destroy']);

//* ENCAMINHAMENTOS
Route::get('/encaminhamentos', [EncaminhamentoController::class, 'index']);
Route::post('/encaminhamento', [EncaminhamentoController::class, 'store']);
Route::get('/encaminhamento/{id}', [EncaminhamentoController::class, 'show']);
Route::put('/encaminhamento/{id}', [EncaminhamentoController::class, 'update']);
Route::delete('/encaminhamento/{id}', [EncaminhamentoController::class, 'destroy']);

//* AGENDAMENTOS
Route::get('/agendamentos', [AgendamentoController::class, 'index']);
Route::post('/agendamento', [AgendamentoController::class, 'store']);
Route::get('/agendamento/{id}', [AgendamentoController::class, 'show']);
Route::put('/agendamento/{id}', [AgendamentoController::class, 'update']);
Route::delete('/agendamento/{id}', [AgendamentoController::class, 'destroy']);


//* AGENDAMENTOS
Route::get('/sessoes', [SessoesTerapiaController::class, 'index']);
Route::post('/sessoes', [SessoesTerapiaController::class, 'store']);
