import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function Show({ auth, incident }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <Authenticated user={auth.user} header={<h2>Show Incidents</h2>}>
            <Head title="Show Incident" />

            {/* Back to Dashboard Button */}
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg mb-4">
                <Link href={route("incidents.index")} className="text-blue-600 hover:underline">
                    ← Back to incidents
                </Link>

                {/* Toggle Drawer Button */}
                <div className="text-center mt-4">
                    <button
                        onClick={toggleDrawer}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                    >
                        Show Incident Details
                    </button>
                </div>

                {/* Drawer Component */}
                {isDrawerOpen && (
                    <div
                        id="drawer-right-example"
                        className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white w-80 dark:bg-gray-800"
                        aria-labelledby="drawer-right-label"
                    >
                        <h5
                            id="drawer-right-label"
                            className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
                        >
                            <svg
                                className="w-4 h-4 me-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            Incident Details
                        </h5>

                        <button
                            type="button"
                            onClick={toggleDrawer}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>

                        {/* Incident Details */}
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                PIN Number:
                            </label>
                            <input
                                type="text"
                                id="pin-number"
                                aria-label="PIN Number"
                                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={incident.pin_number}
                                disabled
                            />

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Reporter Name:
                            </label>
                            <input
                                type="text"
                                id="reporter-name"
                                aria-label="Reporter Name"
                                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={incident.client_name}
                                disabled
                            />

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Incident Type:
                            </label>
                            <input
                                type="text"
                                id="incident-type"
                                aria-label="Incident Type"
                                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={incident.incident_type}
                                disabled
                            />

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Created At:
                            </label>
                            <input
                                type="text"
                                id="created-at"
                                aria-label="Created At"
                                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={new Date(incident.created_at).toLocaleString()}
                                disabled
                            />

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Description:
                            </label>
                            <input
                                type="text"
                                id="description"
                                aria-label="Description"
                                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={incident.description}
                                disabled
                            />

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Image:
                            </label>
                            {incident.image_path ? (
                                <img
                                    src={`${window.location.origin}/storage/incident_images/${incident.image_path}`}
                                    alt="Incident"
                                    className="h-auto max-w-full rounded-lg"
                                />
                            ) : (
                                "No Image"
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Authenticated>
    );
}
