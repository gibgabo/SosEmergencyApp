import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Show({ auth, incident }) {
    return (
        <Authenticated user={auth.user} header={<h2>Show Incidents</h2>}>
            <Head title="Show Incident" />

            {/* Displaying incident details in disabled input fields */}
            <input
                type="text"
                id="pin-number"
                aria-label="PIN Number"
                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={incident.pin_number}
                disabled
            />

            <input
                type="text"
                id="reporter-name"
                aria-label="Name of the Reporter"
                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={incident.client_name}
                disabled
            />

            <input
                type="text"
                id="incident-type"
                aria-label="Incident Type"
                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={incident.incident_type}
                disabled
            />

            <input
                type="text"
                id="description"
                aria-label="Description"
                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={incident.description}
                disabled
            />
                <img
                    src={'../../storage/' + incident.image}
                    alt="Incident"
                    className='h-auto max-w-full'
                />

        </Authenticated>
    );
}
