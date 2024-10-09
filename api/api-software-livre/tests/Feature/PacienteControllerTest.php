<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Paciente;

class PacienteControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Testa a listagem de pacientes.
     */
    public function test_pode_listar_pacientes(): void
    {
        // Cria 3 pacientes usando a factory
        Paciente::factory()->count(3)->create();

        // Faz a requisição GET para a rota index
        $response = $this->get('/api/pacientes');

        // Verifica se o status da resposta é 200
        $response->assertStatus(200);

        // Verifica se o retorno contém 3 pacientes
        $response->assertJsonCount(3);
    }
}
