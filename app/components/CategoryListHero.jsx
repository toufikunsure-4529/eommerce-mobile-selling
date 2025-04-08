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
import { X, Menu } from "lucide-react"
import { Button } from "@nextui-org/react"
import Link from "next/link"


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
    {
        name: "Charging Port 2",
        brands: [
            { name: "Samsung", series: [{ name: "Galaxy A Series", models: ["A54 Charging Port", "A53 Charging Port"] }] },
            {
                name: "Google",
                series: [{ name: "Pixel Series", models: ["Pixel 8 Charging Port", "Pixel 7 Charging Port"] }],
            },
        ],
    },
    {
        name: "Charging Port 3",
        brands: [
            { name: "Samsung", series: [{ name: "Galaxy A Series", models: ["A54 Charging Port", "A53 Charging Port"] }] },
            {
                name: "Google",
                series: [{ name: "Pixel Series", models: ["Pixel 8 Charging Port", "Pixel 7 Charging Port"] }],
            },
        ],
    },
    {
        name: "Charging Port 4",
        brands: [
            { name: "Samsung", series: [{ name: "Galaxy A Series", models: ["A54 Charging Port", "A53 Charging Port"] }] },
            {
                name: "Google",
                series: [{ name: "Pixel Series", models: ["Pixel 8 Charging Port", "Pixel 7 Charging Port"] }],
            },
        ],
    },
    {
        name: "Charging Port 5",
        brands: [
            { name: "Samsung", series: [{ name: "Galaxy A Series", models: ["A54 Charging Port", "A53 Charging Port"] }, { name: "Galaxy b Series", models: ["A54 Charging Port", "A53 Charging Port"] }, { name: "Galaxy cSeries", models: ["A54 Charging Port", "A53 Charging Port"] }] },
            {
                name: "Google",
                series: [{ name: "Pixel Series", models: ["Pixel 8 Charging Port", "Pixel 7 Charging Port"] }],
            },
        ],
    },
]
export default function CategoryListHero() {
    // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState(categoryData[0].name)
    const [activeBrand, setActiveBrand] = useState(`${categoryData[0].name}-${categoryData[0].brands[0].name}`)
    const [activeSeries, setActiveSeries] = useState(
        `${categoryData[0].name}-${categoryData[0].brands[0].name}-${categoryData[0].brands[0].series[0].name}`
    )
    return (
        <div className="max-w-8xl mx-auto md:px-12">
            
            {/* For MObile View */}

            {/* <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm md:hidden">
                <Button
                    isIconOnly
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <Menu size={24} className="text-gray-700" />
                </Button>
                <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
            </div> */}

            {/* Desktop View */}
            <div className="hidden md:block bg-white p-4">
                <NavigationMenu>
                    <NavigationMenuList className="flex flex-wrap justify-content-center align-items-center gap-2 ">
                        {categoryData.map((category) => (
                            <NavigationMenuItem key={category.name}>
                                <NavigationMenuTrigger
                                    className={cn(
                                        "bg-white hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-md transition-all",

                                    )}
                                    onMouseEnter={() => {
                                        setActiveCategory(category.name)
                                        setActiveBrand(`${category.name}-${category.brands[0].name}`)
                                        setActiveSeries(`${category.name}-${category.brands[0].name}-${category.brands[0].series[0].name}`)
                                    }}
                                >
                                    {category.name}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent >                                    <div className="grid grid-cols-[220px_1fr] w-[700px] gap-4 p-6 bg-white shadow-inner">
                                    <div className="border-r border-gray-200 pr-4">
                                        <h3 className="font-semibold text-gray-800 mb-3">Brands</h3>
                                        <ul className="space-y-2">
                                            {category.brands.map((brand) => (
                                                <li
                                                    key={brand.name}
                                                    className={cn(
                                                        "cursor-pointer hover:text-primary hover:bg-gray-50 p-2 rounded transition-all",
                                                        activeBrand === `${category.name}-${brand.name}` && "text-primary bg-gray-50 font-medium"
                                                    )}
                                                    onMouseEnter={() => {
                                                        setActiveBrand(`${category.name}-${brand.name}`)
                                                        setActiveSeries(`${category.name}-${brand.name}-${brand.series[0].name}`)
                                                    }}
                                                >
                                                    {brand.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="grid grid-cols-[220px_1fr] gap-4">
                                        <div className="border-r border-gray-200 pr-4">
                                            <h3 className="font-semibold text-gray-800 mb-3">Series</h3>
                                            <ul className="space-y-2">
                                                {category.brands.map((brand) =>
                                                    activeBrand === `${category.name}-${brand.name}` &&
                                                    brand.series.map((series) => (
                                                        <li
                                                            key={series.name}
                                                            className={cn(
                                                                "cursor-pointer hover:text-primary hover:bg-gray-50 p-2 rounded transition-all",
                                                                activeSeries === `${category.name}-${brand.name}-${series.name}` &&
                                                                "text-primary bg-gray-50 font-medium"
                                                            )}
                                                            onMouseEnter={() =>
                                                                setActiveSeries(`${category.name}-${brand.name}-${series.name}`)
                                                            }
                                                        >
                                                            {series.name}
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-3">Models</h3>
                                            <ul className="space-y-2">
                                                {category.brands.map((brand) =>
                                                    brand.series.map((series) =>
                                                        activeSeries === `${category.name}-${brand.name}-${series.name}` &&
                                                        series.models.map((model) => (
                                                            <li
                                                                key={model}
                                                                className="hover:text-primary hover:bg-gray-50 p-2 rounded transition-all"
                                                            >
                                                                <NavigationMenuLink asChild>
                                                                    <Link legacyBehavior passHref
                                                                        href={`/products/${model.replace(/\s+/g, "-").toLowerCase()}`}
                                                                        className="block text-gray-600"
                                                                    >
                                                                        {model}
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        ))
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Mobile Sidebar */}
            {/* {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[1001] md:hidden">
                    <div
                        className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out opacity-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    <div
                        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl p-6 overflow-y-auto 
                        transition-transform duration-300 ease-in transform 
                        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Categories</h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        <MobileNavigation
                            categoryData={categoryData}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            activeBrand={activeBrand}
                            setActiveBrand={setActiveBrand}
                            activeSeries={activeSeries}
                            setActiveSeries={setActiveSeries}
                        />
                    </div>
                </div>
            )} */}

        </div>
    )
}

// Mobile Navigation Component (unchanged)
// function MobileNavigation({
//     categoryData,
//     activeCategory,
//     setActiveCategory,
//     activeBrand,
//     setActiveBrand,
//     activeSeries,
//     setActiveSeries
// }) {
//     return (
//         <div className="space-y-4">
//             {categoryData.map((category) => (
//                 <div key={category.name} className="border-b border-gray-200 pb-4">
//                     <button
//                         className={cn(
//                             "w-full text-left p-3 font-semibold flex justify-between items-center rounded-lg",
//                             activeCategory === category.name ? "bg-gray-100 text-primary" : "text-gray-700"
//                         )}
//                         onClick={() => {
//                             setActiveCategory(category.name)
//                             setActiveBrand(`${category.name}-${category.brands[0].name}`)
//                             setActiveSeries(`${category.name}-${category.brands[0].name}-${category.brands[0].series[0].name}`)
//                         }}
//                     >
//                         {category.name}
//                         <svg
//                             className={`h-5 w-5 transition-transform ${activeCategory === category.name ? "rotate-180" : ""}`}
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                         >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                         </svg>
//                     </button>

//                     {activeCategory === category.name && (
//                         <div className="mt-3 space-y-3 pl-4">
//                             {category.brands.map((brand) => (
//                                 <div key={brand.name}>
//                                     <button
//                                         className={cn(
//                                             "w-full text-left p-2 flex justify-between items-center rounded-md",
//                                             activeBrand === `${category.name}-${brand.name}` ? "bg-gray-100 text-primary" : "text-gray-600"
//                                         )}
//                                         onClick={() => {
//                                             setActiveBrand(`${category.name}-${brand.name}`)
//                                             setActiveSeries(`${category.name}-${brand.name}-${brand.series[0].name}`)
//                                         }}
//                                     >
//                                         {brand.name}
//                                         <svg
//                                             className={`h-4 w-4 transition-transform ${activeBrand === `${category.name}-${brand.name}` ? "rotate-180" : ""}`}
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </button>

//                                     {activeBrand === `${category.name}-${brand.name}` && (
//                                         <div className="mt-2 space-y-2 pl-4">
//                                             {brand.series.map((series) => (
//                                                 <div key={series.name}>
//                                                     <button
//                                                         className={cn(
//                                                             "w-full text-left p-2 flex justify-between items-center rounded-md",
//                                                             activeSeries === `${category.name}-${brand.name}-${series.name}` ?
//                                                                 "bg-gray-100 text-primary" : "text-gray-600"
//                                                         )}
//                                                         onClick={() =>
//                                                             setActiveSeries(`${category.name}-${brand.name}-${series.name}`)
//                                                         }
//                                                     >
//                                                         {series.name}
//                                                         <svg
//                                                             className={`h-4 w-4 transition-transform ${activeSeries === `${category.name}-${brand.name}-${series.name}` ? "rotate-180" : ""}`}
//                                                             fill="none"
//                                                             viewBox="0 0 24 24"
//                                                             stroke="currentColor"
//                                                         >
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                                         </svg>
//                                                     </button>

//                                                     {activeSeries === `${category.name}-${brand.name}-${series.name}` && (
//                                                         <ul className="mt-2 space-y-1 pl-4">
//                                                             {series.models.map((model) => (
//                                                                 <li key={model}>
//                                                                     <a
//                                                                         href={`/products/${model.replace(/\s+/g, "-").toLowerCase()}`}
//                                                                         className="block p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-all"
//                                                                     >
//                                                                         {model}
//                                                                     </a>
//                                                                 </li>
//                                                             ))}
//                                                         </ul>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     )
// }