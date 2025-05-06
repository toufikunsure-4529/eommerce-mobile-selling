"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown, Layers } from "lucide-react"
import Link from "next/link"
import MegaMenu from "./mega-menu"
import { categoryData } from "./category-data"

export default function CategoriesNav() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeBrand, setActiveBrand] = useState(null)
  const [activeSeries, setActiveSeries] = useState(null)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const megaMenuRef = useRef(null)
  const navRef = useRef(null)
  const timeoutRef = useRef(null)

  // Debounce utility to prevent rapid state changes
  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => func(...args), delay)
    }
  }

  // Open mega menu with category data
  const openMegaMenu = useCallback((category) => {
    clearTimeout(timeoutRef.current)
    setActiveCategory(category)
    setActiveBrand(category.brands[0])
    setActiveSeries(category.brands[0].series[0])
    setIsMegaMenuOpen(true)
  }, [])

  // Close mega menu
  const closeMegaMenu = useCallback(() => {
    clearTimeout(timeoutRef.current)
    setIsMegaMenuOpen(false)
    setActiveCategory(null)
    setActiveBrand(null)
    setActiveSeries(null)
  }, [])

  // Handle category hover with debounce
  const handleCategoryHover = useCallback(
    debounce((category) => {
      if (window.innerWidth >= 1024) {
        openMegaMenu(category)
      }
    }, 100),
    [openMegaMenu]
  )

  // Handle brand and series hover
  const handleBrandHover = useCallback(
    (brand) => {
      if (window.innerWidth >= 1024) {
        setActiveBrand(brand)
        setActiveSeries(brand.series[0])
      }
    },
    []
  )

  const handleSeriesHover = useCallback(
    (series) => {
      if (window.innerWidth >= 1024) {
        setActiveSeries(series)
      }
    },
    []
  )

  // Handle clicks outside mega menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target) &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        closeMegaMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      clearTimeout(timeoutRef.current)
    }
  }, [closeMegaMenu])

  // Handle mouse leave with debounce
  const handleMouseLeave = useCallback(
    debounce(() => {
      if (window.innerWidth >= 1024) {
        closeMegaMenu()
      }
    }, 300),
    [closeMegaMenu]
  )

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

        {categoryData.slice(0, 6).map((category, index) => (
          <div
            key={index}
            className="relative category-menu-item group flex"
            onMouseEnter={() => handleCategoryHover(category)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-3 text-sm font-medium transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 ${
                activeCategory?.name === category.name ? "text-blue-600" : "text-gray-700"
              }`}
              onClick={() => {
                if (activeCategory?.name === category.name && isMegaMenuOpen) {
                  closeMegaMenu()
                } else {
                  openMegaMenu(category)
                }
              }}
              aria-expanded={activeCategory?.name === category.name && isMegaMenuOpen}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-7 h-7 object-contain rounded-md"
                />
              </div>
              <span className="mt-1">{category.name}</span>
              <ChevronDown
                className={`h-4 w-4 mt-1 transition-transform duration-200 ${
                  activeCategory?.name === category.name ? "rotate-180 text-blue-600" : "text-gray-500"
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
          <MegaMenu
            category={activeCategory}
            activeBrand={activeBrand}
            activeSeries={activeSeries}
            onBrandHover={handleBrandHover}
            onSeriesHover={handleSeriesHover}
            onClose={closeMegaMenu}
          />
        </div>
      )}
    </div>
  )
}