import Link from "next/link";
import { ChevronRight, AlertCircle } from "lucide-react";

// Mock data for series by brand
const seriesByBrand = {
    samsung: [
        { id: "galaxy-a", name: "Galaxy A Series" },
        { id: "galaxy-j", name: "Galaxy J Series" },
        { id: "galaxy-note", name: "Galaxy Note Series" },
        { id: "galaxy-on", name: "Galaxy On Series" },
        { id: "galaxy-s", name: "Galaxy S Series" },
        { id: "galaxy-c", name: "Galaxy C Series" },
        { id: "galaxy-m", name: "Galaxy M Series" },
        { id: "galaxy-fold", name: "Galaxy Fold Series" },
        { id: "galaxy-z-flip", name: "Galaxy Z Flip Series" },
        { id: "galaxy-f", name: "Galaxy F Series" },
    ],
    xiaomi: [
        { id: "galaxy-a", name: "Galaxy A Series" },
        { id: "galaxy-j", name: "Galaxy J Series" },
        { id: "galaxy-note", name: "Galaxy Note Series" },
        { id: "galaxy-on", name: "Galaxy On Series" },
        { id: "galaxy-s", name: "Galaxy S Series" },
        { id: "galaxy-c", name: "Galaxy C Series" },
        { id: "galaxy-m", name: "Galaxy M Series" },
        { id: "galaxy-fold", name: "Galaxy Fold Series" },
        { id: "galaxy-z-flip", name: "Galaxy Z Flip Series" },
        { id: "galaxy-f", name: "Galaxy F Series" },
    ],
    oneplus: [
        { id: "galaxy-a", name: "Galaxy A Series" },
        { id: "galaxy-j", name: "Galaxy J Series" },
        { id: "galaxy-note", name: "Galaxy Note Series" },
        { id: "galaxy-on", name: "Galaxy On Series" },
        { id: "galaxy-s", name: "Galaxy S Series" },
        { id: "galaxy-c", name: "Galaxy C Series" },
        { id: "galaxy-m", name: "Galaxy M Series" },
        { id: "galaxy-fold", name: "Galaxy Fold Series" },
        { id: "galaxy-z-flip", name: "Galaxy Z Flip Series" },
        { id: "galaxy-f", name: "Galaxy F Series" },
    ],
    apple: [
        { id: "iphone", name: "iPhone" },
        { id: "ipad", name: "iPad" },
    ],
    // Add more brands as needed
};

// Brand names mapping
const brandNames = {
    samsung: "Samsung",
    apple: "Apple",
    xiaomi: "Xiaomi",
    oppo: "Oppo",
    vivo: "Vivo",
    realme: "Realme",
    oneplus: "OnePlus",
    nokia: "Nokia",
};

// Series Not Found Component
const SeriesNotFound = ({ brandName }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
            <div className="text-center max-w-md mx-auto">
                {/* Lucide Icon */}
                <AlertCircle className="mx-auto h-16 w-16 text-gray-500 mb-4 animate-pulse" />
                
                {/* Main Message */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Series Not Found</h1>
                <p className="text-gray-600 mb-6">
                    Sorry, we couldn't find any series for {brandName}. Please check back later or try another brand.
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

export default function BrandPage({ params }) {
    const { brandId } = params;
    const series = seriesByBrand[brandId] || [];
    const brandName = brandNames[brandId] || brandId;

    // Render SeriesNotFound if no series are found
    if (series.length === 0) {
        return <SeriesNotFound brandName={brandName} />;
    }

    return (
        <main className="max-w-8xl mx-auto px-8 md:px-20 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center mb-6 text-sm">
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
                <span className="font-medium">{brandName}</span>
            </div>

            <h1 className="text-2xl font-bold mb-6">Select Series</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {series.map((item) => (
                    <Link
                        href={`/brand/${brandId}/series/${item.id}`}
                        key={item.id}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow text-center"
                    >
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </div>

            {/* Search bar */}
            <div className="relative max-w-md mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Search your Phone Model"
                    className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </button>
            </div>
        </main>
    );
}