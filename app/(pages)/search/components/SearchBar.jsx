"use client";

import { useState } from "react";

const SearchBar = ({ onSearch, initialValue = "" }) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg shadow-md">
            <input
                type="text"
                placeholder="Search products..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
