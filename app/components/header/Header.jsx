"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronDown, Layers, Menu, Search, X } from "lucide-react"
import Link from "next/link"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { toast } from "react-hot-toast"
import { categoryData } from "./category-data"
import { AuthContextProvider } from "@/context/AuthContext"
import HeaderClientButtons from "./header-client-buttons"
import UserDropdown from "./user-dropdown"
import MobileMenu from "./mobile-menu"
import SearchResults from "./search-results"
import CategoryDropdown from "./category-dropdown"
import MegaMenu from "./mega-menu"

export default function Header() {
  // State management
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeBrand, setActiveBrand] = useState(null)
  const [activeSeries, setActiveSeries] = useState(null)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)

  // Refs
  const searchRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const inputRef = useRef(null)
  const megaMenuRef = useRef(null)

  // Get all products from categories for search
  const getAllProducts = useCallback(() => {
    return categoryData.flatMap((category) =>
      category.brands.flatMap((brand) =>
        brand.series.flatMap((series) =>
          series.models.map((model) => ({
            name: model,
            category: category.name,
            brand: brand.name,
            series: series.name,
            slug: model.toLowerCase().replace(/\s+/g, "-"),
          })),
        ),
      ),
    )
  }, [])

  // Handle search functionality
  const handleSearch = useCallback(
    (e) => {
      e?.preventDefault()
      if (!searchTerm.trim()) {
        setFilteredProducts([])
        return
      }

      const allProducts = getAllProducts()
      const results = allProducts.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
        const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
        return matchesSearch && matchesCategory
      })

      setFilteredProducts(results.slice(0, 10))
    },
    [searchTerm, selectedCategory, getAllProducts],
  )

  // Update search results when search term or category changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedCategory, handleSearch])

  // Handle clicks outside search and mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (!event.target.closest(".search-result-item")) {
          setIsSearchFocused(false)
        }
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-button")
      ) {
        closeMobileMenu()
      }

      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target) &&
        !event.target.closest(".category-menu-item")
      ) {
        closeMegaMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setUsername(currentUser.displayName || currentUser.email?.split("@")[0] || "User")
      } else {
        setUser(null)
        setUsername("")
      }
    })

    return () => unsubscribe()
  }, [])

  // Handle user logout
  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) return
    try {
      await toast.promise(signOut(auth), {
        error: (e) => e?.message,
        loading: "Logging out...",
        success: "Successfully logged out",
      })
    } catch (error) {
      toast.error(error?.message || "Logout failed")
    }
  }

  // Mobile menu functions
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  // Mega menu functions
  const openMegaMenu = (category) => {
    setActiveCategory(category)
    setIsMegaMenuOpen(true)
  }

  const closeMegaMenu = () => {
    setIsMegaMenuOpen(false)
    setActiveCategory(null)
    setActiveBrand(null)
    setActiveSeries(null)
  }

  // Handle search result click
  const handleSearchResultClick = () => {
    setIsSearchFocused(false)
    setSearchTerm("")
    setFilteredProducts([])
    closeMobileMenu()
  }

  // Handle category hover/click
  const handleCategoryHover = (category) => {
    if (window.innerWidth >= 1024) {
      setActiveCategory(category)
      setActiveBrand(category.brands[0])
      setActiveSeries(category.brands[0].series[0])
      setIsMegaMenuOpen(true)
    }
  }

  const handleBrandHover = (brand) => {
    if (window.innerWidth >= 1024) {
      setActiveBrand(brand)
      setActiveSeries(brand.series[0])
    }
  }

  const handleSeriesHover = (series) => {
    if (window.innerWidth >= 1024) {
      setActiveSeries(series)
    }
  }

  const cartCount = user?.carts?.length || 0
  const wishlistCount = user?.favorites?.length || 0

  return (
    <>
      <header className="flex flex-col z-[999] bg-white shadow-sm sticky  top-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between w-full px-4 py-4 md:px-6 lg:px-8 xl:px-20 border-b border-gray-200">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Mobile Display - Home">
              <img src="/logo.png" alt="Mobile Display" className="h-10 w-auto md:h-12" width={120} height={48} />
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-4 relative" ref={searchRef}>
            <form
              onSubmit={handleSearch}
              className="flex w-full items-center rounded-full border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all"
            >
              <CategoryDropdown
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categoryData.map((cat) => cat.name)}
              />

              <input
                type="text"
                ref={inputRef}
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="flex-1 px-4 py-2 focus:outline-none text-sm h-10"
                aria-label="Search products"
              />

              <button
                type="submit"
                onClick={handleSearch}
                className="p-2 h-10 rounded-none bg-transparent hover:bg-gray-100 transition-colors"
                aria-label="Submit search"
              >
                <Search size={18} />
              </button>
            </form>

            {isSearchFocused && searchTerm && (
              <SearchResults filteredProducts={filteredProducts} handleSearchResultClick={handleSearchResultClick} />
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <AuthContextProvider>
              <HeaderClientButtons />
            </AuthContextProvider>

            <UserDropdown
              user={user}
              username={username}
              handleLogout={handleLogout}
              closeMobileMenu={closeMobileMenu}
            />

            <button onClick={toggleMobileMenu} className="md:hidden mobile-menu-button p-1" aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 py-3 border-b border-gray-200 lg:hidden bg-white" ref={searchRef}>
          <form
            onSubmit={handleSearch}
            className="flex w-full items-center rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all"
          >
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="flex-1 px-4 py-2 focus:outline-none text-sm h-10"
              aria-label="Search products"
            />
            <button
              type="submit"
              onClick={handleSearch}
              className="p-2 h-10 bg-transparent hover:bg-gray-100 transition-colors"
              aria-label="Submit search"
            >
              <Search size={20} />
            </button>
          </form>

          {isSearchFocused && searchTerm && (
            <SearchResults filteredProducts={filteredProducts} handleSearchResultClick={handleSearchResultClick} />
          )}
        </div>

        {/* Categories Navigation - Desktop */}
        {/* Categories Navigation - Desktop */}
        <nav className="hidden lg:flex items-center justify-between px-4 md:px-6 lg:px-8 xl:px-20 py-2 border-b border-gray-200">
          <Link
            href="/categories"
            className="flex items-center px-4 gap-2 text-sm font-medium py-3 text-white rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 mr-4 transition-all duration-200"
          >
            <Layers size={16} /> {/* Replaced Menu with Layers icon */}
            Browse Categories
          </Link>
          {categoryData.slice(0, 11).map((category, index) => ( // Limited to 15 categories
            <div
              key={index}
              className="relative category-menu-item group"
              onMouseEnter={() => handleCategoryHover(category)}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 ${activeCategory?.name === category.name ? "text-blue-600 bg-blue-50" : ""
                  }`}
                onClick={() => openMegaMenu(category)}
                aria-expanded={activeCategory?.name === category.name && isMegaMenuOpen}
              >
                {category.name}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 text-gray-500 ${activeCategory?.name === category.name ? "rotate-180" : ""
                    } group-hover:rotate-180 group-hover:text-blue-600`}
                />
              </button>
            </div>
          ))}
        </nav>

        {/* Mega Menu */}
        {isMegaMenuOpen && activeCategory && (
          <div
            ref={megaMenuRef}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40 hidden lg:block"
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
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        mobileMenuRef={mobileMenuRef}
        closeMobileMenu={closeMobileMenu}
        user={user}
        username={username}
        handleLogout={handleLogout}
        categories={categoryData}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
    </>
  )
}