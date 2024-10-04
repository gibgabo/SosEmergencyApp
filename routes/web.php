<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\IncidentsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Category;


// Route for the welcome page
Route::get('/', function () {
    $categories = Category::all();
    return inertia('Welcome', ['categories' => $categories]);
})->name('welcome');

// Resource routes for categories
Route::resource('categories', CategoryController::class);

// Route to add incidents with category_id
Route::get('/incidents/add/{category_id}', [IncidentsController::class, 'add'])->name('incident.add');

// Route to handle the form submission for creating an incident
Route::post('/incidents/create', [IncidentsController::class, 'create'])->name('incident.create');

// Group specific routes for incident creation by type
Route::post('/incidents/fire/create', [IncidentsController::class, 'create'])->name('fire.incident.create');
Route::post('/incidents/accident/create', [IncidentsController::class, 'create'])->name('accident.incident.create');
Route::post('/incidents/crime/create', [IncidentsController::class, 'create'])->name('crime.incident.create');
Route::post('/incidents/flood/create', [IncidentsController::class, 'create'])->name('flood.incident.create');
Route::post('/incidents/medical/create', [IncidentsController::class, 'create'])->name('medical.incident.create');
Route::post('/incidents/other/create', [IncidentsController::class, 'create'])->name('other.incident.create');

// The remaining routes within the auth middleware group
Route::middleware('auth')->group(function () {
    // Keep this dashboard route to fetch incident counts
    Route::get('/dashboard', [IncidentsController::class, 'getIncidentCounts'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('incidents')->controller(IncidentsController::class)->group(function () {
        Route::get('/', 'index')->name('incidents.index');
        Route::get('edit/{id}', 'edit')->name('incident.edit');
        Route::post('update/{id}', 'update')->name('incident.update');
        Route::get('show/{id}', 'show')->name('incident.show');
        Route::delete('delete/{id}', 'delete')->name('incident.delete');
        Route::get('restore/{id}', 'restore')->name('incident.restore');
    });
    Route::get('/categories-page', [CategoryController::class, 'showCategoriesPage'])->name('categories.page');
    Route::prefix('categories')->controller(CategoryController::class)->group(function () {
        Route::get('/', 'index')->name('categories.index');
        Route::get('/add', 'add')->name('categories.add');
        Route::post('/create', 'create')->name('categories.create.unique'); // Modified the name
        Route::post('update/{id}', 'update')->name('categories.update.unique'); // Modified the name
        Route::get('edit/{id}', 'edit')->name('categories.edit.unique'); // Modified the name
        Route::get('show/{id}', 'show')->name('categories.show.unique'); // Modified the name
        Route::delete('delete/{id}', 'delete')->name('categories.delete');
        Route::get('restore/{id}', 'restore')->name('categories.restore');
        //for pages


        // Modified this route to avoid name conflicts with model binding route
        Route::put('{category}', 'update')->name('categories.update.category'); // Modified the name
        Route::get('{category}/edit', 'edit')->name('categories.edit.category'); // Modified the name // Modified the name
    });
});

require __DIR__ . '/auth.php';
