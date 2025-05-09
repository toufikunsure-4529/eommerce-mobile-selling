"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useCategories } from "@/lib/firestore/categories/read";
import { AlertCircle } from "lucide-react";
import { useProductsByModelId } from "@/lib/firestore/products/read";
import { useModelById } from "@/lib/firestore/models/read"; // ✅ import hook
import Link from "next/link";

export default function ModelDetailsPage() {
    const { modelId } = useParams();

    const { data: model, isLoading: loadingModel, error: modelError } = useModelById(modelId);
    const { data: products, isLoading: loadingProducts, error: productError } = useProductsByModelId(modelId);
    const { categoriesMap, isLoading: loadingCategories } = useCategories();

    const loading = loadingModel || loadingProducts || loadingCategories;

    if (loading) {
        return <p className="text-center py-20 text-gray-500">Loading...</p>;
    }

    if (modelError || productError) {
        return (
            <p className="text-center text-red-500 py-20">
                Error: {modelError || productError}
            </p>
        );
    }

    const validProducts = products?.filter((p) => categoriesMap.has(p.categoryId)) ?? [];

    if (validProducts.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                    <p className="text-gray-600">No categorized products found for this model.</p>
                </div>
            </div>
        );
    }

    const groupedByCategory = validProducts.reduce((acc, product) => {
        const catId = product.categoryId;
        if (!acc[catId]) acc[catId] = [];
        acc[catId].push(product);
        return acc;
    }, {});

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            {/* ✅ Model Image and Name */}
            <div className="flex items-center gap-6 mb-8">
                <img
                    src={model?.imageURL || "/placeholder.png"}
                    alt={model?.name || "Model"}
                    className="w-20 h-20 object-contain rounded border"
                />
                <h1 className="text-2xl font-bold">{model?.name || "Model"} Spare Parts</h1>

            </div>

            {/* ✅ Products grouped by category */}
            {Object.entries(groupedByCategory).map(([catId, items]) => {
                const category = categoriesMap.get(catId);
                return (
                    <section key={catId} className="mb-10">
                        <h2 className="text-xl font-semibold mb-4">{category?.name ?? "Unnamed Category"}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                            {items.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    className="block border rounded-md p-4 shadow hover:shadow-md transition"
                                >
                                    <img
                                        src={product.featureImageURL}
                                        alt={product.title}
                                        className="w-full h-40 object-contain mb-2"
                                    />
                                    <h3 className="font-semibold text-sm overflow-hidden">{product.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </section>
                );
            })}

        </main>
    );
}
