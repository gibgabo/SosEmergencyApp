import NavLink from "@/Components/NavLink";
import { usePage } from "@inertiajs/react";

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="container-fluid">
            {/* Sidebar */}
            <div className="w-64 bg-gray-100 h-full fixed">
                <div className="p-4">
                    <h5 className="border-b pb-2 mb-4">Menu</h5>
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
                    </ul>
                </div>
            </div>

            {/* Main content wrapper (with padding for the sidebar) */}
            <div className="flex-1 ml-64">
                {/* Header */}
                <header className="bg-white shadow p-4 sticky top-0 z-10">
                    <div className="flex justify-between items-center">
                        <div>{header}</div>
                        <div className="d-flex items-center space-x-4">
                            <span className="me-3">{user.name}</span>
                            <NavLink
                                href={route("profile.edit")}
                                className="btn btn-outline-primary me-2"
                            >
                                Profile
                            </NavLink>
                            <NavLink
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="btn btn-outline-danger"
                            >
                                Log Out
                            </NavLink>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="p-3 bg-gray-100 min-h-screen">{children}</main>
            </div>
        </div>
    );
}
