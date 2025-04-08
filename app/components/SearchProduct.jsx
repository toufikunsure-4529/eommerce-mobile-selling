"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@nextui-org/react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import { ChevronDown, Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SearchProduct() {
    const router = useRouter();
    const searchRef = useRef(null);
    const [selectedBrand, setSelectedBrand] = useState("All Brands");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Get all unique brands
    const brands = Array.from(
        new Set(categoryData.flatMap(category => category.brands.map(brand => brand.name)))
    );

    // Handle search
    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setFilteredProducts([]);
            return;
        }

        const results = [];

        categoryData.forEach(category => {
            category.brands.forEach(brand => {
                if (selectedBrand !== "All Brands" && brand.name !== selectedBrand) return;

                brand.series.forEach(series => {
                    series.models.forEach(model => {
                        if (model.toLowerCase().includes(searchTerm.trim().toLowerCase())) {
                            results.push({
                                name: model,
                                category: category.name,
                                brand: brand.name,
                                series: series.name,
                                slug: model.toLowerCase().replace(/\s+/g, '-')
                            });
                        }
                    });
                });
            });
        });

        setFilteredProducts(results);
    };

    // Trigger search when filters change
    useEffect(() => {
        handleSearch();
    }, [searchTerm, selectedBrand]);

    // Handle key press (Enter key)
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4">
            <div
                className=" relative w-full mt-4 mb-10 gap-2 md:gap-0"
                ref={searchRef}
            >
                {/* Search Bar */}
                <div className="flex w-full py-1 items-center rounded-full border border-gray-300 overflow-hidden">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="light"
                                className="flex items-center px-4 py-2 gap-2 rounded-none"
                            >
                                <Menu size={16} />
                                <span className="text-sm">{selectedBrand}</span>
                                <ChevronDown size={16} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Brands"
                            className="bg-white shadow-md w-52 rounded-md"
                        >
                            <DropdownItem
                                key="all"
                                onClick={() => setSelectedBrand("All Brands")}
                                className="text-sm"
                            >
                                All Brands
                            </DropdownItem>
                            {brands.map((brand, idx) => (
                                <DropdownItem
                                    key={idx}
                                    onClick={() => setSelectedBrand(brand)}
                                    className="text-sm"
                                >
                                    {brand}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>

                    <Input
                        placeholder="Search for Model"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                        onFocus={() => setIsSearchFocused(true)}
                        className="flex-1 rounded-none border-l border-gray-300"
                        classNames={{
                            inputWrapper:
                                "border-none shadow-none focus-within:ring-0 focus-within:border-none h-10",
                            input: "px-3 py-2 focus:outline-none text-sm",
                        }}
                    />

                    <Button
                        isIconOnly
                        className="rounded-none bg-transparent"
                        onClick={handleSearch}
                    >
                        <Search size={16} />
                    </Button>
                </div>

                {/* Search Results - Now in natural flow */}
                {isSearchFocused && searchTerm && (
                    <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">                        {filteredProducts.length > 0 ? (
                        <ul className="divide-y divide-gray-100">
                            {filteredProducts.map((product, index) => (
                                <li key={index}>
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="block p-4 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {product.brand} • {product.series} • {product.category}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            No products found. Try a different search term.
                        </div>
                    )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchProduct;

const categoryData = [
    {
        name: "Battery",
        brands: [
            { name: "Samsung", series: [{ name: "Galaxy S Series", models: ["S23 Battery", "S22 Battery", "S21 Battery"] }] },
            { name: "Apple", series: [{ name: "iPhone Series", models: ["iPhone 15 Battery", "iPhone 14 Battery"] }] },
            {
                name: "Xiaomi",
                series: [
                    { name: "Redmi Series", models: ["Redmi Note 12 Battery", "Redmi 11 Battery"] },
                    { name: "Mi Series", models: ["Mi 12 Battery", "Mi 11 Battery"] },
                ],
            },
        ],
    },
    {
        name: "Sim Tray",
        brands: [
            { name: "Samsung", series: [{ name: "Galaxy S Series", models: ["S23 Sim Tray", "S22 Sim Tray"] }] },
            { name: "Apple", series: [{ name: "iPhone Series", models: ["iPhone 15 Sim Tray", "iPhone 14 Sim Tray"] }] },
        ],
    },
    {
        name: "Charging Port",
        brands: [
            { name: "Samsung", series: [{ name: "Galaxy A Series", models: ["A55 Charging Port", "A53 Charging Port"] }] },
            {
                name: "Google",
                series: [{ name: "Pixel Series", models: ["Pixel 8 Charging Port", "Pixel 7 Charging Port"] }],
            },
        ],
    },
];