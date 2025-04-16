import Link from "next/link"
import Image from "next/image"
import { ChevronRight, AlertCircle } from "lucide-react"
// Mock data for model details
const modelDetails = {
  "galaxy-a12": {
    name: "Samsung Galaxy A12",
    image: "/product-img2.jpg",
    released: "March 2019",
    displaySize: "6.40 inches",
    categories: [
      { id: "display-screen", name: "Display & Screen" },
      { id: "body-housing", name: "Body & Housing" },
      { id: "battery", name: "Battery" },
      { id: "internal-component", name: "Internal Component" },
      { id: "repairing-tools", name: "Repairing Tools" },
    ],
  },
  // Add more models as needed
}

// Brand names mapping
const brandNames = {
  samsung: "Samsung",
  apple: "Apple",
}

export default function ModelPage({ params }) {
  const { brandId, modelId } = params
  const model = modelDetails[modelId]
  const brandName = brandNames[brandId] || brandId

  if (!model) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-md mx-auto">
        {/* Lucide Icon */}
        <AlertCircle className="mx-auto h-16 w-16 text-gray-500 mb-4 animate-pulse" />

        {/* Main Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Category Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the model you're looking for. It may have been moved or deleted.
        </p>

        {/* Call to Action */}
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
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
        <span className="font-medium">{model.name}</span>
      </div>

      <div className="grid md:grid-cols-12 gap-6 mb-8">
        <div className="md:col-span-3 flex justify-center">
          <div className="w-32 h-48 relative">
            <Image src={model.image || "/placeholder.svg"} alt={model.name} fill className="object-contain" />
          </div>
        </div>
        <div className="md:col-span-9">
          <h1 className="text-2xl font-bold mb-2">{model.name} Spare Parts</h1>
          <div className="space-y-2 text-gray-600">
            <p>Released: {model.released}</p>
            <p>Display Size: {model.displaySize}</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      {model.categories.map((category) => (
        <div key={category.id} className="mb-10">
          <h2 className="text-xl font-bold mb-4">{category.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {category.id === "display-screen" && (
              <>
                <Link
                  // href={`/brand/${brandId}/model/${modelId}/category/${category.id}/display-combo`}
                  href={`/products/${category.id}`}
                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 relative mb-2">
                    <Image
                      src="/product-img2.jpg"
                      alt="Display Combo Folder"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center text-sm font-medium">Display Combo Folder</span>
                </Link>
                <Link
                  href={`/brand/${brandId}/model/${modelId}/category/${category.id}/front-glass`}
                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 relative mb-2">
                    <Image
                      src="/product-img2.jpg"
                      alt="Front Glass"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center text-sm font-medium">Front Glass</span>
                </Link>
              </>
            )}

            {category.id === "body-housing" && (
              <>
                <Link
                  // href={`/brand/${brandId}/model/${modelId}/category/${category.id}/back-cover`}
                  href={`/products/${category.id}`}

                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 relative mb-2">
                    <Image
                      src="/product-img2.jpg"
                      alt="Back Cover Panel"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center text-sm font-medium">Back Cover Panel</span>
                  <div className="flex mt-2 space-x-1">
                    <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                    <span className="w-4 h-4 rounded-full bg-red-500"></span>
                    <span className="w-4 h-4 rounded-full bg-gray-400"></span>
                    <span className="w-4 h-4 rounded-full bg-black"></span>
                  </div>
                </Link>
                <Link
                  // href={`/brand/${brandId}/model/${modelId}/category/${category.id}/back-camera-panel`}
                  href={`/products/${category.id}`}

                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 relative mb-2">
                    <Image
                      src="/product-img2.jpg"
                      alt="Back Camera Panel"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center text-sm font-medium">Back Camera Panel</span>
                  <div className="flex mt-2 space-x-1">
                    <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                    <span className="w-4 h-4 rounded-full bg-red-500"></span>
                    <span className="w-4 h-4 rounded-full bg-gray-400"></span>
                    <span className="w-4 h-4 rounded-full bg-black"></span>
                  </div>
                </Link>
                <Link
                  // href={`/brand/${brandId}/model/${modelId}/category/${category.id}/volume-button`}
                  href={`/products/${category.id}`}

                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 relative mb-2">
                    <Image
                      src="/product-img2.jpg"
                      alt="Volume Button"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center text-sm font-medium">Volume Button</span>
                  <div className="flex mt-2 space-x-1">
                    <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                    <span className="w-4 h-4 rounded-full bg-red-500"></span>
                    <span className="w-4 h-4 rounded-full bg-black"></span>
                  </div>
                </Link>
              </>
            )}

            {category.id === "battery" && (
              <Link
                // href={`/brand/${brandId}/model/${modelId}/category/${category.id}/battery`}
                href={`/products/${category.id}`}

                className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 relative mb-2">
                  <Image src="/product-img2.jpg" alt="Battery" fill className="object-contain" />
                </div>
                <span className="text-center text-sm font-medium">Battery</span>
              </Link>
            )}

            {category.id === "internal-component" && (
              <>
                <Link
                  // href={`/brand/${brandId}/model/${modelId}/category/${category.id}/back-camera`}
                  href={`/products/${category.id}`}

                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 relative mb-2">
                    <Image
                      src="/product-img2.jpg"
                      alt="Back Camera"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center text-sm font-medium">Back Camera</span>
                </Link>
                <Link
                  href={`/products/${category.id}`}
                  // href={`/brand/${brandId}/model/${modelId}/category/${category.id}/front-glass`}

                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 relative mb-2">
                    <Image
                      src="/product-img2.jpg"
                      alt="Front Glass"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center text-sm font-medium">Front Glass</span>
                </Link>
              </>
            )}

            {category.id === "repairing-tools" && (
              <>
                <Link
                  // href={`/brand/${brandId}/model/${modelId}/category/${category.id}/back-camera-tools`}
                  href={`/products/${category.id}`}

                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 relative mb-2">
                    <Image
                      src="/product-img2.jpg"
                      alt="Back Camera Tools"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center text-sm font-medium">Back Camera</span>
                </Link>
                <Link
                  // href={`/brand/${brandId}/model/${modelId}/category/${category.id}/front-glass-tools`}
                  href={`/products/${category.id}`}

                  className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 relative mb-2">
                    <Image
                      src="/product-img2.jpg"
                      alt="Front Glass Tools"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-center text-sm font-medium">Front Glass</span>
                </Link>
              </>
            )}
          </div>
        </div>
      ))}
    </main>
  )
}
