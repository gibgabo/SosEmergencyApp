import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function Index({ auth, incidents }) {
    const { data, setData } = useForm({
        page: incidents.current_page,
    });
    return (
        <Authenticated user={auth.user} header={<h2>Incidents</h2>}>
            <Head title="Incidents" />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                PIN Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Client Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Incident Type
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
                        {incidents.data.map((incident) => (
                            <tr
                                key={incident.id}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
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
                                                "storage/" + incident.image_path
                                            }
                                            alt="Incident"
                                            className="w-16 h-16 object-cover"
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td className="px-6 py-4 flex space-x-4">
                                    <Link
                                        href={"incidents/edit/" + incident.id}
                                        className="text-blue-600 hover:underline mr-4"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDelete(incident.id)
                                        }
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    links={incidents.links} // Pagination links from server
                    currentPage={incidents.current_page} // Current active page
                    setCurrentPage={(page) => setData("page", page)} // Function to update page
                />
            </div>
        </Authenticated>
    );
}
