import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Head, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2"; // Import SweetAlert

export default function CategoryIncidents({
    auth,
    incidents = [],
    category,
    flash,
    term = "",
}) {
    const incidentData = incidents.data || []; // Ensure data is always an array
    const [searchTerm, setSearchTerm] = useState(term);
    const [filteredIncidents, setFilteredIncidents] = useState(incidentData);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mode, setMode] = useState(""); // Tracks "show", "edit", or "delete" mode
    const { data, setData, put, delete: destroy, processing } = useForm({
        pin_number: "",
        client_name: "",
        incident_type: "",
        description: "",
        image: null,
    });

    // Filter incidents based on the search term
    useEffect(() => {
        if (!searchTerm) {
            setFilteredIncidents(incidentData);
        } else {
            const filtered = incidentData.filter((incident) =>
                ["pin_number", "client_name", "incident_type", "description"]
                    .some((field) =>
                        incident[field]
                            ?.toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    )
            );
            setFilteredIncidents(filtered);
        }
    }, [searchTerm, incidentData]);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        Inertia.get(
            route("incidents.category", { category: category.category_type }),
            { term: searchTerm },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            }
        );
    };

    // Open the drawer with the selected incident
    const openDrawer = (incident, actionMode) => {
        setSelectedIncident(incident);
        setMode(actionMode);
        setIsDrawerOpen(true);

        // If mode is edit, preload data
        if (actionMode === "edit") {
            setData({
                pin_number: incident.pin_number,
                client_name: incident.client_name,
                incident_type: incident.incident_type,
                description: incident.description,
                image: null, // Reset image
            });
        }
    };

    // Close the drawer
    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    // Handle update form submission
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("pin_number", data.pin_number);
        formData.append("client_name", data.client_name);
        formData.append("incident_type", data.incident_type);
        formData.append("description", data.description);
        if (data.image) formData.append("image", data.image); // Append image if present

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

    // Handle incident deletion with SweetAlert
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("incident.delete", { id: selectedIncident.id }), {
                    onSuccess: () => {
                        setFilteredIncidents(
                            filteredIncidents.filter(
                                (incident) =>
                                    incident.id !== selectedIncident.id
                            )
                        );
                        closeDrawer();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your incident has been deleted.",
                            icon: "success",
                        });
                    },
                    onError: (errors) => {
                        Swal.fire({
                            title: "Error!",
                            text: "An error occurred while deleting the incident.",
                            icon: "error",
                        });
                    },
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
            confirmButtonText: "Yes, mark it as done!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Logic to mark the incident as done
                Swal.fire({
                    title: "Done!",
                    text: "The incident has been marked as done.",
                    icon: "success",
                }).then(() => {
                    closeDrawer(); // Close drawer after marking as done
                });
            }
        });
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Incident Records in {category.category_type}
                </h2>
            }
        >
            <Head title={`Incidents Records in ${category.category_type}`} />
            <ToastContainer />

            {/* Search Input */}
            <div className="relative mb-4">
                <input
                    type="text"
                    id="floating_outlined_search"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <label
                    htmlFor="floating_outlined_search"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                    Search Incidents
                </label>
            </div>

            {/* Overlay for Drawer */}
            {isDrawerOpen && (
                <div className="fixed inset-0 z-30 bg-black opacity-50"></div>
            )}

            {/* Incident Table */}
            <div
                className={`relative overflow-x-auto shadow-md sm:rounded-lg ${
                    isDrawerOpen ? "opacity-50" : ""
                }`}
            >
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">PIN Number</th>
                            <th className="px-6 py-3">Client Name</th>
                            <th className="px-6 py-3">Incident Type</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIncidents.length > 0 ? (
                            filteredIncidents.map((incident, index) => (
                                <tr
                                    key={index}
                                    className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        {incident.pin_number}
                                    </td>
                                    <td className="px-6 py-4">
                                        {incident.client_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {incident.incident_type}
                                    </td>
                                    <td className="px-6 py-4">
                                        {incident.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {incident.image_path ? (
                                            <img
                                                src={
                                                    incident.image_path.startsWith(
                                                        "http"
                                                    )
                                                        ? incident.image_path
                                                        : `/storage/${incident.image_path}`
                                                }
                                                alt="Incident"
                                                className="object-cover w-16 h-16"
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td className="px-6 py-4 flex space-x-4">
                                        <button
                                            className="text-green-600 hover:underline"
                                            onClick={() =>
                                                openDrawer(incident, "show")
                                            }
                                        >
                                            Show
                                        </button>
                                        <button
                                            className="text-blue-600 hover:underline"
                                            onClick={() =>
                                                openDrawer(incident, "edit")
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() =>
                                                openDrawer(incident, "delete")
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="py-4 text-center text-gray-500"
                                >
                                    No incidents found in this category.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Pagination
                    links={incidents.links}
                    currentPage={incidents.current_page}
                    setCurrentPage={(page) => setData("page", page)}
                />
            </div>

            {/* Drawer Component */}
            {isDrawerOpen && selectedIncident && (
                <div
                    className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800"
                    tabIndex="-1"
                >
                    <button
                        onClick={closeDrawer}
                        className="absolute top-2.5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                    >
                        <span className="sr-only">Close</span>
                        <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>

                    {mode === "show" && (
                        <div className="p-4">
                            <p>
                                <strong>PIN Number:</strong>{" "}
                                {selectedIncident.pin_number}
                            </p>
                            <p>
                                <strong>Client Name:</strong>{" "}
                                {selectedIncident.client_name}
                            </p>
                            <p>
                                <strong>Incident Type:</strong>{" "}
                                {selectedIncident.incident_type}
                            </p>
                            <p>
                                <strong>Description:</strong>{" "}
                                {selectedIncident.description}
                            </p>

                            {/* Display the image */}
                            <p>
                                <strong>Image:</strong>
                            </p>
                            {selectedIncident.image_path ? (
                                <img
                                    src={
                                        selectedIncident.image_path.startsWith(
                                            "http"
                                        )
                                            ? selectedIncident.image_path
                                            : `/storage/${selectedIncident.image_path}`
                                    }
                                    alt="Incident Image"
                                    className="object-cover w-full h-auto mt-4 rounded-lg"
                                />
                            ) : (
                                <p>No Image Available</p>
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
                            <div className="p-4">
                                {/* Floating Label Input for Edit Form */}
                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        id="floating_pin_number"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        value={data.pin_number}
                                        onChange={(e) =>
                                            setData(
                                                "pin_number",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="floating_pin_number"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >
                                        PIN Number
                                    </label>
                                </div>
                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        id="floating_client_name"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        value={data.client_name}
                                        onChange={(e) =>
                                            setData(
                                                "client_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="floating_client_name"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >
                                        Client Name
                                    </label>
                                </div>
                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        id="floating_incident_type"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        value={data.incident_type}
                                        onChange={(e) =>
                                            setData(
                                                "incident_type",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="floating_incident_type"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >
                                        Incident Type
                                    </label>
                                </div>
                                <div className="relative mb-4">
                                    <textarea
                                        id="floating_description"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    ></textarea>
                                    <label
                                        htmlFor="floating_description"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                    >
                                        Description
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
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
