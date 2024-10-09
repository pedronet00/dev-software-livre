<?php

namespace Database\Factories;
use App\Models\Paciente;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paciente>
 */
class PacienteFactory extends Factory
{

    protected $model = Paciente::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nomePaciente' => $this->faker->name, // Gera um nome falso
            'idadePaciente' => $this->faker->numberBetween(0, 100), // Gera uma idade entre 0 e 100 anos
            'sexoPaciente' => $this->faker->randomElement(['1', '0']), // Gera um valor aleatório entre masculino e feminino
            'telefonePaciente' => $this->faker->phoneNumber, // Gera um número de telefone falso
            'emailPaciente' => $this->faker->unique()->safeEmail, // Gera um e-mail único e seguro
            'dataNascimentoPaciente' => $this->faker->date('Y-m-d', 'now'), // Gera uma data de nascimento
            'enderecoPaciente' => $this->faker->address, // Gera um endereço falso,
            'userId'=> $this->faker->numberBetween(0, 10)
        ];
    }
}
