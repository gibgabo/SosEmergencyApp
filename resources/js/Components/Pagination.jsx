import React from "react";
import { Link } from "@inertiajs/react";

const Pagination = ({ links, currentPage, setCurrentPage }) => {
    // Function to handle page changes
    const handlePageChange = (url) => {
        if (url) {
            const pageParam = new URL(url).searchParams.get("page");
            setCurrentPage(pageParam); // Update the current page
        }
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
                {/* Previous Button */}
                {links.previous && (
                    <li>
                        <Link
                            href={links.previous.url || "#"}
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            preserveState
                            onClick={() => handlePageChange(links.previous.url)}
                        >
                            Previous
                        </Link>
                    </li>
                )}

                {/* Page Links */}
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                            href={link.url || "#"}
                            className={`flex items-center justify-center px-3 h-8 leading-tight ${
                                link.active
                                    ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                            preserveState
                            onClick={() => handlePageChange(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </li>
                ))}

                {/* Next Button */}
                {links.next && (
                    <li>
                        <Link
                            href={links.next.url || "#"}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            preserveState
                            onClick={() => handlePageChange(links.next.url)}
                        >
                            Next
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
