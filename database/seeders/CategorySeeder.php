<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        // Insert the six specific categories
        $categories = [
            ['category_type' => 'fire', 'description' => 'Incidents related to fire'],
            ['category_type' => 'flood', 'description' => 'Incidents related to flooding'],
            ['category_type' => 'accident', 'description' => 'Incidents related to accidents'],
            ['category_type' => 'crime', 'description' => 'Incidents related to criminal activities'],
            ['category_type' => 'medical', 'description' => 'Medical emergencies'],
            ['category_type' => 'others', 'description' => 'Other types of incidents'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
