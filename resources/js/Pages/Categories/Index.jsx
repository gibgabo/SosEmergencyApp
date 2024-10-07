import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Head, useForm } from "@inertiajs/react";
import SearchBar from "@/Components/SearchBar";

export default function Category({ auth, flash, categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Use Inertia's useForm hook to manage form data
    const {
        data,
        setData,
        post,
        processing,
        errors,
        delete: destroy,
    } = useForm({
        category_type: "",
        description: "",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCategories, setFilteredCategories] = useState(categories);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredCategories(categories);
        } else {
            const filtered = categories.filter(
                (category) =>
                    category.category_type
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    category.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
            setFilteredCategories(filtered);
        }
    }, [searchTerm, categories]);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    // Flash message state
    useEffect(() => {
        if (flash?.message?.success) {
            toast.success(flash.message.success);
        }
        if (flash?.message?.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);
    const handleDelete = (categoryID) => {
        if (confirm("Are you sure you want to delete this report?")) {
            destroy(`/categories/delete/${categoryID}`, {
                onSuccess: () => {
                    setFilteredCategories(
                        filteredCategories.filter(
                            (incident) => category.id !== categoryID
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

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("categories.create"), {
            onSuccess: () => {
                setIsModalOpen(false);
                setData({ category_type: "", description: "" });
            },
        });
    };

    return (
        <Authenticated user={auth.user} header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Categories</h2>}>
            <Head title="Categories" />
            <ToastContainer />
                <div className="flex items-center justify-between mb-2">
                    {/* Search bar component */}
                    <SearchBar onSearch={handleSearch} />

                    {/* Button to trigger modal */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md"
                    >
                        Add Category
                    </button>
                </div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category) => (
                            <tr
                                key={category.id}
                                className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700"
                            >

                                <td className="px-6 py-4">
                                    {category.category_type}
                                </td>
                                <td className="px-6 py-4">
                                    {category.description}
                                </td>
                                <td className="flex px-6 py-4 space-x-4">
                                    <button
                                        className="text-red-600 hover:underline"
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 bg-white rounded-md w-96">
                        <h3 className="mb-4 text-xl font-semibold">
                            Add New Category
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="categoryType"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Category Type
                                </label>
                                <input
                                    id="categoryType"
                                    type="text"
                                    value={data.category_type}
                                    onChange={(e) =>
                                        setData("category_type", e.target.value)
                                    }
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                                {errors.category_type && (
                                    <span className="text-sm text-red-600">
                                        {errors.category_type}
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                                {errors.description && (
                                    <span className="text-sm text-red-600">
                                        {errors.description}
                                    </span>
                                )}
                            </div>
                            <div>

                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-500 rounded-md"
                                    disabled={processing}
                                >
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </Authenticated>
    );
}
