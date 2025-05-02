"use client"
import { useState, useEffect } from "react"
import ProductFilters from "./components/ProductFilters"
import ProductGrid from "./components/ProductGrid"
import SortMenu from "./components/SortMenu"
import { Filter, ArrowUpDown } from "lucide-react"

const Page = () => {

    const mockProducts = [
        {
            id: 1,
            title: "Galaxy S23 Ultra",
            price: 1199,
            salePrice: 1099,
            brand: "Samsung",
            featuredImageURL: "/product-img.png",
            shortDescription: "6.8-inch AMOLED display, 200MP camera",
            isBestSelling: true,    // Popular brand + good discount
            isLatest: true    // S23 series released early 2023

        },
        {
            id: 2,
            title: "iPhone 15 Pro Max",
            price: 1299,
            salePrice: 1249,
            brand: "Apple",
            featuredImageURL: "/product-img.png",
            shortDescription: "6.7-inch Super Retina XDR, A17 Pro chip, Titanium body.",
            isBestSelling: true,    // Apple products typically sell well
            isLatest: true     // iPhone 15 series is newer (late 2023)
        },
        {
            id: 3,
            title: "Google Pixel 8 Pro",
            price: 999,
            salePrice: 949,
            brand: "Google",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.7-inch LTPO OLED, Tensor G3 chip, 50MP triple camera.",
            isBestSelling: true,   // Good but less mainstream than Samsung/Apple
            isLatest: true     // Pixel 8 series is recent (late 2023)
        },
        {
            id: 4,
            title: "OnePlus 11 5G",
            price: 799,
            salePrice: 749,
            brand: "OnePlus",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.7-inch AMOLED, Snapdragon 8 Gen 2, 5000mAh battery.",
            isBestSelling: true,   // Niche brand
            isLatest: true    // Released early 2023
        },
        {
            id: 5,
            title: "Xiaomi 13 Pro",
            price: 899,
            salePrice: 849,
            brand: "Xiaomi",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.73-inch AMOLED, Snapdragon 8 Gen 2, Leica cameras.",
            isBestSelling: true,   // Less known in some markets
            isLatest: true    // Released early 2023
        },
        {
            id: 6,
            title: "Xiaomi 13 Pro",
            price: 899,
            salePrice: 849,
            brand: "Xiaomi",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.73-inch AMOLED, Snapdragon 8 Gen 2, Leica cameras.",
            isBestSelling: true,   // Less known in some markets
            isLatest: true    // Released early 2023
        },
    ];


    const [filteredProducts, setFilteredProducts] = useState(mockProducts)
    const [filters, setFilters] = useState({
        category: "",
        brand: "",
        price: 200,
    })
    const [sortOption, setSortOption] = useState("popularity")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)

    useEffect(() => {
        let updatedProducts = [...mockProducts]

        // Apply filters
        if (filters.category) {
            updatedProducts = updatedProducts.filter((product) =>
                product.shortDescription.toLowerCase().includes(filters.category.toLowerCase()),
            )
        }
        if (filters.brand) {
            updatedProducts = updatedProducts.filter((product) => product.brand.toLowerCase() === filters.brand.toLowerCase())
        }
        if (filters.price < 200) {
            updatedProducts = updatedProducts.filter((product) => product.salePrice <= filters.price)
        }

        // Apply sorting
        switch (sortOption) {
            case "priceLowToHigh":
                updatedProducts.sort((a, b) => a.salePrice - b.salePrice)
                break
            case "priceHighToLow":
                updatedProducts.sort((a, b) => b.salePrice - a.salePrice)
                break
            case "newest":
                updatedProducts.sort((a, b) => (a.isLatest === b.isLatest ? 0 : a.isLatest ? -1 : 1))
                break
            case "popularity":
            default:
                updatedProducts.sort((a, b) => (a.isBestSelling === b.isBestSelling ? 0 : a.isBestSelling ? -1 : 1))
                break
        }

        setFilteredProducts(updatedProducts)
    }, [filters, sortOption])

    const handleFilterChange = (filterType, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }))
    }

    const handleSortChange = (option) => {
        setSortOption(option)
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Mobile Filter/Sort Bar */}
            <div className="sticky top-0 z-10 md:hidden bg-white shadow-md">
                <div className="flex items-center justify-between p-3">
                    <div className="flex-1">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center justify-center w-full py-2 border-r"
                        >
                            <Filter size={16} className="mr-2" />
                            <span>Filter</span>
                        </button>
                    </div>
                    <div className="flex-1">
                        <button onClick={() => setIsSortOpen(true)} className="flex items-center justify-center w-full py-2">
                            <ArrowUpDown size={16} className="mr-2" />
                            <span>Sort</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-4 px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col md:flex-row">
                {/* Desktop Filters */}
                <div className="w-full md:w-1/5 mb-6 md:mb-0 md:mr-6">
                    <ProductFilters
                        onFilterChange={handleFilterChange}
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                    />
                </div>

                {/* Product Grid */}
                <div className="w-full md:w-4/5">
                    <div className="hidden md:flex justify-between items-center mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold">
                            Showing {filteredProducts.length} Results from total {mockProducts.length}
                        </h2>
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border rounded-md py-2 px-4 pr-8 cursor-pointer"
                                value={sortOption}
                                onChange={(e) => handleSortChange(e.target.value)}
                            >
                                <option value="popularity">Popularity</option>
                                <option value="priceLowToHigh">Price: Low to High</option>
                                <option value="priceHighToLow">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                                <option value="rating">Rating</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <ArrowUpDown size={16} />
                            </div>
                        </div>
                    </div>

                    <div className="md:hidden mb-4">
                        <h2 className="text-sm font-medium">Showing {filteredProducts.length} Results from total {mockProducts.length}</h2>
                    </div>

                    <ProductGrid products={filteredProducts} />
                </div>
            </div>

            {/* Mobile Sort Menu */}
            <SortMenu
                isOpen={isSortOpen}
                onClose={() => setIsSortOpen(false)}
                onSortChange={handleSortChange}
                currentSort={sortOption}
            />
        </div>
    )
}

export default Page
