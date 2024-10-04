import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Show({ auth, incident }) {
    return (
        <Authenticated user={auth.user} header={<h2>Show Incidents</h2>}>
            <Head title="Show Incident" />
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    {/* Displaying incident details in disabled input fields */}
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        PIN Number:
                    </label>
                    <input
                        type="text"
                        id="pin-number"
                        aria-label="PIN Number"
                        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={incident.pin_number}
                        disabled
                    />
                </div>

                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Reporter Name:
                    </label>
                    <input
                        type="text"
                        id="reporter-name"
                        aria-label="Name of the Reporter"
                        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={incident.client_name}
                        disabled
                    />
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Incident Type:
                    </label>
                    <input
                        type="text"
                        id="incident-type"
                        aria-label="Incident Type"
                        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={incident.incident_type}
                        disabled
                    />
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description:
                    </label>
                    <input
                        type="text"
                        id="description"
                        aria-label="Description"
                        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={incident.description}
                        disabled
                    />
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Created At:
                    </label>
                    <input
                        type="text"
                        id="created-at"
                        aria-label="Created At"
                        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={new Date(incident.created_at).toLocaleString()}
                        disabled
                    />
                </div>
                <div className= "p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Image:
                    </label>
                    {incident.image_path ? (
                        <img
                            src={`${window.location.origin}/storage/${incident.image_path}`}
                            alt="Incident"
                            className="h-auto max-w-full rounded-lg"
                        />
                    ) : (
                        "No Image"
                    )}
                </div>
            </div>
        </Authenticated>
    );
}
