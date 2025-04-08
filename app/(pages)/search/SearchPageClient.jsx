// app/search/SearchPageClient.js (Client Component)
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { searchProducts } from "@/lib/firestore/products/read";
import SearchBar from "./components/SearchBar"

const SearchPageClient = ({ initialSearchTerm }) => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

    useEffect(() => {
        if (searchTerm) {
            fetchProducts(searchTerm);
        }
    }, [searchTerm]);

    const fetchProducts = async (query) => {
        setLoading(true);
        setError("");
        try {
            const results = await searchProducts(query);
            setProducts(results);
        } catch (err) {
            setError("Failed to fetch products.");
        }
        setLoading(false);
    };

    const handleSearch = (query) => {
        setSearchTerm(query);
        router.push(`?query=${encodeURIComponent(query)}`);
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center p-4 sm:p-6 mt-16">
            <div className="w-full max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-gray-200">
                <h1 className="text-2xl sm:text-2xl font-bold text-blue-900 mb-6 text-center drop-shadow-lg">
                    Search Products
                </h1>
                <SearchBar onSearch={handleSearch} initialValue={searchTerm} />

                {loading && (
                    <div className="flex flex-col items-center mt-6 animate-pulse">
                        <CircularProgress size={50} thickness={4} color="primary" />
                        <p className="mt-4 text-blue-700 font-medium">Searching products...</p>
                    </div>
                )}

                {error && (
                    <div className="mt-6 text-center text-red-600 font-semibold bg-red-100 p-3 rounded-lg">
                        ⚠ {error}
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className="mt-6">
                        <ProductList products={products} />
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <p className="mt-6 text-gray-500 text-center italic">No products found. Try a different search.</p>
                )}
            </div>
        </main>
    );
};

export default SearchPageClient;
