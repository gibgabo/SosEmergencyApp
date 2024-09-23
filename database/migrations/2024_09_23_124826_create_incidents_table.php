<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('incidents', function (Blueprint $table) {
            $table->id(); // Unique identifier for each incident

            $table->string('pin_number', 20); // To store the client's PIN number
            $table->string('client_name'); // Name of the client who reported the incident
            $table->string('incident_type'); // Type of incident (you could later store incident types in a separate table for better structure)
            $table->text('description'); // Incident description or comment
            $table->string('image_path')->nullable(); // Path to store the uploaded image (can be nullable in case the user doesn't upload one)

            $table->timestamps(); // Automatically creates created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }
};
