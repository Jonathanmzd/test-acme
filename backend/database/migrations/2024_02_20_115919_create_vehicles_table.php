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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('placa');
            $table->string('color');
            $table->string('marca');
            $table->enum('tipo', ['particular', 'publico']);
            $table->unsignedBigInteger('conductor_id');
            $table->unsignedBigInteger('propietario_id');
            $table->timestamps();

            $table->foreign('conductor_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('propietario_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
