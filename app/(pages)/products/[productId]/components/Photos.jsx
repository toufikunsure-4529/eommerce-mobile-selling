"use client"
import React, { useState } from "react";
import Image from "next/image";

function Photos({ imageList = [] }) {
    const defaultImage = "/laptop.webp";
    const [selectedImage, setSelectedImage] = useState(imageList[0] || defaultImage);

    if (!imageList.length) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-3xl font-bold text-red-500">Something Went Wrong</div>
            </div>
        );
    }

    const mockImg = [
        "/laptop.webp",
        "/laptop.webp",
        "/laptop.webp",
        "/laptop.webp"
    ]

    return (
        <div className="w-full max-w-md p-4 mx-auto">
            {/* Main Image */}
            <div className="border rounded-xl overflow-hidden shadow-md">
                <Image
                    src={selectedImage}
                    alt="Product Image"
                    width={500}
                    height={500}
                    className="w-full h-80 object-contain bg-gray-100 p-2"
                />
            </div>

            {/* Thumbnail Slider */}
            <div className="flex gap-3 mt-4 justify-center">
                {mockImg.map((img, index) => (
                    <div
                        key={index}
                        className={`relative w-16 h-16 cursor-pointer rounded-lg transition-all duration-300 overflow-hidden 
                            ${selectedImage === img ? "ring-2 ring-blue-500 scale-105" : "ring-1 ring-gray-300"}
                        `}
                        onClick={() => setSelectedImage(img)}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${index}`}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full hover:opacity-80"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Photos;