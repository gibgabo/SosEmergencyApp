import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Head, useForm } from "@inertiajs/react";
import SearchBar from "@/Components/SearchBar";

export default function UserManagement({ auth, flash, users }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users.data);
    const { delete: destroy } = useForm();

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredUsers(Array.isArray(users.data) ? users.data : []);
        } else {
            const filtered = users.data.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users.data]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    useEffect(() => {
        if (flash?.message?.success) {
            toast.success(flash.message.success);
        }
        if (flash?.message?.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);

    const handleDelete = (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            destroy(`/users/delete/${userId}`, {
                onSuccess: () => {
                    const updatedUsers = filteredUsers.filter(
                        (user) => user.id !== userId
                    );
                    setFilteredUsers(updatedUsers);
                    toast.success("User deleted successfully.");
                },
                onError: () => {
                    toast.error(
                        "An error occurred while trying to delete the user."
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
                    Users
                </h2>
            }
        >
            <Head title="User Management" />
            <ToastContainer />

            {/* Search bar component */}
            <SearchBar onSearch={handleSearch} />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700"
                                >

                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>

                                    <td className="flex px-6 py-4 space-x-4">
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() =>
                                                handleDelete(user.id)
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
                                    className="px-6 py-4 text-center"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Authenticated>
    );
}
