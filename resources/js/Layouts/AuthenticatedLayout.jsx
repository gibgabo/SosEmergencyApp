import NavLink from "@/Components/NavLink";
import { usePage } from "@inertiajs/react";
import React, { useState } from "react";

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebarOnClickOutside = (e) => {
        if (isSidebarOpen && !e.target.closest(".sidebar")) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="container-fluid" onClick={closeSidebarOnClickOutside}>
            {/* Button to toggle sidebar on mobile */}
            <button
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg ms-3 lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/* Sidebar */}
            <div
                className={`fixed lg:left-0 top-0 h-full bg-white w-64 transition-transform transform lg:transform-none z-40 sidebar ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-4">
                    <h5 className="pb-2 mb-4 border-b">Menu</h5>
                    <ul className="space-y-2">
                        <li className="nav-item">
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="block px-4 py-2 rounded hover:bg-gray-200"
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                href={route("incidents.index")}
                                active={route().current("incidents.index")}
                                className="block px-4 py-2 rounded hover:bg-gray-200"
                            >
                                Incidents
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                href={route("categories.page")}
                                active={route().current("categories.page")}
                                className="block px-4 py-2 rounded hover:bg-gray-200"
                            >
                                Category
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="block px-4 py-2 rounded hover:bg-gray-200">
                                User Management
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main content wrapper */}
            <div
                className={`flex-1 transition-all duration-300 ${
                    isSidebarOpen ? "ml-64" : "ml-0"
                } lg:ml-64`}
            >
                {/* Header */}
                <header className="sticky top-0 z-10 p-4 bg-white shadow">
                    <div className="flex items-center justify-between">
                        {/* Responsive header text */}
                        <div className="text-base sm:text-lg lg:text-xl">
                            {header}
                        </div>

                        {/* User Profile Links */}
                        <div className="flex items-center space-x-4">
                            <span className="text-sm lg:text-base me-3">
                                Welcome - {user.name}
                            </span>
                            <NavLink
                                href={route("profile.edit")}
                                className="text-xs btn btn-outline-primary sm:text-sm lg:text-base me-2"
                            >
                                Profile
                            </NavLink>
                            <NavLink
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-xs btn btn-outline-danger sm:text-sm lg:text-base"
                            >
                                Log Out
                            </NavLink>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="min-h-screen p-3 bg-gray-100">{children}</main>
            </div>
        </div>
    );
}
