import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm ,usePage} from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js"; // Import the route helper from Ziggy
import Swal from 'sweetalert2';

export default function fire({ auth , categoryId }) {
    const { category_id } = usePage().props;

    console.log("Category ID:", category_id);
    const { data, setData, post, processing, errors } = useForm({
        pin_number: "",
        client_name: "",
        incident_type: "",
        description: "",
        image: null,
        category_id: category_id || "",
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("fire.incident.create"), {
            // Merge category_id into the data, falling back to the prop value if necessary
            data: {
                ...data,
                category_id: data.category_id || categoryId, // Ensure category_id is set
            },
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    title: "Fire Incident Reported!",
                    text: "Your fire incident report has been successfully submitted.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            },
            onError: (errors) => {
                console.error("Form submission error:", errors); // Log the error to the console
                Swal.fire({
                    title: "Error",
                    text: "There was an error submitting your fire incident report. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            },
        });
    };

    return (
        <div header={<h2>Add Fire Report</h2>}>
            <Head title="Add Incidents" />
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Specify the Fire Incident
                    </h2>
                    <form onSubmit={handleSubmit}>
                    <input type="hidden" name="category_id" value={data.category_id || categoryId}
                    onChange={(e)=> setData("category_id", e.target.value)} />
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
                                    <div className="text-sm text-red-600">
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
                                    <div className="text-sm text-red-600">
                                        {errors.client_name}
                                    </div>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="incident_type"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Sub Category
                                </label>
                                <select
                                    name="incident_type"
                                    id="incident_type"
                                    value={data.incident_type}
                                    onChange={(e) => setData("incident_type", e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="">-- Select Type of Fire --</option>
                                        <option value="Residential Fire">Residential Fire</option>
                                        <option value="Commercial Fire">Commercial Fire</option>
                                        <option value="Industrial Fire">Industrial Fire</option>
                                        <option value="Vehicle Fire">Vehicle Fire</option>
                                        <option value="Wildfire">Wildfire</option>
                                        <option value="Electrical Fire">Electrical Fire</option>
                                        <option value="Kitchen Fire">Kitchen Fire</option>
                                        <option value="Gas Explosion">Gas Explosion</option>
                                        <option value="Chemical Fire">Chemical Fire</option>
                                        <option value="Fireworks Incident">Fireworks Incident</option>
                                        <option value="Arson">Arson</option>
                                        <option value="Forest Fire">Forest Fire</option>
                                        <option value="Trash Fire">Trash Fire</option>
                                        <option value="Fire in Public Space">Fire in Public Space</option>
                                        <option value="Fire with Casualties">Fire with Casualties</option>
                                        <option value="Fire with Injuries">Fire with Injuries</option>
                                        <option value="Hazardous Materials Fire">Hazardous Materials Fire</option>
                                            </select>
                                {errors.incident_type && (
                                    <div className="text-sm text-red-600">
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
                                    onChange={(e) => setData("description", e.target.value)}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Your description here"
                                    required
                                ></textarea>
                                {errors.description && (
                                    <div className="text-sm text-red-600">
                                        {errors.description}
                                    </div>
                                )}
                            </div>

                            <div className="px-3 py-10 sm:col-span-2">
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
                                    <div className="text-sm text-red-600">
                                        {errors.image}
                                    </div>
                                )}
                            </div>



                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-6 py-3 mb-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            disabled={processing}
                        >
                            Add Incident
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

