"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createHeroContent, updateHeroContent, deleteHeroContent } from "@/lib/firestore/hero/write";
import { getHeroContent } from "@/lib/firestore/hero/read_server";

export default function HeroForm() {
    const [image, setImage] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fileInputRef = useRef(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");

    // Fetch existing data in edit mode
    useEffect(() => {
        if (id) {
            fetchHeroData();
        }
    }, [id]);

    const fetchHeroData = async () => {
        try {
            const res = await getHeroContent({ id });
            if (!res) {
                toast.error("Hero content not found");
            } else {
                setData(res);
            }
        } catch (error) {
            toast.error(error.message || "Failed to fetch data");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image && !data?.imageUrl) {
            toast.error("Please select an image.");
            return;
        }

        setIsLoading(true);

        try {
            if (id) {
                await updateHeroContent({
                    data: { id, imageUrl: data.imageUrl },
                    image,
                });
                toast.success("Hero image updated");
                // Reset form after update
                setImage(null);
                setData(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                router.push("/admin/banner"); // Redirect to /admin/banner
            } else {
                await createHeroContent({ image });
                toast.success("Hero image uploaded");
                // Reset form after creation
                setImage(null);
                setData(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;

        if (!window.confirm("Are you sure you want to delete this hero content?")) {
            return;
        }

        setIsLoading(true);

        try {
            await deleteHeroContent({ id });
            toast.success("Hero content deleted");
            // Reset form after deletion
            setImage(null);
            setData(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            router.push("/admin/banner"); // Redirect to /admin/banner
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 bg-white rounded-xl p-6 w-full max-w-md shadow-md">
            <h1 className="text-xl font-semibold text-gray-800">
                {id ? "Update" : "Upload"} Hero Image
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="hero-image" className="text-sm text-gray-600">
                        Hero Image <span className="text-red-500">*</span>
                    </label>

                    {(image || data?.imageUrl) && (
                        <div className="flex justify-center p-3">
                            <img
                                src={image ? URL.createObjectURL(image) : data.imageUrl}
                                alt="Preview"
                                className="h-24 object-cover rounded-md"
                            />
                        </div>
                    )}

                    <input
                        id="hero-image"
                        name="hero-image"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                setImage(e.target.files[0]);
                            }
                        }}
                        className="border border-gray-300 rounded-md p-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-blue-700 hover:file:bg-red-100"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex-1 py-2 px-4 rounded-md text-white font-medium ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                            } transition-colors`}
                    >
                        {isLoading ? "Processing..." : id ? "Update Image" : "Upload Image"}
                    </button>

                </div>
            </form>
        </div>
    );
}