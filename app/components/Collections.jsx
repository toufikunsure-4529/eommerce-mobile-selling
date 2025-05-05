"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchProduct from "./SearchProduct";
import { useBrands } from "@/lib/firestore/brands/read";

export default function BrandListing() {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const { data: brands, error, isLoading } = useBrands();
  const displayedBrands = showAllBrands ? brands : brands?.slice(0, 14);

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 bg-white">
      <SearchProduct />

      <div className="max-w-8xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Choose Your Brand</h1>

        {isLoading && (
          <div className="text-center text-gray-600 py-10">Loading brands...</div>
        )}

        {error && (
          <div className="text-center text-red-500 py-10">
            Failed to load brands: {error}
          </div>
        )}

        {!isLoading && brands && (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 mt-8">
              {displayedBrands.map((brand) => (
                <Link key={brand.id} href={`/brand/${brand.id}`} className="group">
                  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                    <div className="mb-3 flex items-center justify-center h-20">
                      <Image
                        src={brand.imageURL}
                        alt={brand.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    {/* <p className="text-sm font-medium">{brand.name}</p> */}
                  </div>
                </Link>
              ))}
            </div>

            {brands.length > 14 && !showAllBrands && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setShowAllBrands(true)}
                  className="bg-[#FF0101] hover:bg-[#ff4e4e] text-white px-6 py-2 rounded-lg transition font-medium shadow-md"
                >
                  Explore All Brands
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
