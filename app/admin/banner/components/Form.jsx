"use client";

import { createHeroContent, updateHeroContent } from "@/lib/firestore/hero/write";
import { getHeroContent } from "@/lib/firestore/hero/read_server";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function HeroForm() {
    const [data, setData] = useState(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const fetchData = async () => {
        try {
            const res = await getHeroContent({ id: id });
            if (!res) {
                toast.error("Hero Content Not Found!");
            } else {
                setData(res);
            }
        } catch (error) {
            toast.error(error?.message);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleData = (key, value) => {
        setData((prevData) => ({
            ...(prevData ?? {}),
            [key]: value,
        }));
    };

    const handleCreate = async () => {
        setIsLoading(true);
        try {
            await createHeroContent({ data: data, image: image });
            toast.success("Hero Section Created Successfully");
            setData(null);
            setImage(null);
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await updateHeroContent({ data: data, image: image });
            toast.success("Hero Section Updated Successfully");
            setData(null);
            setImage(null);
            router.push("/admin/hero");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-4 bg-white rounded-xl p-6 w-full max-w-md shadow-md">
            <h1 className="text-xl font-semibold text-gray-800">
                {id ? "Update" : "Create"} Hero Section
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    id ? handleUpdate() : handleCreate();
                }}
                className="flex flex-col gap-4"
            >
                {/* Image Upload */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="hero-image" className="text-sm text-gray-600">
                        Hero Image <span className="text-red-500">*</span>
                    </label>
                    {image && (
                        <div className="flex justify-center p-3">
                            <img
                                className="h-24 object-cover rounded-md"
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                            />
                        </div>
                    )}
                    <input
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                setImage(e.target.files[0]);
                            }
                        }}
                        id="hero-image"
                        name="hero-image"
                        type="file"
                        accept="image/*"
                        className="border border-gray-300 rounded-md p-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {/* Heading */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="hero-heading" className="text-sm text-gray-600">
                        Heading <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="hero-heading"
                        name="hero-heading"
                        type="text"
                        placeholder="Enter Heading"
                        value={data?.heading ?? ""}
                        onChange={(e) => handleData("heading", e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Subtitle */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="hero-subtitle" className="text-sm text-gray-600">
                        Subtitle
                    </label>
                    <textarea
                        id="hero-subtitle"
                        name="hero-subtitle"
                        placeholder="Enter Subtitle"
                        value={data?.subtitle ?? ""}
                        onChange={(e) => handleData("subtitle", e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                </div>

                {/* Button Text */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="hero-button" className="text-sm text-gray-600">
                        Button Text
                    </label>
                    <input
                        id="hero-button"
                        name="hero-button"
                        type="text"
                        placeholder="Enter Button Text"
                        value={data?.buttonText ?? ""}
                        onChange={(e) => handleData("buttonText", e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        } transition-colors`}
                >
                    {isLoading ? "Processing..." : id ? "Update" : "Create"}
                </button>
            </form>
        </div>
    );
}