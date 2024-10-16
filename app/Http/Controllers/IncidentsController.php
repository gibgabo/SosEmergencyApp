<?php

namespace App\Http\Controllers;

use App\Models\Incidents;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class IncidentsController extends Controller
{
    public function index(Request $request)
{
    $term = $request->input('term');
    $query = Incidents::with('category');

    // Apply search term if provided
    if ($term) {
        $query->where(function ($query) use ($term) {
            $query->where('pin_number', 'LIKE', '%' . $term . '%')
                  ->orWhere('client_name', 'LIKE', '%' . $term . '%')
                  ->orWhere('incident_type', 'LIKE', '%' . $term . '%')
                  ->orWhere('description', 'LIKE', '%' . $term . '%');
        });
    }

    // Paginate results and append the search term to the pagination links
    $incidents = $query->latest()->paginate(10)->appends(['term' => $term]);

    return inertia('Incidents/Index', [
        'incidents' => $incidents,
        'term' => $term, // Pass the search term back to the frontend
    ]);
}


    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'pin_number'    => 'required|string|max:20',
            'client_name'   => 'required|string|max:255',
            'incident_type' => 'required|string|max:255',
            'description'   => 'required|string',
            'image'         => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id'   => 'required|integer',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('incident_images', 'public');
        }

        $incident = new Incidents();
        $incident->pin_number    = $validatedData['pin_number'];
        $incident->client_name   = $validatedData['client_name'];
        $incident->incident_type = $validatedData['incident_type'];
        $incident->description   = $validatedData['description'];
        $incident->category_id   = $validatedData['category_id'];
        $incident->image_path    = $imagePath;
        $incident->save();

        $categories = Category::all();
        Log::info('Fetched Categories:', $categories->toArray());

        return inertia('Welcome', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'pin_number'    => 'required|string|max:20',
            'client_name'   => 'required|string|max:255',
            'incident_type' => 'required|string|max:255',
            'description'   => 'required|string',
            'image'         => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id'   => 'required|exists:categories,id',
        ]);

       $imagePath = $request->file('image')->store('incident_images', 'public');


        Incidents::create([
            'pin_number'    => $validatedData['pin_number'],
            'client_name'   => $validatedData['client_name'],
            'incident_type' => $validatedData['incident_type'],
            'description'   => $validatedData['description'],
            'image_path'    => $imagePath,
        ]);

        $categories = Category::all();

        return Inertia::location(route('welcome', ['categories' => $categories]));
    }

    private function handleImageUpload(Request $request)
    {
        if ($request->hasFile('image')) {
            return $request->file('image')->store('incident_images', 'public');
        }
        return null;
    }

    public function add($category_id)
    {
        $category = Category::find($category_id);
        if (!$category) {
            return redirect()->route('incidents.index')->with('error', 'Category not found.');
        }

        return Inertia::render("Incidents/{$category->category_type}", [
            'category_id' => $category_id
        ]);
    }

    public function edit($id)
    {
        $incident = Incidents::findOrFail($id);
        return inertia('Incidents/Edit', ['incident' => $incident]);
    }

    public function update(Request $request, $id)
    {
        $incident = Incidents::findOrFail($id);

        $request->validate([
            'pin_number' => 'required',
            'client_name' => 'required',
            'incident_type' => 'required',
            'description' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $incident->pin_number = $request->pin_number;
        $incident->client_name = $request->client_name;
        $incident->incident_type = $request->incident_type;
        $incident->description = $request->description;

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($incident->image_path) {
                Storage::disk('public')->delete($incident->image_path);
            }
            // Store the new image
            $incident->image_path = $request->file('image')->store('incident_images', 'public');
        }

        $incident->save();

        return redirect()->route('incidents.index')->with('success', 'Incident updated successfully.');
    }

    public function show($id)
    {
        $incident = Incidents::findOrFail($id);
        return inertia('Incidents/Show', ['incident' => $incident]);
    }

    public function delete($id)
    {
        $incident = Incidents::findOrFail($id);

        // Delete the associated image if it exists
        if ($incident->image_path) {
            Storage::disk('public')->delete($incident->image_path);
        }

        $incident->delete();

        return redirect()->route('incidents.index')->with('success', 'Incident deleted successfully.');
    }

    public function restore($id)
    {
        $incident = Incidents::withTrashed()->find($id);
        $incident->restore();

        return redirect()->back()->with('success', 'Incident restored successfully.');
    }

    public function getIncidentCounts()
    {
        $counts = DB::table('incidents')
            ->join('categories', 'incidents.category_id', '=', 'categories.id')
            ->select('categories.category_type', DB::raw('COUNT(incidents.id) as incident_count'))
            ->whereNull('incidents.deleted_at')
            ->groupBy('categories.category_type')
            ->get();

        return inertia('Dashboard', ['counts' => $counts]);
    }

    public function showByCategory($category)
    {
        $categoryDetails = Category::where('category_type', $category)->first();

        if (!$categoryDetails) {
            abort(404, 'Category not found.');
        }

        $incidents = Incidents::where('category_id', $categoryDetails->id)->paginate(5);

        return Inertia::render('CategoryIncidents/CategoryIncidents', [
            'incidents' => $incidents,
            'category' => $categoryDetails,
        ]);
    }
}
