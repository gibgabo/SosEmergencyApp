import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js"; // Import the route helper from Ziggy

export default function Add({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        pin_number: "",
        client_name: "",
        incident_type: "",
        description: "",
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("incident.create")); // Use the route helper correctly
    };

    return (
        <Authenticated user={auth.user} header={<h2>Add Incident Report</h2>}>
            <Head title="Add Incidents" />
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Add a new incident
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="pin_number"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    PIN Number
                                </label>
                                <input
                                    type="text"
                                    name="pin_number"
                                    id="pin_number"
                                    value={data.pin_number}
                                    onChange={(e) =>
                                        setData("pin_number", e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type PIN number"
                                    required
                                />
                                {errors.pin_number && (
                                    <div className="text-red-600 text-sm">
                                        {errors.pin_number}
                                    </div>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="client_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Client Name
                                </label>
                                <input
                                    type="text"
                                    name="client_name"
                                    id="client_name"
                                    value={data.client_name}
                                    onChange={(e) =>
                                        setData("client_name", e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type client name"
                                    required
                                />
                                {errors.client_name && (
                                    <div className="text-red-600 text-sm">
                                        {errors.client_name}
                                    </div>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="incident_type"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Incident Type
                                </label>
                                <input
                                    type="text"
                                    name="incident_type"
                                    id="incident_type"
                                    value={data.incident_type}
                                    onChange={(e) =>
                                        setData("incident_type", e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type incident type"
                                    required
                                />
                                {errors.incident_type && (
                                    <div className="text-red-600 text-sm">
                                        {errors.incident_type}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="8"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Your description here"
                                    required
                                ></textarea>
                                {errors.description && (
                                    <div className="text-red-600 text-sm">
                                        {errors.description}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="image"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Image (optional)
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors.image && (
                                    <div className="text-red-600 text-sm">
                                        {errors.image}
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            disabled={processing}
                        >
                            Add Incident
                        </button>
                    </form>
                </div>
            </section>
        </Authenticated>
    );
}
