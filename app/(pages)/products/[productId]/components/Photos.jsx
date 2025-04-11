"use client";
import React, { useState } from "react";
import Image from "next/image";

function Photos({ imageList = [] }) {
    const defaultImage = "/prodduct.png";
    const [selectedImage, setSelectedImage] = useState(
        imageList[0] || defaultImage
    );

    if (!imageList.length) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-red-500 px-6 text-center">
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
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6 ">
            {/* Thumbnails */}
            <div className="w-full lg:w-1/6 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-1">
                {mockImg.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`relative w-14 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-sm 
              ${selectedImage === img
                                ? "border-red-500 scale-105 shadow-md"
                                : "border-gray-200 hover:scale-105"
                            }`}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${index}`}
                            className="object-cover w-full h-full"
                            loading="lazy"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="w-full h-[280px] sm:h-[360px] md:h-[450px] lg:h-[550px] flex justify-center items-center border border-gray-200 rounded-xl bg-white shadow-md p-4">
                <Image
                    src={selectedImage}
                    alt="Selected Product"
                    width={1000}
                    height={1000}
                    className="object-contain w-full h-full"
                    priority
                />
            </div>
        </div>
    );
}

export default Photos;
