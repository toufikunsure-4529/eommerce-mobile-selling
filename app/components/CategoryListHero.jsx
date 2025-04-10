"use client"

import { useState } from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const categoryData = [
    {
        name: "Battery",
        icon: "/icon/battery.svg",
        brands: [
            {
                name: "Samsung",
                series: [
                    {
                        name: "Galaxy S Series",
                        models: [
                            "S23 Battery",
                            "S22 Battery",
                            "S21 Battery",
                            "S20 Battery",
                            "S10 Battery",
                            "S9 Battery",
                            "S8 Battery",
                            "S7 Battery",
                            "S6 Battery",
                            "S5 Battery",
                            "S4 Battery",
                            "S3 Battery",
                        ],
                    },
                    {
                        name: "Galaxy A Series",
                        models: ["A54 Battery", "A53 Battery", "A52 Battery", "A51 Battery", "A50 Battery"],
                    },
                    { name: "Galaxy Note Series", models: ["Note 20 Battery", "Note 10 Battery", "Note 9 Battery"] },
                    { name: "Galaxy Z Series", models: ["Z Fold 5 Battery", "Z Flip 5 Battery"] },
                ],
            },
            {
                name: "Apple",
                series: [
                    {
                        name: "iPhone Series",
                        models: [
                            "iPhone 15 Battery",
                            "iPhone 14 Battery",
                            "iPhone 13 Battery",
                            "iPhone 12 Battery",
                            "iPhone 11 Battery",
                            "iPhone X Battery",
                            "iPhone 8 Battery",
                            "iPhone 7 Battery",
                            "iPhone 6 Battery",
                            "iPhone SE Battery",
                        ],
                    },
                    { name: "iPad Series", models: ["iPad Pro Battery", "iPad Air Battery", "iPad Mini Battery"] },
                ],
            },
            {
                name: "Xiaomi",
                series: [
                    {
                        name: "Redmi Series",
                        models: [
                            "Redmi Note 12 Battery",
                            "Redmi Note 11 Battery",
                            "Redmi Note 10 Battery",
                            "Redmi Note 9 Battery",
                            "Redmi Note 8 Battery",
                            "Redmi 12 Battery",
                            "Redmi 11 Battery",
                            "Redmi 10 Battery",
                            "Redmi 9 Battery",
                            "Redmi 8 Battery",
                        ],
                    },
                    {
                        name: "Mi Series",
                        models: ["Mi 12 Battery", "Mi 11 Battery", "Mi 10 Battery", "Mi 9 Battery", "Mi 8 Battery"],
                    },
                    { name: "POCO Series", models: ["POCO F5 Battery", "POCO X5 Battery", "POCO M5 Battery"] },
                ],
            },
            {
                name: "Google",
                series: [
                    {
                        name: "Pixel Series",
                        models: ["Pixel 8 Battery", "Pixel 7 Battery", "Pixel 6 Battery", "Pixel 5 Battery", "Pixel 4 Battery"],
                    },
                ],
            },
            {
                name: "OnePlus",
                series: [
                    {
                        name: "Number Series",
                        models: ["OnePlus 11 Battery", "OnePlus 10 Battery", "OnePlus 9 Battery", "OnePlus 8 Battery"],
                    },
                    { name: "Nord Series", models: ["Nord 3 Battery", "Nord 2 Battery", "Nord CE Battery"] },
                ],
            },
        ],
    },
    {
        name: "Sim Tray",
        icon: "/icon/sim-tray.svg",
        brands: [
            {
                name: "Samsung",
                series: [
                    { name: "Galaxy S Series", models: ["S23 Sim Tray", "S22 Sim Tray", "S21 Sim Tray", "S20 Sim Tray"] },
                    { name: "Galaxy A Series", models: ["A54 Sim Tray", "A53 Sim Tray", "A52 Sim Tray"] },
                ],
            },
            {
                name: "Apple",
                series: [
                    {
                        name: "iPhone Series",
                        models: ["iPhone 15 Sim Tray", "iPhone 14 Sim Tray", "iPhone 13 Sim Tray", "iPhone 12 Sim Tray"],
                    },
                ],
            },
            {
                name: "Xiaomi",
                series: [
                    { name: "Redmi Series", models: ["Redmi Note 12 Sim Tray", "Redmi Note 11 Sim Tray"] },
                    { name: "Mi Series", models: ["Mi 12 Sim Tray", "Mi 11 Sim Tray"] },
                ],
            },
        ],
    },
    {
        name: "Charging Port",
        icon: "/icon/charging-cable.svg",
        brands: [
            {
                name: "Samsung",
                series: [
                    {
                        name: "Galaxy A Series",
                        models: ["A55 Charging Port", "A54 Charging Port", "A53 Charging Port", "A52 Charging Port"],
                    },
                    { name: "Galaxy S Series", models: ["S23 Charging Port", "S22 Charging Port", "S21 Charging Port"] },
                ],
            },
            {
                name: "Google",
                series: [
                    { name: "Pixel Series", models: ["Pixel 8 Charging Port", "Pixel 7 Charging Port", "Pixel 6 Charging Port"] },
                ],
            },
            {
                name: "Apple",
                series: [
                    {
                        name: "iPhone Series",
                        models: ["iPhone 15 Charging Port", "iPhone 14 Charging Port", "iPhone 13 Charging Port"],
                    },
                ],
            },
        ],
    },
    {
        name: "Display",
        icon: "/icon/display.svg",
        brands: [
            {
                name: "Samsung",
                series: [
                    { name: "Galaxy S Series", models: ["S23 Display", "S22 Display", "S21 Display", "S20 Display"] },
                    { name: "Galaxy A Series", models: ["A54 Display", "A53 Display", "A52 Display"] },
                    { name: "Galaxy Note Series", models: ["Note 20 Display", "Note 10 Display"] },
                ],
            },
            {
                name: "Apple",
                series: [
                    {
                        name: "iPhone Series",
                        models: ["iPhone 15 Display", "iPhone 14 Display", "iPhone 13 Display", "iPhone 12 Display"],
                    },
                ],
            },
            {
                name: "Xiaomi",
                series: [
                    { name: "Redmi Series", models: ["Redmi Note 12 Display", "Redmi Note 11 Display"] },
                    { name: "Mi Series", models: ["Mi 12 Display", "Mi 11 Display"] },
                ],
            },
        ],
    },
    {
        name: "Back Glass",
        icon: "/icon/display.svg",
        brands: [
            {
                name: "Samsung",
                series: [
                    { name: "Galaxy S Series", models: ["S23 Back Glass", "S22 Back Glass", "S21 Back Glass", "S20 Back Glass"] },
                    { name: "Galaxy Note Series", models: ["Note 20 Back Glass", "Note 10 Back Glass"] },
                ],
            },
            {
                name: "Apple",
                series: [
                    {
                        name: "iPhone Series",
                        models: ["iPhone 15 Back Glass", "iPhone 14 Back Glass", "iPhone 13 Back Glass", "iPhone 12 Back Glass"],
                    },
                ],
            },
        ],
    },
    {
        name: "Camera Lens",
        icon: "/icon/display.svg",
        brands: [
            {
                name: "Samsung",
                series: [
                    { name: "Galaxy S Series", models: ["S23 Camera Lens", "S22 Camera Lens", "S21 Camera Lens"] },
                    { name: "Galaxy A Series", models: ["A54 Camera Lens", "A53 Camera Lens"] },
                ],
            },
            {
                name: "Apple",
                series: [
                    {
                        name: "iPhone Series",
                        models: ["iPhone 15 Camera Lens", "iPhone 14 Camera Lens", "iPhone 13 Camera Lens"],
                    },
                ],
            },
            { name: "Google", series: [{ name: "Pixel Series", models: ["Pixel 8 Camera Lens", "Pixel 7 Camera Lens"] }] },
        ],
    },
    {
        name: "Motherboard",
        icon: "/icon/display.svg",
        brands: [
            {
                name: "Samsung",
                series: [
                    { name: "Galaxy S Series", models: ["S23 Motherboard", "S22 Motherboard", "S21 Motherboard"] },
                    { name: "Galaxy A Series", models: ["A54 Motherboard", "A53 Motherboard"] },
                    { name: "Galaxy Note Series", models: ["Note 20 Motherboard", "Note 10 Motherboard"] },
                ],
            },
            {
                name: "Apple",
                series: [
                    {
                        name: "iPhone Series",
                        models: ["iPhone 15 Motherboard", "iPhone 14 Motherboard", "iPhone 13 Motherboard"],
                    },
                ],
            },
        ],
    },
]

