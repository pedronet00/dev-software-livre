<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\AvaliacoesPsicologicas;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AvaliacoesPsicologicasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pacienteId' => $this->faker->numberBetween(1, 50), // Gera uma idade entre 0 e 100 anos
            'dataAvaliacao' => $this->faker->date('Y-m-d', 'now'), // Gera uma data de nascimento
            'observacoes' => $this->faker->text // Gera um endereço falso,
        ];
    }
}
