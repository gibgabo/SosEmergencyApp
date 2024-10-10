// resources/js/Components/SearchBar.jsx
import React from "react";

export default function SearchBar({ searchTerm, onSearch }) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSearch(e.target.search.value);
        }} className="flex items-center mb-4">
            <input
                type="text"
                name="search"
                defaultValue={searchTerm}
                placeholder="Search incidents..."
                className="block w-80 pt-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <button type="submit" className="ml-2 p-2 text-white bg-blue-500 rounded-md">
                Search
            </button>
        </form>
    );
}
