<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Incidents>
 */
class IncidentsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pin_number' => fake()->unique()->randomNumber(5),
            'client_name' => fake()->name(),
            'incident_type' => fake()->word(),
            'description' => fake()->sentence(),
            'image_path' => fake()->imageUrl(640, 480, 'cats'),
            'category_id' => rand(1, 6),
        ];
    }
}
