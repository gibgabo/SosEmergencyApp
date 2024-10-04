<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function showCategoriesPage()
    {
        $categories = Category::all(); // Fetch all categories from the database

        return Inertia('Categories/Index', [
            'categories' => $categories,
        ]);
    }
    public function index()
    {

        $categories = Category::all(); // Fetch all categories from the database
        Log::info('Fetched Categories:', $categories->toArray()); // Log the fetched categories

        return inertia('Welcome', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        sleep(1);
        $validatedData = $request->validate([
            'category_type'    => 'required|string|max:20',
            'description'   => 'required|string|max:255',

        ]);



        // Create a new Incident record
        $category = new Category();
        $category->pin_number    = $validatedData['category_type'];
        $category->client_name   = $validatedData['description'];

        $category->save(); // Save the incident to the database
        return redirect()->route('categories.index')->with(['success' => 'Category updated successfully!']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request  $request)
    {
        $validatedData = $request->validate([
            'category_type' => 'required|string|max:255',
            'description'   => 'required|string|max:255',
        ]);

        // Create a new category with the validated data
        Category::create($validatedData);

        // Redirect back with a success message
        return redirect()->route('categories.index')->with('success', 'Category added successfully!'); //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::find($id);

        // If the category is not found, handle the error accordingly
        if (!$category) {
            return redirect()->route('categories.index')->with('error', 'Category not found.');
        }

        return inertia('Categories/Show', ['category' => $category]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {
        $item = Category::find($id);

        if (!$item) {
            return redirect('categories')->with(['success' => 'Categories Not Found!.']);
        }

        // Delete the image if it exists

        // Delete the incident
        $item->delete();

        // Redirect back to incidents with success message
        return redirect('categories')->with(['success' => 'Categories Report has been deleted.']);
    }
}
