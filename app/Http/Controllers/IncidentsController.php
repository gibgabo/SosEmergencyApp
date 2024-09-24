<?php

namespace App\Http\Controllers;

use App\Models\Incidents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class IncidentsController extends Controller
{
    public function index(Request $request)
    {

        $incidents = Incidents::when($request->term, function ($query, $term) {
            $query->where('pin_number', 'LIKE', '%' . $term . '%')
                ->orWhere('client_name', 'LIKE', '%' . $term . '%')
                ->orWhere('incident_type', 'LIKE', '%' . $term . '%')
                ->orWhere('description', 'LIKE', '%' . $term . '%');
        })
            ->latest()
            ->paginate(5);

        return inertia('Incidents/Index', ['incidents' => $incidents]);
    }
    public function create(Request $request)
    {
        // Validate the request inputs
        $validatedData = $request->validate([
            'pin_number'    => 'required|string|max:20',
            'client_name'   => 'required|string|max:255',
            'incident_type' => 'required|string|max:255',
            'description'   => 'required|string',
            'image'         => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('incident_images', 'public');
        }

        // Create a new Incident record
        $incident = new Incidents();
        $incident->pin_number    = $validatedData['pin_number'];
        $incident->client_name   = $validatedData['client_name'];
        $incident->incident_type = $validatedData['incident_type'];
        $incident->description   = $validatedData['description'];
        $incident->image_path    = $imagePath; // Store the image path if uploaded
        $incident->save(); // Save the incident to the database

        // Return a response, maybe a redirect or a success message
        return redirect('dashboard')->with('success', 'Incident reported successfully!');
    }

    public function edit($id)
    {
        $incident = Incidents::findOrFail($id); // Find the incident or fail
        return inertia('Incidents/Edit', ['incident' => $incident]);  // Adjust view as needed
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

        return redirect()->route('incidents.index')->with('success', 'Incident updated successfully!');
    }
    public function show($id)
    {
        $incident = Incidents::where('id', $id)->first();
        return inertia('Incidents/Show', ['incident' => $incident]);
    }

    public function delete($id)
    {
        $item = Incidents::where('id', $id)->first();
        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }
        $item->delete();

        return redirect('incidents')->with('success', 'Incident Report has been deleted.');
    }
}
