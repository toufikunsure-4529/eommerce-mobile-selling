"use client";
import React, { useState } from "react";
import Link from "next/link";
import SearchProduct from "./SearchProduct";

const brandsData = [

    { id: "samsung", name: "Samsung", image: "/brand.png" },
    { id: "apple", name: "Apple", image: "/brand.png" },
    { id: "xiaomi", name: "Xiaomi", image: "/brand.png" },
    { id: "oppo", name: "Oppo", image: "/brand.png" },
    { id: "vivo", name: "Vivo", image: "/brand.png" },
    { id: "realme", name: "Realme", image: "/brand.png" },
    { id: "oneplus", name: "OnePlus", image: "/brand.png" },
    { id: "nokia", name: "Nokia", image: "/brand.png" },
];

export default function BrandListing() {
    const [showAllBrands, setShowAllBrands] = useState(false);

    const displayedBrands = showAllBrands ? brandsData : brandsData.slice(0, 12);

    return (
        <div className="px-4 md:px-10 lg:px-20 py-10 bg-[#F4F4F4]">
            <SearchProduct />

            <div className="max-w-8xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">Choose Your Brand</h1>

                <div className="max-w-8xl mx-auto grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
                    {displayedBrands.map((brand) => (
                        <Link key={brand.id} href={`/brand/${brand.id}`} className="group">
                            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 brand__card  ">
                                <div className=" mb-3 flex items-center justify-center">
                                    <img
                                        src={brand.image}
                                        alt={brand.name}
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {brandsData.length > 12 && !showAllBrands && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => setShowAllBrands(true)}
                            className="bg-[#FF0101] hover:bg-[#ff4e4e] text-white px-6 py-2 rounded-lg transition font-medium shadow-md"
                        >
                            Explore All Brands
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
