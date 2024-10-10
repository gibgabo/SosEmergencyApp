import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
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
            preserveState: true,
            preserveScroll: true,
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
                image: null,
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
        if (data.image) formData.append("image", data.image);

        put(route("incident.update", { id: selectedIncident.id }), {
            data: formData,
            preserveState: true,
            onSuccess: () => {
                closeDrawer();
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Incident updated successfully!",
                });
            },
            onError: (errors) => {
                let errorMessage = 'An error occurred while updating the incident.';
                if (errors.response && errors.response.data.errors) {
                    errorMessage = Object.values(errors.response.data.errors).join(', ');
                }
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: errorMessage,
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Retry'
                });
            }
        });
    };

    // Handle delete incident with SweetAlert
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("incident.delete", { id: selectedIncident.id }), {
                    onSuccess: () => {
                        setFilteredIncidents(filteredIncidents.filter((incident) => incident.id !== selectedIncident.id));
                        closeDrawer();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your incident has been deleted.",
                            icon: "success"
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error!",
                            text: "An error occurred while deleting the incident.",
                            icon: "error"
                        });
                    }
                });
            }
        });
    };

    // Handle "Mark as Done" functionality with SweetAlert
    const markAsDone = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to mark this incident as done?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, mark it as done!"
        }).then((result) => {
            if (result.isConfirmed) {
                closeDrawer();
                Swal.fire({
                    title: "Done!",
                    text: "The incident has been marked as done.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Incidents</h2>}
        >
            <Head title="Incidents" />

            {/* Search bar component */}
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

            {/* Overlay */}
            {isDrawerOpen && (
                <div className="fixed inset-0 z-30 bg-black opacity-50"></div>
            )}

            <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${isDrawerOpen ? 'opacity-50' : ''}`}>
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
                    additionalParams={{ term: searchTerm }}
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

                    {mode === "show" && (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <p><strong>PIN Number:</strong> {selectedIncident.pin_number}</p>
                            <p><strong>Client Name:</strong> {selectedIncident.client_name}</p>
                            <p><strong>Incident Type:</strong> {selectedIncident.incident_type}</p>
                            <p><strong>Description:</strong> {selectedIncident.description}</p>
                            {selectedIncident.image_path && (
                                <img
                                    src={`${window.location.origin}/storage/incident_images/${selectedIncident.image_path}`}
                                    alt="Incident"
                                    className="h-auto max-w-full rounded-lg mt-4"
                                />
                            )}
                            <button
                                onClick={markAsDone}
                                className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Mark as Done
                            </button>
                        </div>
                    )}

                    {mode === "edit" && (
                        <form onSubmit={handleUpdate}>
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                {/* Floating label inputs */}
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        id="floating_outlined_pin" 
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                        value={data.pin_number}
                                        onChange={(e) => setData("pin_number", e.target.value)}
                                        required 
                                    />
                                    <label 
                                        htmlFor="floating_outlined_pin" 
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >
                                        PIN Number
                                    </label>
                                </div>

                                <div className="relative mt-4">
                                    <input 
                                        type="text" 
                                        id="floating_outlined_client" 
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                        value={data.client_name}
                                        onChange={(e) => setData("client_name", e.target.value)}
                                        required 
                                    />
                                    <label 
                                        htmlFor="floating_outlined_client" 
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >
                                        Client Name
                                    </label>
                                </div>

                                <div className="relative mt-4">
                                    <input 
                                        type="text" 
                                        id="floating_outlined_type" 
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                        value={data.incident_type}
                                        onChange={(e) => setData("incident_type", e.target.value)}
                                        required 
                                    />
                                    <label 
                                        htmlFor="floating_outlined_type" 
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >
                                        Incident Type
                                    </label>
                                </div>

                                <div className="relative mt-4">
                                    <textarea 
                                        id="floating_outlined_description" 
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        required
                                    ></textarea>
                                    <label 
                                        htmlFor="floating_outlined_description" 
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >
                                        Description
                                    </label>
                                </div>

                                <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Image (optional):</label>
                                <input
                                    type="file"
                                    name="image"
                                    aria-label="Incident Image"
                                    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                />
                                {selectedIncident.image_path && (
                                    <img
                                        src={`${window.location.origin}/storage/incident_images/${selectedIncident.image_path}`}
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
                    )}

                    {mode === "delete" && (
                        <div>
                            <p>Are you sure you want to delete this incident?</p>
                            <button
                                onClick={handleDelete}
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    )}
                </div>
            )}
        </Authenticated>
    );
}