export default function CategoryListHero() {
    const [activeCategory, setActiveCategory] = useState(null)
    const [activeBrand, setActiveBrand] = useState(null)
    const [activeSeries, setActiveSeries] = useState(null)
    const [showAllModels, setShowAllModels] = useState({})

    const toggleShowAllModels = (seriesKey) => {
        setShowAllModels((prev) => ({
            ...prev,
            [seriesKey]: !prev[seriesKey],
        }))
    }

    // Find active category, brand, and series objects
    const getActiveCategory = () =>
        activeCategory ? categoryData.find((cat) => cat.name === activeCategory) : null

    const getActiveBrand = () => {
        const category = getActiveCategory()
        if (!category || !activeBrand) return null
        return category.brands.find((brand) => brand.name === activeBrand)
    }

    const getActiveSeries = () => {
        const brand = getActiveBrand()
        if (!brand || !activeSeries) return null
        return brand.series.find((series) => series.name === activeSeries)
    }

    const handleCategoryHover = (categoryName) => {
        setActiveCategory(categoryName)
        setActiveBrand(null)
        setActiveSeries(null)
    }

    const handleBrandHover = (brandName) => {
        setActiveBrand(brandName)
        setActiveSeries(null)
    }

    const handleSeriesHover = (seriesName) => {
        setActiveSeries(seriesName)
    }

    return (
        <div className="max-w-8xl mx-auto md:px-12">
            {/* Desktop View */}
            <div className="hidden lg:block bg-white p-4 rounded-lg shadow-sm">
                <NavigationMenu>
                    <NavigationMenuList className="flex flex-wrap justify-center items-center gap-2">
                        {categoryData.map((category) => (
                            <NavigationMenuItem key={category.name}>
                                <NavigationMenuTrigger
                                    className={cn(
                                        "bg-white hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-md transition-all flex items-center gap-2",
                                    )}
                                    onMouseEnter={() => handleCategoryHover(category.name)}
                                >
                                    <img src={category.icon} alt={category.name} className="h-10" />
                                    <span> {category.name}</span>
                                </NavigationMenuTrigger>

                                <NavigationMenuContent>
                                    <div className="w-[900px] p-6 bg-white shadow-lg rounded-b-lg">
                                        <div className="grid grid-cols-[220px_1fr] gap-6">
                                            {/* Brands Column - Always visible when category is hovered */}
                                            <div className="border-r border-gray-200 pr-4">
                                                <h3 className="font-semibold text-gray-800 mb-3">Brands</h3>
                                                <ul className="space-y-2">
                                                    {getActiveCategory()?.brands.map((brand) => (
                                                        <li
                                                            key={brand.name}
                                                            className={cn(
                                                                "cursor-pointer hover:text-primary hover:bg-gray-50 p-2 rounded transition-all flex items-center justify-between",
                                                                activeBrand === brand.name && "text-primary bg-gray-50 font-medium",
                                                            )}
                                                            onMouseEnter={() => handleBrandHover(brand.name)}
                                                        >
                                                            <span className="flex items-center">
                                                                <span className="w-6 h-6 bg-gray-100 rounded-full mr-2 flex items-center justify-center">
                                                                    {brand.name[0]}
                                                                </span>
                                                                {brand.name}
                                                            </span>
                                                            <ChevronRight size={16} className="text-gray-400" />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Series and Models Column */}
                                            <div>
                                                {/* Show brand overview when no brand is selected */}
                                                {!activeBrand && (
                                                    <div className="flex items-center justify-center h-full">
                                                        <div className="text-center">
                                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                                <img src={getActiveCategory()?.icon} alt="icon" />
                                                            </div>
                                                            <h3 className="font-semibold text-lg text-gray-800 mb-1">
                                                                {getActiveCategory()?.name}
                                                            </h3>
                                                            <p className="text-gray-500 max-w-xs">
                                                                Select a brand to view available parts and models
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Show series and models when brand is selected */}
                                                {activeBrand && (
                                                    <>
                                                        {/* Series List */}
                                                        <div className="mb-4">
                                                            <h3 className="font-semibold text-gray-800 mb-3">Series</h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                {getActiveBrand()?.series.map((series) => (
                                                                    <div
                                                                        key={series.name}
                                                                        className={cn(
                                                                            "cursor-pointer px-3 py-1 rounded transition-all border flex items-center",
                                                                            activeSeries === series.name
                                                                                ? "bg-primary text-white border-primary"
                                                                                : "bg-gray-50 text-gray-700 border-gray-200 hover:border-primary"
                                                                        )}
                                                                        onMouseEnter={() => handleSeriesHover(series.name)}
                                                                    >
                                                                        {series.name}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Models Section */}
                                                        <div className="border-t border-gray-200 pt-4">
                                                            <h3 className="font-semibold text-gray-800 mb-3">
                                                                {activeSeries
                                                                    ? `${getActiveBrand()?.name} - ${activeSeries} Models`
                                                                    : `${getActiveBrand()?.name} Models`}
                                                            </h3>

                                                            <div className="grid grid-cols-3 gap-2">
                                                                {activeSeries
                                                                    ? // Show models for active series
                                                                    getActiveSeries()?.models
                                                                        .slice(0, showAllModels[activeSeries] ? undefined : 10)
                                                                        .map((model) => (
                                                                            <div
                                                                                key={model}
                                                                                className="hover:text-primary hover:bg-gray-50 p-2 rounded transition-all"
                                                                            >
                                                                                <NavigationMenuLink asChild>
                                                                                    <Link
                                                                                        legacyBehavior
                                                                                        passHref
                                                                                        href={`/products/${model.replace(/\s+/g, "-").toLowerCase()}`}
                                                                                        className="block text-gray-600 hover:text-primary"
                                                                                    >
                                                                                        {model}
                                                                                    </Link>
                                                                                </NavigationMenuLink>
                                                                            </div>
                                                                        ))
                                                                    : // Show all models from all series (limited to 3 per series)
                                                                    getActiveBrand()?.series.flatMap((series) =>
                                                                        series.models.slice(0, 3).map((model) => (
                                                                            <div
                                                                                key={`${series.name}-${model}`}
                                                                                className="hover:text-primary hover:bg-gray-50 p-2 rounded transition-all"
                                                                            >
                                                                                <NavigationMenuLink asChild>
                                                                                    <Link
                                                                                        legacyBehavior
                                                                                        passHref
                                                                                        href={`/products/${model.replace(/\s+/g, "-").toLowerCase()}`}
                                                                                        className="block text-gray-600 hover:text-primary"
                                                                                    >
                                                                                        {model}
                                                                                    </Link>
                                                                                </NavigationMenuLink>
                                                                            </div>
                                                                        ))
                                                                    )}
                                                            </div>

                                                            {/* View More Button for active series */}
                                                            {activeSeries &&
                                                                getActiveSeries()?.models.length > 10 && (
                                                                    <button
                                                                        className="mt-3 text-primary flex items-center hover:underline"
                                                                        onClick={() => toggleShowAllModels(activeSeries)}
                                                                    >
                                                                        {showAllModels[activeSeries] ? "Show Less" : "View More"}
                                                                        <ChevronRight
                                                                            size={16}
                                                                            className={cn(
                                                                                "ml-1 transition-transform",
                                                                                showAllModels[activeSeries] && "rotate-90"
                                                                            )}
                                                                        />
                                                                    </button>
                                                                )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}