"use client";
import React, { useState } from "react";
import Image from "next/image";

function Photos({ imageList = [] }) {
    const defaultImage = "/prodduct.png";
    const [selectedImage, setSelectedImage] = useState(imageList[0] || defaultImage);

    if (!imageList.length) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-500 px-4 text-center">
                    Something Went Wrong
                </div>
            </div>
        );
    }

    const mockImg = [
        "/feature1.png",
        "/feature2.png",
        "/feature1.png",
        "/feature2.png",
    ];

    return (
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-4 sm:gap-6 bg-white my-2 md:my-0">
            {/* Thumbnails */}
            <div className="w-full lg:w-1/5 flex flex-row lg:flex-col gap-3 sm:gap-4 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto pb-4 lg:pb-0">
                {mockImg.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`flex-shrink-0 relative w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 cursor-pointer rounded-lg overflow-hidden border-2 bg-white transition duration-300 shadow-md
                            ${selectedImage === img ? "border-red-500 scale-105 shadow-lg" : ""}`}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${index}`}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
            </div>

            {/* Main Image */}
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex justify-center items-center border rounded-xl bg-white shadow-md p-4">
                <Image
                    src={selectedImage}
                    alt="Selected Product"
                    width={600}
                    height={400}
                    className="object-contain w-full h-full"
                    priority
                />
            </div>
        </div>
    );
}

export default Photos;