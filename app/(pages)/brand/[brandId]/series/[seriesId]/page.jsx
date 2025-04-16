import Link from "next/link";
import Image from "next/image";
import { ChevronRight, AlertCircle } from "lucide-react";

// Mock data for models by series
const modelsBySeries = {
  "galaxy-a": [
    { id: "galaxy-a12", name: "Samsung Galaxy A12", image: "/product-img2.jpg" },
    { id: "galaxy-a32", name: "Samsung Galaxy A32", image: "/product-img2.jpg" },
    { id: "galaxy-a52", name: "Samsung Galaxy A52", image: "/product-img2.jpg" },
    { id: "galaxy-a72", name: "Samsung Galaxy A72", image: "/product-img2.jpg" },
    { id: "galaxy-a13", name: "Samsung Galaxy A13", image: "/product-img2.jpg" },
    { id: "galaxy-a33", name: "Samsung Galaxy A33", image: "/product-img2.jpg" },
    { id: "galaxy-a53", name: "Samsung Galaxy A53", image: "/product-img2.jpg" },
    { id: "galaxy-a73", name: "Samsung Galaxy A73", image: "/product-img2.jpg" },
    { id: "galaxy-a14", name: "Samsung Galaxy A14", image: "/product-img2.jpg" },
    { id: "galaxy-a34", name: "Samsung Galaxy A34", image: "/product-img2.jpg" },
    { id: "galaxy-a54", name: "Samsung Galaxy A54", image: "/product-img2.jpg" },
    { id: "galaxy-a74", name: "Samsung Galaxy A74", image: "/product-img2.jpg" },
  ],
  // Add more series as needed
};

// Brand and series names mapping
const brandNames = {
  samsung: "Samsung",
  apple: "Apple",
};

const seriesNames = {
  "galaxy-a": "Galaxy A Series",
  "galaxy-j": "Galaxy J Series",
  "galaxy-note": "Galaxy Note Series",
  "galaxy-s": "Galaxy S Series",
};

// Model Not Found Component
const ModelNotFound = ({ brandName, seriesName }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-md mx-auto">
        {/* Lucide Icon */}
        <AlertCircle className="mx-auto h-16 w-16 text-gray-500 mb-4 animate-pulse" />
        
        {/* Main Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Model Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find any models for {brandName} {seriesName}. Please check back later or try another series.
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

export default function SeriesPage({ params }) {
  const { brandId, seriesId } = params;
  const models = modelsBySeries[seriesId] || [];
  const brandName = brandNames[brandId] || brandId;
  const seriesName = seriesNames[seriesId] || seriesId;

  // Render ModelNotFound if no models are found
  if (models.length === 0) {
    return <ModelNotFound brandName={brandName} seriesName={seriesName} />;
  }

  return (
    <main className="max-w-8xl mx-auto px-8 md:px-20 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
        <Link href={`/brand/${brandId}`} className="text-gray-500 hover:text-gray-700">
          {brandName}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
        <span className="font-medium">{seriesName}</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Select Model</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {models.map((model) => (
          <Link
            href={`/brand/${brandId}/model/${model.id}`}
            key={model.id}
            className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="w-24 h-32 relative mb-2">
              <Image
                src={model.image || "/placeholder.svg"}
                alt={model.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-center text-sm font-medium">{model.name}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}