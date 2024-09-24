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
        <div className="px-4 py-12">
        <nav aria-label="Page navigation example">
        <ul className="flex items-center justify-center h-8 -space-x-px text-sm">
                {/* Previous Button */}
                {links.previous && (
                    <li>
                        <Link
                            href={links.previous.url || "#"}
                            className={`mx-1 px-4 py-2 border rounded ${
                                link.active ? "font-bold" : ""
                            }`}
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
                            className={`mx-1 px-4 py-2 border rounded ${
                                link.active ? "font-bold" : ""
                            }`}
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
                            className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            preserveState
                            onClick={() => handlePageChange(links.next.url)}
                        >
                            Next
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
        </div>
    );
};

export default Pagination;
