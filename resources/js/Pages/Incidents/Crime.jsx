import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js"; // Import the route helper from Ziggy
import Swal from 'sweetalert2';

export default function Crime({ categoryId }) {
    const { category_id } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        pin_number: "",
        client_name: "",
        incident_type: "",
        description: "",
        image: null,
        category_id: category_id || "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('pin_number', data.pin_number);
        formData.append('client_name', data.client_name);
        formData.append('incident_type', data.incident_type);
        formData.append('description', data.description);
        if (data.image) {
            formData.append('image', data.image);
        }

        try {
            // Send the post request using Inertia's `post` method
            await post(route("crime.incident.create"), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Success SweetAlert
            Swal.fire({
                title: "Crime Incident Reported!",
                text: "Your crime incident report has been successfully submitted.",
                icon: "success",
                confirmButtonText: "OK"
            });
        } catch (error) {
            // Error SweetAlert
            Swal.fire({
                title: "Error",
                text: "There was an error submitting your crime incident report. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <div>
            <Head title="Add Crime Incident" />
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Specify the Crime Incident
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* Hidden input for category ID */}
                        <input
                            type="hidden"
                            name="category_id"
                            value={data.category_id || categoryId}
                            onChange={(e) => setData("category_id", e.target.value)}
                        />
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            {/* PIN Number */}
                            <div className="relative sm:col-span-2">
                                <input
                                    type="text"
                                    name="pin_number"
                                    id="floating_pin_number"
                                    value={data.pin_number}
                                    onChange={(e) => setData("pin_number", e.target.value)}
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_pin_number"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-0">
                                    PIN Number
                                </label>
                                {errors.pin_number && <div className="text-sm text-red-600">{errors.pin_number}</div>}
                            </div>

                            {/* Client Name */}
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    name="client_name"
                                    id="floating_client_name"
                                    value={data.client_name}
                                    onChange={(e) => setData("client_name", e.target.value)}
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_client_name"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-0">
                                    Client Name
                                </label>
                                {errors.client_name && <div className="text-sm text-red-600">{errors.client_name}</div>}
                            </div>

                            {/* Incident Type */}
                            <div className="relative w-full">
                                <select
                                    name="incident_type"
                                    id="floating_incident_type"
                                    value={data.incident_type}
                                    onChange={(e) => setData("incident_type", e.target.value)}
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    required
                                >
                                    <option value="">-- Select Type of Crime --</option>
                                    <option value="Theft">Theft</option>
                                    <option value="Burglary">Burglary</option>
                                    <option value="Robbery">Robbery</option>
                                    <option value="Assault">Assault</option>
                                    <option value="Fraud">Fraud</option>
                                    <option value="Vandalism">Vandalism</option>
                                    <option value="Homicide">Homicide</option>
                                    <option value="Domestic Violence">Domestic Violence</option>
                                    <option value="Drug Offenses">Drug Offenses</option>
                                    <option value="Cybercrime">Cybercrime</option>
                                    <option value="Sexual Assault">Sexual Assault</option>
                                    <option value="Stalking">Stalking</option>
                                    <option value="Embezzlement">Embezzlement</option>
                                    <option value="Human Trafficking">Human Trafficking</option>
                                    <option value="Arson">Arson</option>
                                    <option value="Terrorism">Terrorism</option>
                                    <option value="Identity Theft">Identity Theft</option>
                                    <option value="Public Disorder">Public Disorder</option>
                                    <option value="Weapons Offenses">Weapons Offenses</option>
                                </select>
                                <label
                                    htmlFor="floating_incident_type"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-0">
                                    Sub Category
                                </label>
                                {errors.incident_type && <div className="text-sm text-red-600">{errors.incident_type}</div>}
                            </div>

                            {/* Description */}
                            <div className="relative sm:col-span-2">
                                <textarea
                                    id="floating_description"
                                    name="description"
                                    rows="8"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=""
                                    required
                                ></textarea>
                                <label
                                    htmlFor="floating_description"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-0">
                                    Your description here
                                </label>
                                {errors.description && <div className="text-sm text-red-600">{errors.description}</div>}
                            </div>

                            {/* Image Upload */}
                            <div className="relative px-3 py-10 sm:col-span-2">
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                />
                                <label
                                    htmlFor="image"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform top-2 z-10 bg-white dark:bg-gray-900 px-2">
                                    Upload Image (optional)
                                </label>
                                {errors.image && <div className="text-sm text-red-600">{errors.image}</div>}
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
