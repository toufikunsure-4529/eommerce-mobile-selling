"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Menu, Search, X } from "lucide-react"
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

export default function Header() {
  // State management
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Refs
  const searchRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const inputRef = useRef(null)

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
          }))
        )
      )
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
    [searchTerm, selectedCategory, getAllProducts]
  )

  // Debounce search updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedCategory, handleSearch])

  // Handle clicks outside search and mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle search focus
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (!event.target.closest(".search-result-item")) {
          setIsSearchFocused(false)
          setFilteredProducts([])
        }
      }

      // Handle mobile menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false)
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
        loading: "Logging out...",
        success: "Successfully logged out",
        error: (e) => e?.message || "Logout failed",
      })
    } catch (error) {
      toast.error(error?.message || "Logout failed")
    }
  }

  // Mobile menu functions
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  // Handle search result click
  const handleSearchResultClick = () => {
    setIsSearchFocused(false)
    setSearchTerm("")
    setFilteredProducts([])
    closeMobileMenu()
  }

  const cartCount = user?.carts?.length || 0
  const wishlistCount = user?.favorites?.length || 0

  return (
    <>
      <header className="flex flex-col z-[999] bg-white shadow-sm sticky top-0">
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
              className="flex w-full items-center rounded-full border border-gray-300  transition-all"
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
                className="p-2 h-10 rounded-none bg-transparent hover:bg-gray-100 transition-colors"
                aria-label="Submit search"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Show search results or "Not Found" when search is focused and term exists */}
            {isSearchFocused && searchTerm.trim() && (
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
            className="flex w-full items-center rounded-lg border border-gray-300 transition-all"
          >
            <CategoryDropdown
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categoryData.map((cat) => cat.name)}
            />

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
              className="p-2 h-10 bg-transparent hover:bg-gray-100 transition-colors"
              aria-label="Submit search"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Show search results or "Not Found" when search is focused and term exists */}
          {isSearchFocused && searchTerm.trim() && (
            <SearchResults filteredProducts={filteredProducts} handleSearchResultClick={handleSearchResultClick} />
          )}
        </div>
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