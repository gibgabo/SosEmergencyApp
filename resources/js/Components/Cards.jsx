import { Link } from "@inertiajs/react";
import React from "react";
import CategoryIcon from "./CategoryIcon";

export default function Cards({ category, numbers }) {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/incidents/${category}`} className="block">
                <CategoryIcon categoryType={category} />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {category}
                </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Total of {numbers} incidents.
            </p>
        </div>
    );
}
