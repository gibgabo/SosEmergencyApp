import React from "react";
import { Inertia } from '@inertiajs/inertia';

const Pagination = ({ links, currentPage, setCurrentPage }) => {
    const handlePageChange = (pageUrl, e) => {
        e.preventDefault();
        if (pageUrl && pageUrl !== window.location.href) {
            Inertia.visit(pageUrl, {
                preserveState: true,
                onError: (errors) => {
                    alert("There was a conflict or error with your request.");
                    console.error("Error:", errors);
                },
                onSuccess: () => {
                    const urlParams = new URL(pageUrl);
                    const page = urlParams.searchParams.get("page");
                    setCurrentPage(Number(page));
                }
            });
        }
    };

    // Calculate the range of page numbers to display
    const maxPagesToShow = 5;
    const totalPages = links.length - 2; // Subtracting "previous" and "next"
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return (
        <div className="px-4 py-12">
            <nav aria-label="Page navigation example">
                <ul className="flex items-center justify-center h-8 -space-x-px text-sm">
                    {/* Previous Button */}
                    {links.previous && (
                        <li>
                            <button
                                className="mx-1 px-4 py-2 border rounded hover:bg-gray-100"
                                onClick={(e) => handlePageChange(links.previous.url, e)}
                            >
                                <span aria-hidden="true">&larr;</span> Previous
                            </button>
                        </li>
                    )}

                    {/* Page Links */}
                    {links
                        .filter((link) => {
                            // Filter out previous and next links and show only within the range of startPage to endPage
                            const pageNum = Number(link.label);
                            return !isNaN(pageNum) && pageNum >= startPage && pageNum <= endPage;
                        })
                        .map((link, index) => (
                            <li key={index}>
                                <button
                                    className={`mx-1 px-4 py-2 border rounded ${
                                        link.active ? "font-bold bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                    onClick={(e) => handlePageChange(link.url, e)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            </li>
                        ))}

                    {/* Next Button */}
                    {links.next && (
                        <li>
                            <button
                                className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={(e) => handlePageChange(links.next.url, e)}
                            >
                                Next <span aria-hidden="true">&rarr;</span>
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
