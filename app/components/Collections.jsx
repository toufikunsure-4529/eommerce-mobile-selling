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
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Choose Your Brand</h1>

        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 mt-8">
            {[...Array(14)].map((_, index) => (
              <div
                key={index}
                className="bg-white p-3 sm:p-4 rounded-xl shadow-sm h-24 sm:h-28 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                <div className="relative flex items-center justify-center h-full">
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-10">
            Failed to load brands: {error}
          </div>
        )}

        {!isLoading && brands && (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 mt-8">
              {displayedBrands.map((brand) => (
                <Link key={brand.id} href={`/brand/${brand.id}`} className="group">
                  <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 h-24 sm:h-28">
                    <div className="flex items-center justify-center h-full">
                      <Image
                        src={brand.imageURL}
                        alt={brand.name}
                        width={64}
                        height={64}
                        className="object-contain w-14 h-14 sm:w-16 sm:h-16"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {brands.length > 14 && !showAllBrands && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setShowAllBrands(true)}
                  className="bg-[#FF0101] hover:bg-[#ff4e4e] text-white px-6 py-2 rounded-lg transition font-medium shadow-sm"
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