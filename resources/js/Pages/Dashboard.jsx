import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Cards from "@/Components/Cards"; // Import the Cards component
import Drawer from "@/Components/Drawer";

export default function Dashboard({ counts }) {
    // Check if 'counts' is defined and is an array
    const incidentCounts = counts || []; // Default to an empty array if undefined

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Map over incidentCounts if available */}
                        {incidentCounts.length > 0 ? (
                            incidentCounts.map((count, index) => (
                                <Cards
                                    key={index}
                                    numbers={count.incident_count}
                                    category={count.category_type}

                                />
                            ))
                        ) : (
                            <p>No incidents to display.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
