"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useBrands } from "@/lib/firestore/brands/read";
import { useCategories } from "@/lib/firestore/categories/read";
import { useSearchParams } from "next/navigation";

// Skeleton loader for individual brand card
const SkeletonCard = () => (
    <div className="animate-pulse bg-gray-200 rounded-2xl h-36" />

);

export default function BrandListing() {
    const { data: brands, error, isLoading } = useBrands();
    const { data: categories } = useCategories();
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const category = categories?.find((cat) => cat.id === categoryId);

    return (
        <div className="px-4 md:px-10 lg:px-20 py-10 bg-white">
            <div className="max-w-8xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">
                    Select Brand {category && `for ${category.name}`}
                </h1>

                {isLoading && (
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 mt-8">
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <SkeletonCard key={idx} />
                        ))}
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-500 py-10">
                        Failed to load brands: {error}
                    </div>
                )}

                {!isLoading && brands && (
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 mt-8">
                        {brands.map((brand) => (
                            <Link
                                key={brand.id}
                                href={`/product?brandId=${brand.id}&categoryId=${categoryId}`}
                                className="group"
                            >
                                <div className="bg-white p-4 h-28 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                                    <div className="mb-3 flex items-center justify-center h-20">
                                        <Image
                                            src={brand.imageURL}
                                            alt={brand.name}
                                            width={80}
                                            height={80}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
