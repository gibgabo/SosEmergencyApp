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

        if ($request->term) {
            $query->where(function ($query) use ($request) {
                $query->where('pin_number', 'LIKE', '%' . $request->term . '%')
                    ->orWhere('client_name', 'LIKE', '%' . $request->term . '%')
                    ->orWhere('incident_type', 'LIKE', '%' . $request->term . '%')
                    ->orWhere('description', 'LIKE', '%' . $request->term . '%');
            });
        }
        $incidents = $query->latest()->paginate(10)->appends(['term' => $term]);;
        return inertia('Incidents/Index', [
            'incidents' => $incidents
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
            'category_id' => 'required|integer',
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
            'category_id' => 'required|exists:categories,id',
        ]);

        $imagePath = $this->handleImageUpload($request);

        Incidents::Create([
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
        $validatedData = $request->validate([
            'pin_number'    => 'required|string|max:20',
            'client_name'   => 'required|string|max:255',
            'incident_type' => 'required|string|max:255',
            'description'   => 'required|string',
        ]);

        $incident = Incidents::findOrFail($id);
        $incident->update($validatedData);

        return redirect()->route('incidents.index')->with(['success' => 'Incident updated successfully!']);
    }

    public function show($id)
    {
        $incident = Incidents::where('id', $id)->first();
        return inertia('Incidents/Show', ['incident' => $incident]);
    }

    public function delete($id)
    {
        $item = Incidents::findOrFail($id);

        if ($item->image_path) {
            Storage::disk('public')->delete($item->image_path);
        }

        $item->delete();

        return redirect('incidents')->with(['success' => 'Incident Report has been deleted.']);
    }

    public function restore($id)
    {
        $item = Incidents::withTrashed()->find($id);
        $item->restore();

        return redirect()->back();
    }
    public function getIncidentCounts()
    {
        $counts = DB::table('incidents')
            ->join('categories', 'incidents.category_id', '=', 'categories.id')
            ->select('categories.category_type', DB::raw('COUNT(incidents.id) as incident_count'))
            ->groupBy('categories.category_type')
            ->get();

        return inertia('Dashboard', ['counts' => $counts]);
    }
}
