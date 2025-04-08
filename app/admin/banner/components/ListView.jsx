"use client";

import React, { useEffect, useState } from "react";
import { getAllHeroContent } from "@/lib/firestore/hero/read";
import { deleteHeroContent } from "@/lib/firestore/hero/write";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ListView() {
    const [heroItems, setHeroItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Fetch all hero content on mount
    const fetchHeroContent = async () => {
        setIsLoading(true);
        try {
            const data = await getAllHeroContent();
            setHeroItems(data);
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchHeroContent();
    }, []);

    // Handle delete operation
    const handleDelete = async (id, imageUrl) => {
        if (!confirm("Are you sure you want to delete this hero section?")) return;

        try {
            await deleteHeroContent({ id, imageUrl });
            toast.success("Hero section deleted successfully");
            setHeroItems(heroItems.filter((item) => item.id !== id));
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Handle edit navigation
    const handleEdit = (id) => {
        router.push(`/admin/hero/form?id=${id}`);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Hero Sections</h1>

            {isLoading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : heroItems.length === 0 ? (
                <div className="text-center text-gray-500">No hero sections found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Image</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Heading</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Subtitle</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Button Text</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {heroItems.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.heading}
                                                className="h-12 w-12 object-cover rounded-md"
                                            />
                                        ) : (
                                            <span className="text-gray-400">No Image</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 text-gray-800">{item.heading}</td>
                                    <td className="py-4 px-4 text-gray-600 max-w-xs truncate">{item.subtitle}</td>
                                    <td className="py-4 px-4 text-gray-800">{item.buttonText || "N/A"}</td>
                                    <td className="py-4 px-4 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(item.id)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id, item.imageUrl)}
                                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ListView;