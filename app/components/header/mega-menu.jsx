
import Link from "next/link"
import { X } from "lucide-react"

export default function MegaMenu({ category, activeBrand, activeSeries, onBrandHover, onSeriesHover, onClose }) {
  return (
    <div className="grid grid-cols-12 gap-6 p-6 max-w-7xl mx-auto">
      <div className="col-span-12 flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">{category.name}</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Brands column */}
      <div className="col-span-3 border-r border-gray-200 pr-6">
        <h4 className="text-sm font-medium text-gray-500 mb-3">Brands</h4>
        <div className="space-y-1">
          {category.brands.map((brand, idx) => (
            <button
              key={idx}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                activeBrand?.name === brand.name ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-gray-50"
              }`}
              onMouseEnter={() => onBrandHover(brand)}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>

      {/* Series column */}
      {activeBrand && (
        <div className="col-span-3 border-r border-gray-200 pr-6">
          <h4 className="text-sm font-medium text-gray-500 mb-3">{activeBrand.name} Series</h4>
          <div className="space-y-1">
            {activeBrand.series.map((series, idx) => (
              <button
                key={idx}
                className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSeries?.name === series.name ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-gray-50"
                }`}
                onMouseEnter={() => onSeriesHover(series)}
              >
                {series.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Models column */}
      {activeSeries && (
        <div className="col-span-6">
          <h4 className="text-sm font-medium text-gray-500 mb-3">{activeSeries.name} Models</h4>
          <div className="grid grid-cols-2 gap-1">
            {activeSeries.models.map((model, idx) => (
              <Link
                key={idx}
                href={`/products/${model.toLowerCase().replace(/\s+/g, "-")}`}
                className="block px-3 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors"
                onClick={onClose}
              >
                {model}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
