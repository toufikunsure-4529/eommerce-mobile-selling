"use client";

import { useEffect, useState } from "react";

export default function Description({ data, handleData }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleChange = (event) => {
        handleData("description", event.target.value);
    };

    return (
        <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl h-full">
            <h1 className="font-semibold">Description</h1>
            {isMounted ? (
                <textarea
                    className="w-full p-3 border rounded bg-white text-gray-900"
                    value={data?.description || ""}
                    onChange={handleChange}
                    placeholder="Enter your description here..."
                    rows={5}
                />
            ) : (
                <div className="p-3 border rounded bg-gray-100 text-gray-500">
                    Loading input box...
                </div>
            )}
        </section>
    );
}