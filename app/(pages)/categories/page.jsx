"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

// Mock data for categories
const categories = [
  { id: 1, name: "Mobile Screen", image: "/product-img.png" },
  { id: 2, name: "Battery", image: "/product-img.png" },
  { id: 3, name: "Charger", image: "/product-img.png" },
  { id: 4, name: "Back Cover", image: "/product-img.png" },
  { id: 5, name: "Earphones", image: "/product-img.png" },
  { id: 6, name: "Camera Lens", image: "/product-img.png" },
  { id: 7, name: "Speaker", image: "/product-img.png" },
  { id: 8, name: "Motherboard", image: "/product-img.png" },
  { id: 9, name: "Screen Protector", image: "/product-img.png" },
];

// Category Not Found Component
const CategoryNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-md mx-auto">
        {/* Lucide Icon */}
        <AlertCircle className="mx-auto h-16 w-16 text-gray-500 mb-4 animate-pulse" />

        {/* Main Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Categories Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find any categories. Please check back later.
        </p>

        {/* Call to Action */}
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

function Home() {
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push("/products/1");
  };

  // Render CategoryNotFound if no categories are found
  if (categories.length === 0) {
    return <CategoryNotFound />;
  }

  return (
    <div className="min-h-screen max-w-8xl mx-auto bg-gray-100 py-10 px-4 sm:px-6 md:px-8 lg:px-20">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Shop by Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 h-auto flex flex-col"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="relative w-full h-56">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-contain p-4"
                priority={category.id <= 4} // Optimize loading for first few images
              />
            </div>
            <div className="p-4 text-center flex-1 flex items-center justify-center">
              <p className="text-lg font-semibold text-gray-700">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;