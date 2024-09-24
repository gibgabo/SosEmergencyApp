// resources/js/Components/SearchBar.jsx

import React from "react";

export default function SearchBar({ onSearch }) {
    const handleSearch = (e) => {
        e.preventDefault();
        const searchTerm = e.target.search.value;
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearch} className="mb-4 flex items-center">
            <input
                type="text"
                name="search"
                placeholder="Search incidents..."
                className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md" >
                Search
            </button>
        </form>
    );
}
