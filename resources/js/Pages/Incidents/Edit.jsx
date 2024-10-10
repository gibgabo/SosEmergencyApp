import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia'; // Correct import
import Pagination from "@/Components/Pagination";
import SearchBar from "@/Components/SearchBar";
import Swal from "sweetalert2"; // Import SweetAlert

export default function Index({ auth, incidents = [], term = "" }) {
    const [searchTerm, setSearchTerm] = useState(term);
    const [filteredIncidents, setFilteredIncidents] = useState(incidents.data || []);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mode, setMode] = useState(""); // Tracks if it's "show", "edit", or "delete" mode
    const { data, setData, put, delete: destroy, processing } = useForm({
        pin_number: "",
        client_name: "",
        incident_type: "",
        description: "",
        image: null,
    });

    // Handle search input and filter incidents
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        Inertia.visit(route('incidents.index', { term: searchTerm }), {
            preserveState: true, // This ensures state like open modals, etc., is preserved
            preserveScroll: true, // This ensures the scroll position is preserved
        });
    };

    // Open the drawer with the selected incident and mode (show, edit, delete)
    const openDrawer = (incident, actionMode) => {
        setSelectedIncident(incident);
        setMode(actionMode);
        setIsDrawerOpen(true);

        // Set form data if mode is edit
        if (actionMode === "edit") {
            setData({
                pin_number: incident.pin_number,
                client_name: incident.client_name,
                incident_type: incident.incident_type,
                description: incident.description,
                image: null, // Reset image in case the user uploads a new one
            });
        }
    };

    // Close the drawer
    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    // Handle the update form submission
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("pin_number", data.pin_number);
        formData.append("client_name", data.client_name);
        formData.append("incident_type", data.incident_type);
        formData.append("description", data.description);
        if (data.image) formData.append("image", data.image); // Append image only if it's uploaded

        put(route("incident.update", { id: selectedIncident.id }), {
            preserveState: true,
            data: formData,
            onSuccess: () => {
                closeDrawer();
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Incident updated successfully!",
                });
            },
        });
    };

    // Handle delete incident
    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this incident?")) {
            destroy(route("incident.delete", { id: selectedIncident.id }), {
                onSuccess: () => {
                    setFilteredIncidents(filteredIncidents.filter((incident) => incident.id !== selectedIncident.id));
                    closeDrawer();
                },
            });
        }
    };

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Incidents</h2>}
        >
            <Head title="Incidents" />

            {/* Search bar component */}
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">PIN Number</th>
                            <th scope="col" className="px-6 py-3">Client Name</th>
                            <th scope="col" className="px-6 py-3">Incident Type</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIncidents.map((incident, index) => (
                            <tr key={index} className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {incident.pin_number}
                                </th>
                                <td className="px-6 py-4">{incident.client_name}</td>
                                <td className="px-6 py-4">{incident.incident_type}</td>
                                <td className="px-6 py-4">{incident.description}</td>
                                <td className="px-6 py-4 flex space-x-4">
                                    <button
                                        className="text-blue-600 hover:underline"
                                        onClick={() => openDrawer(incident, "show")}
                                    >
                                        Show
                                    </button>
                                    <button
                                        className="text-green-600 hover:underline"
                                        onClick={() => openDrawer(incident, "edit")}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-600 hover:underline"
                                        onClick={() => openDrawer(incident, "delete")}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    links={incidents.links}
                    currentPage={incidents.current_page}
                    additionalParams={{ term: searchTerm }} // Pass search term to pagination
                />
            </div>

            {/* Drawer Component */}
            {isDrawerOpen && selectedIncident && (
                <div id="drawer-right-example" className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white w-80 dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-right-label">
                    <h5 id="drawer-right-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
                        {mode === "show" ? "Incident Details" : mode === "edit" ? "Edit Incident" : "Delete Incident"}
                    </h5>

                    <button
                        type="button"
                        onClick={closeDrawer}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>

                    {/* Incident Details or Edit Form */}
                    {mode === "show" ? (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <p><strong>PIN Number:</strong> {selectedIncident.pin_number}</p>
                            <p><strong>Client Name:</strong> {selectedIncident.client_name}</p>
                            <p><strong>Incident Type:</strong> {selectedIncident.incident_type}</p>
                            <p><strong>Description:</strong> {selectedIncident.description}</p>
                            {selectedIncident.image_path && (
                                <img
                                    src={`${window.location.origin}/storage/${selectedIncident.image_path}`}
                                    alt="Incident"
                                    className="h-auto max-w-full rounded-lg mt-4"
                                />
                            )}
                        </div>
                    ) : mode === "edit" ? (
                        <form onSubmit={handleUpdate}>
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PIN Number:</label>
                                <input
                                    type="text"
                                    name="pin_number"
                                    aria-label="PIN Number"
                                    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={data.pin_number}
                                    onChange={(e) => setData("pin_number", e.target.value)}
                                    required
                                />

                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reporter Name:</label>
                                <input
                                    type="text"
                                    name="client_name"
                                    aria-label="Reporter Name"
                                    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={data.client_name}
                                    onChange={(e) => setData("client_name", e.target.value)}
                                    required
                                />

                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Incident Type:</label>
                                <input
                                    type="text"
                                    name="incident_type"
                                    aria-label="Incident Type"
                                    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={data.incident_type}
                                    onChange={(e) => setData("incident_type", e.target.value)}
                                    required
                                />

                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                                <textarea
                                    name="description"
                                    aria-label="Description"
                                    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    required
                                ></textarea>

                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image (optional):</label>
                                <input
                                    type="file"
                                    name="image"
                                    aria-label="Incident Image"
                                    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                />
                                {selectedIncident.image_path && (
                                    <img
                                        src={`${window.location.origin}/storage/${selectedIncident.image_path}`}
                                        alt="Incident"
                                        className="h-auto max-w-full rounded-lg mt-4"
                                    />
                                )}

                                <button
                                    type="submit"
                                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                                    disabled={processing}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <p>Are you sure you want to delete this incident?</p>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 mt-4"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}
        </Authenticated>
    );
}
