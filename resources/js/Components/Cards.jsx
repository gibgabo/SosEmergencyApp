import { Link } from "@inertiajs/react";
import React from "react";
import CategoryIcon from "./CategoryIcon";

export default function Cards({ category, numbers }) {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/incidents/${category}`} className="block">
                {/* Flex container to align icon and numbers */}
                <div className="flex items-center mb-2 gap-x-2">
                    <CategoryIcon categoryType={category} />
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {numbers}
                    </span>
                </div>

            </Link>
            <p className="text-sm text-gray-700 dark:text-gray-400">
                {category} incidents.
            </p>
        </div>
    );
}
