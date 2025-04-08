"use client";

import { createBlogPost, updateBlogPost } from "@/lib/firestore/blog/write";
import { getBlogPost } from "@/lib/firestore/blog/read_server";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BlogForm() {
    const [data, setData] = useState(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const fetchData = async () => {
        try {
            const res = await getBlogPost({ id: id });
            if (!res) {
                toast.error("Blog Post Not Found!");
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
            await createBlogPost({ data: data, image: image });
            toast.success("Blog Post Created Successfully");
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
            await updateBlogPost({ data: data, image: image });
            toast.success("Blog Post Updated Successfully");
            setData(null);
            setImage(null);
            router.push("/admin/blog");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-4 bg-white rounded-xl p-6 w-full max-w-md shadow-md">
            <h1 className="text-xl font-semibold text-gray-800">
                {id ? "Update" : "Create"} Blog Post
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
                    <label htmlFor="blog-image" className="text-sm text-gray-600">
                        Featured Image <span className="text-red-500">*</span>
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
                        id="blog-image"
                        name="blog-image"
                        type="file"
                        accept="image/*"
                        className="border border-gray-300 rounded-md p-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {/* Title */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="blog-title" className="text-sm text-gray-600">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="blog-title"
                        name="blog-title"
                        type="text"
                        placeholder="Enter Blog Title"
                        value={data?.title ?? ""}
                        onChange={(e) => handleData("title", e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="blog-content" className="text-sm text-gray-600">
                        Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="blog-content"
                        name="blog-content"
                        placeholder="Enter Blog Content"
                        value={data?.content ?? ""}
                        onChange={(e) => handleData("content", e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
                    />
                </div>

                {/* Excerpt */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="blog-excerpt" className="text-sm text-gray-600">
                        Excerpt
                    </label>
                    <textarea
                        id="blog-excerpt"
                        name="blog-excerpt"
                        placeholder="Enter Short Excerpt"
                        value={data?.excerpt ?? ""}
                        onChange={(e) => handleData("excerpt", e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
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