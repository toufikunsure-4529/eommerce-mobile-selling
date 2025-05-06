"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Layers } from "lucide-react";
import Link from "next/link";
import { useCategories } from "@/lib/firestore/categories/read";
import { useBrands } from "@/lib/firestore/brands/read";
import { useSeriesByBrand } from "@/lib/firestore/series/read";
import { useModelsByBrand } from "@/lib/firestore/models/read";

export default function CategoriesNav() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeBrand, setActiveBrand] = useState(null);
  const [activeSeries, setActiveSeries] = useState(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef(null);
  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: brands, isLoading: brandsLoading } = useBrands();
  const { data: series, isLoading: seriesLoading } = useSeriesByBrand(activeBrand?.id);
  const { data: models, isLoading: modelsLoading } = useModelsByBrand(activeBrand?.id);

  // Debounce utility
  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => func(...args), delay);
    };
  };

  // Open mega menu
  const openMegaMenu = useCallback((category) => {
    clearTimeout(timeoutRef.current);
    setActiveCategory(category);
    setActiveBrand(brands[0] || null);
    setActiveSeries(series[0] || null);
    setIsMegaMenuOpen(true);
  }, [brands, series]);

  // Close mega menu
  const closeMegaMenu = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setIsMegaMenuOpen(false);
    setActiveCategory(null);
    setActiveBrand(null);
    setActiveSeries(null);
  }, []);

  // Handle category hover
  const handleCategoryHover = useCallback(
    debounce((category) => {
      if (window.innerWidth >= 1024) {
        openMegaMenu(category);
      }
    }, 100),
    [openMegaMenu]
  );

  // Handle brand hover
  const handleBrandHover = useCallback((brand) => {
    if (window.innerWidth >= 1024) {
      setActiveBrand(brand);
      setActiveSeries(series[0] || null);
    }
  }, [series]);

  // Handle series hover
  const handleSeriesHover = useCallback((series) => {
    if (window.innerWidth >= 1024) {
      setActiveSeries(series);
    }
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target) &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        closeMegaMenu();
      }
    };



    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(timeoutRef.current);
    };
  }, [closeMegaMenu]);

  // Handle mouse leave
  const handleMouseLeave = useCallback(
    debounce(() => {
      if (window.innerWidth >= 1024) {
        closeMegaMenu();
      }
    }, 300),
    [closeMegaMenu]
  );

  return (
    <div className="relative">
      {/* Categories Navigation - Desktop */}
      <nav
        ref={navRef}
        className="hidden lg:flex items-center justify-between px-4 md:px-6 lg:px-8 xl:px-20 py-2 border-b border-gray-200 bg-white"
      >
        <Link
          href="/categories"
          className="flex items-center px-4 gap-2 text-sm font-medium py-3 text-white rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 mr-4 transition-all duration-200"
        >
          <Layers size={16} />
          Browse Categories
        </Link>

        {categories.slice(0, 6).map((category) => (
          <div
            key={category.id}
            className="relative category-menu-item group flex"
            onMouseEnter={() => handleCategoryHover(category)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-3 text-sm font-medium transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 ${
                activeCategory?.id === category.id ? "text-blue-600" : "text-gray-700"
              }`}
              onClick={() => {
                if (activeCategory?.id === category.id && isMegaMenuOpen) {
                  closeMegaMenu();
                } else {
                  openMegaMenu(category);
                }
              }}
              aria-expanded={activeCategory?.id === category.id && isMegaMenuOpen}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                <img
                  src={category.imageURL || "/placeholder.png"}
                  alt={category.name}
                  className="w-7 h-7 object-contain rounded-md"
                />
              </div>
              <span className="mt-1">{category.name}</span>
              <ChevronDown
                className={`h-4 w-4 mt-1 transition-transform duration-200 ${
                  activeCategory?.id === category.id ? "rotate-180 text-blue-600" : "text-gray-500"
                }`}
              />
            </button>
          </div>
        ))}
      </nav>

      {/* Mega Menu */}
      {isMegaMenuOpen && activeCategory && (
        <div
          ref={megaMenuRef}
          className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 hidden lg:block"
          onMouseEnter={() => clearTimeout(timeoutRef.current)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-4 gap-8">
            {/* Brands Section */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Brands</h3>
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/product?brandId=${brand.id}&categoryId=${activeCategory.id}`}
                  className={`block py-2 px-3 text-sm rounded-md hover:bg-gray-100 ${
                    activeBrand?.id === brand.id ? "bg-gray-100 text-blue-600" : "text-gray-700"
                  }`}
                  onMouseEnter={() => handleBrandHover(brand)}
                >
                  {brand.name}
                </Link>
              ))}
            </div>

            {/* Series Section */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Series</h3>
              {series.map((seriesItem) => (
                <Link
                  key={seriesItem.id}
                  href={`/product?brandId=${activeBrand?.id}&categoryId=${activeCategory.id}&seriesId=${seriesItem.id}`}
                  className={`block py-2 px-3 text-sm rounded-md hover:bg-gray-100 ${
                    activeSeries?.id === seriesItem.id ? "bg-gray-100 text-blue-600" : "text-gray-700"
                  }`}
                  onMouseEnter={() => handleSeriesHover(seriesItem)}
                >
                  {seriesItem.seriesName}
                </Link>
              ))}
            </div>

            {/* Models Section */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-4">Models</h3>
              <div className="grid grid-cols-2 gap-4">
                {models.map((model) => (
                  <Link
                    key={model.id}
                    href={`/product?brandId=${activeBrand?.id}&categoryId=${activeCategory.id}&modelId=${model.id}`}
                    className="block p-3 rounded-md hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={model.imageURL || "/placeholder.png"}
                        alt={model.name}
                        className="w-12 h-12 object-contain rounded-md"
                      />
                      <span className="text-sm text-gray-700">{model.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}