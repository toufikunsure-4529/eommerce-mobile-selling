"use client"
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, AlertCircle } from "lucide-react";
import { useBrands } from "@/lib/firestore/brands/read";
import { useSeriesByBrand } from "@/lib/firestore/series/read";
import { useModelsByBrand } from "@/lib/firestore/models/read";
import { useParams } from "next/navigation";

function SeriesNotFound({ brandName }) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
            <div className="text-center max-w-md mx-auto">
                <AlertCircle className="mx-auto h-16 w-16 text-gray-500 mb-4 animate-pulse" />
                <h1 className="text-2xl font-bold mb-2">Series Not Found</h1>
                <p className="text-gray-600 mb-6">
                    Sorry, we couldn't find any series for {brandName}.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default function BrandSeriesPage() {
    const params = useParams();
    const brandId = params.brandId;

    const [selectedSeriesId, setSelectedSeriesId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch series, brand name, and all models for the brand
    const { data: series, isLoading, error } = useSeriesByBrand(brandId);
    const { data: brands } = useBrands();
    const { data: allModels, isLoading: loadingModels } = useModelsByBrand(brandId);

    const brand = brands?.find((b) => b.id === brandId);
    const brandName = brand?.name || brandId;

    // Filter models by selected series and search query
    const filteredModels = allModels
        ?.filter((model) =>
            selectedSeriesId ? model.seriesId === selectedSeriesId : true
        )
        .filter((model) =>
            model.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Loading and error handling
    if (isLoading) return <p className="text-center py-20 text-gray-500">Loading series...</p>;
    if (error) return <p className="text-center text-red-500 py-20">Failed to load series: {error}</p>;
    if (!series || series.length === 0) return <SeriesNotFound brandName={brandName} />;

    return (
        <main className="max-w-7xl mx-auto px-6 py-10">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:underline">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-gray-800">{brandName}</span>
            </div>

            <h1 className="text-2xl font-bold mb-6">Select {brandName} Series</h1>

            {/* Series Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {series.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedSeriesId(item.id)}
                        className={`cursor-pointer p-4 border rounded-md shadow text-center transition hover:shadow-md ${selectedSeriesId === item.id ? "border-blue-600" : ""
                            }`}
                    >
                        <p className="font-medium">{item.seriesName}</p>
                    </div>
                ))}
            </div>

            {/* Clear Filter Button */}
            {selectedSeriesId && (
                <div className="text-center mb-6">
                    <button
                        onClick={() => setSelectedSeriesId(null)}
                        className="text-sm text-blue-600 underline hover:text-blue-800"
                    >
                        Clear Filter
                    </button>
                </div>
            )}

            {/* Search Input */}
            <div className="max-w-md mx-auto mb-6">
                <input
                    type="text"
                    placeholder="Search your phone model..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            {/* Models List */}
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    {selectedSeriesId ? "Filtered Models" : "All Models"}
                </h2>

                {loadingModels ? (
                    <p className="text-gray-500">Loading models...</p>
                ) : filteredModels && filteredModels.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {filteredModels.map((model) => (
                            <Link href={`/models/${model.id}`} key={model.id} className=" ">
                                <div className="p-4 border rounded-md shadow hover:shadow-md transition text-center cursor-pointer flex justify-center items-center flex-col">
                                    <img src={model.imageURL} alt={model.name} />
                                    <p className="font-medium mt-2">{model.name}</p>
                                </div>
                            </Link>

                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No models found.</p>
                )}
            </div>
        </main>
    );
}