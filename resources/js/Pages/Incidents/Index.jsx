import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import SearchBar from "@/Components/SearchBar";

export default function Index({ auth, incidents }) {
    const { data, setData, delete: destroy } = useForm({
        pin_number: "",
        client_name: "",
        incident_type: "",
        description: "",
        image: null,

    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredIncidents, setFilteredIncidents] = useState(incidents.data);

    // Handle search filtering
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredIncidents(incidents.data); // Reset to original incidents when no search term
        } else {
            const filtered = incidents.data.filter((incident) =>
                incident.pin_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                incident.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                incident.incident_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                incident.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredIncidents(filtered);
        }
    }, [searchTerm, incidents.data]);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };
    const handleDelete = (incidentId) => {
    if (confirm('Are you sure you want to delete this report?')) {
        destroy(`/incidents/delete/${incidentId}`, {
            onSuccess: () => {
                setFilteredIncidents(filteredIncidents.filter(incident => incident.id !== incidentId));
            },
            onError: () => {
                alert('An error occurred while trying to delete the incident.');
            }
        });
    }
};


    return (
        <Authenticated user={auth.user} header={<h2>Incidents</h2>}>
            <Head title="Incidents" />

            {/* Search bar component */}
            <SearchBar onSearch={handleSearch} />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">PIN Number</th>
                            <th scope="col" className="px-6 py-3">Client Name</th>
                            <th scope="col" className="px-6 py-3">Incident Type</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Image</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIncidents.map((incident, index) => (
                            <tr key={index} className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {incident.pin_number}
                                </th>
                                <td className="px-6 py-4">{incident.client_name}</td>
                                <td className="px-6 py-4">{incident.incident_type}</td>
                                <td className="px-6 py-4">{incident.description}</td>
                                <td className="px-6 py-4">
                                    {incident.image_path ? (
                                        <img src={"storage/" + incident.image_path} alt="Incident" className="object-cover w-16 h-16" />
                                    ) : "No Image"}
                                </td>
                                <td className="flex px-6 py-4 space-x-4">
                                <Link href={"incidents/show/" + incident.id} className="text-green-600 hover:underline">Show</Link>
                                <Link href={"incidents/edit/" + incident.id} className="text-blue-600 hover:underline">Edit</Link>
                                    <button className="text-red-600 hover:underline" onClick={() => handleDelete(incident.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={incidents.links} currentPage={incidents.current_page} setCurrentPage={(page) => setData("page", page)} />
            </div>
        </Authenticated>
    );
}
