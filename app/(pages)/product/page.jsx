"use client";
import React, { useState, useEffect } from 'react';
import ProductFilters from './components/ProductFilters';
import ProductGrid from './components/ProductGrid';

const page = () => {
    const mockProducts = [
        {
            id: 1,
            title: "Galaxy S23 Ultra",
            price: 1199,
            salePrice: 1099,
            brand: "Samsung",
            featuredImageURL: "/product-img.png",
            shortDescription: "6.8-inch AMOLED display, 200MP camera",
            isBestSelling: true,
            isLatest: true,
        },
        {
            id: 2,
            title: "iPhone 15 Pro Max",
            price: 1299,
            salePrice: 1249,
            brand: "Apple",
            featuredImageURL: "/product-img.png",
            shortDescription: "6.7-inch Super Retina XDR, A17 Pro chip, Titanium body.",
            isBestSelling: true,
            isLatest: true,
        },
        {
            id: 3,
            title: "Google Pixel 8 Pro",
            price: 999,
            salePrice: 949,
            brand: "Google",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.7-inch LTPO OLED, Tensor G3 chip, 50MP triple camera.",
            isBestSelling: true,
            isLatest: true,
        },
        {
            id: 4,
            title: "OnePlus 11 5G",
            price: 799,
            salePrice: 749,
            brand: "OnePlus",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.7-inch AMOLED, Snapdragon 8 Gen 2, 5000mAh battery.",
            isBestSelling: true,
            isLatest: true,
        },
        {
            id: 5,
            title: "Xiaomi 13 Pro",
            price: 899,
            salePrice: 849,
            brand: "Xiaomi",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.73-inch AMOLED, Snapdragon 8 Gen 2, Leica cameras.",
            isBestSelling: true,
            isLatest: true,
        },
        {
            id: 6,
            title: "Xiaomi 13 Pro",
            price: 899,
            salePrice: 849,
            brand: "Xiaomi",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.73-inch AMOLED, Snapdragon 8 Gen 2, Leica cameras.",
            isBestSelling: true,
            isLatest: true,
        },
    ];

    const [filteredProducts, setFilteredProducts] = useState(mockProducts);
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        price: 200,
    });

    useEffect(() => {
        let updatedProducts = mockProducts;

        if (filters.category) {
            updatedProducts = updatedProducts.filter((product) =>
                product.shortDescription.toLowerCase().includes(filters.category.toLowerCase())
            );
        }
        if (filters.brand) {
            updatedProducts = updatedProducts.filter((product) =>
                product.brand.toLowerCase() === filters.brand.toLowerCase()
            );
        }
        if (filters.price < 200) {
            updatedProducts = updatedProducts.filter((product) => product.salePrice <= filters.price);
        }

        setFilteredProducts(updatedProducts);
    }, [filters]);

    const handleFilterChange = (filterType, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    return (
        <div className="container mx-auto p-4 px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/5 mb-6 lg:mb-0 lg:mr-6">
                <ProductFilters onFilterChange={handleFilterChange} />
            </div>
            <div className="w-full lg:w-4/5">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                    Showing {filteredProducts.length} Results from total 230
                </h2>
                <ProductGrid products={filteredProducts} />
            </div>
        </div>
    );
};

export default page;