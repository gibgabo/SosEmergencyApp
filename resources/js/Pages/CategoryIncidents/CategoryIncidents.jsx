import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Head, Link, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import SearchBar from "@/Components/SearchBar";
import { Inertia } from "@inertiajs/inertia";

export default function CategoryIncidents({
    auth,
    incidents = [], // Ensure it's always an array
    category,
    flash,
    term = "",
}) {
    const incidentData = incidents.data; // Extract the data array

    const {
        data,
        setData,
        delete: destroy,
    } = useForm({
        pin_number: "",
        client_name: "",
        incident_type: "",
        description: "",
        image: null,
        category_id: "",
    });

    const [searchTerm, setSearchTerm] = useState(term); // Initialize search input with the 'term' prop
    const [filteredIncidents, setFilteredIncidents] = useState(incidentData);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredIncidents(incidentData);
        } else {
            const filtered = incidentData.filter((incident) => {
                return (
                    incident.pin_number
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    incident.client_name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    incident.incident_type
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    incident.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            });
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

    useEffect(() => {
        if (flash.message?.success) {
            toast.success(flash.message.success);
        }
        if (flash.message?.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);

    const handleDelete = (incidentId) => {
        if (confirm("Are you sure you want to delete this report?")) {
            destroy(`/incidents/delete/${incidentId}`, {
                onSuccess: () => {
                    setFilteredIncidents(
                        filteredIncidents.filter(
                            (incident) => incident.id !== incidentId
                        )
                    );
                },
                onError: () => {
                    alert(
                        "An error occurred while trying to delete the incident."
                    );
                },
            });
        }
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

            <div className="mb-4">
                <Link
                    href={route("dashboard")}
                    className="text-blue-600 hover:underline"
                >
                    ← Back to Dashboard
                </Link>
            </div>

            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                PIN Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Client Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Incident
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIncidents && filteredIncidents.length > 0 ? (
                            filteredIncidents.map((incident, index) => (
                                <tr
                                    key={index}
                                    className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {incident.pin_number}
                                    </th>
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
                                                    "storage/" +
                                                    incident.image_path
                                                }
                                                alt="Incident"
                                                className="object-cover w-16 h-16"
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td className="flex px-6 py-4 space-x-4">
                                        <Link
                                            href={"show/" + incident.id}
                                            className="text-green-600 hover:underline"
                                        >
                                            Show
                                        </Link>
                                        <Link
                                            href={
                                                "edit/" + incident.id
                                            }
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() =>
                                                handleDelete(incident.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-4 text-center">
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
        </Authenticated>
    );
}
