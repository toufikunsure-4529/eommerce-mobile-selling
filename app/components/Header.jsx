"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"
import { ChevronDown, Menu, Search, User, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthContextProvider } from "@/context/AuthContext"
import HeaderClientButtons from "./HeaderClientBtn"
import toast from "react-hot-toast"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

const productData = [
  {
    name: "All Phones",
    products: [
      { name: "iPhone 15 Pro Max", slug: "iphone-15-pro-max" },
      { name: "Samsung Galaxy S23 Ultra", slug: "samsung-galaxy-s23-ultra" },
      { name: "Google Pixel 8 Pro", slug: "google-pixel-8-pro" },
    ],
  },
  {
    name: "Displays",
    products: [
      { name: "iPhone 14 Display", slug: "iphone-14-display" },
      { name: "Samsung S22 Display", slug: "samsung-s22-display" },
      { name: "OnePlus 10 Pro Display", slug: "oneplus-10-pro-display" },
    ],
  },
  {
    name: "Chargers",
    products: [
      { name: "20W Fast Charger", slug: "20w-fast-charger" },
      { name: "45W Super Fast Charger", slug: "45w-super-fast-charger" },
      { name: "Wireless Charger Pad", slug: "wireless-charger-pad" },
    ],
  },
  {
    name: "Cables",
    products: [
      { name: "USB-C Cable", slug: "usb-c-cable" },
      { name: "Lightning Cable", slug: "lightning-cable" },
      { name: "Braided USB Cable", slug: "braided-usb-cable" },
    ],
  },
  {
    name: "Accessories",
    products: [
      { name: "Phone Case", slug: "phone-case" },
      { name: "Screen Protector", slug: "screen-protector" },
      { name: "Pop Socket", slug: "pop-socket" },
    ],
  },
]

const Header = () => {
  const router = useRouter()
  const searchRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const inputRef = useRef(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const getAllProducts = useCallback(() => {
    return productData.flatMap((category) =>
      category.products.map((product) => ({
        ...product,
        category: category.name,
      }))
    )
  }, [])

  const handleSearch = useCallback(
    (e) => {
      e?.preventDefault()
      if (!searchTerm.trim()) {
        setFilteredProducts([])
        return
      }

      const allProducts = getAllProducts()
      const results = allProducts.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
        const matchesCategory =
          selectedCategory === "All Categories" || product.category === selectedCategory
        return matchesSearch && matchesCategory
      })

      setFilteredProducts(results)
    },
    [searchTerm, selectedCategory, getAllProducts]
  )

  useEffect(() => {
    handleSearch()
  }, [searchTerm, selectedCategory, handleSearch])

  useEffect(() => {
    const handleClickOutside = (event) => {
      // For search results
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Only close if we're not clicking on a search result item
        if (!event.target.closest('.search-result-item')) {
          setIsSearchFocused(false)
        }
      }
      
      // For mobile menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('.mobile-menu-button')
      ) {
        closeMobileMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setUsername(
          currentUser.displayName || currentUser.email?.split("@")[0] || "User"
        )
      } else {
        setUser(null)
        setUsername("")
      }
    })
    return () => unsubscribe()
  }, [])

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

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const handleSearchResultClick = () => {
    setIsSearchFocused(false)
    setSearchTerm("")
    setFilteredProducts([])
    closeMobileMenu()
  }

  return (
    <>
      <header className="flex flex-col z-[99] bg-white shadow-sm sticky top-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between w-full px-4 py-4 md:px-6 lg:px-8 xl:px-20 border-b border-gray-200">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Home">
              <img
                src="/logo.png"
                alt="Mobile Display"
                className="h-10 w-auto md:h-12"
                width={120}
                height={48}
              />
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-4 relative" ref={searchRef}>
            <form
              onSubmit={handleSearch}
              className="flex w-full py-1 items-center rounded-full border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all"
            >
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    className="flex items-center px-4 py-2 gap-2 rounded-none border-r border-gray-300 h-full"
                    aria-label="Select category"
                  >
                    <Menu size={16} />
                    <span className="text-sm whitespace-nowrap truncate max-w-[100px]">
                      {selectedCategory}
                    </span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Categories"
                  className="bg-white shadow-md w-52 rounded-md"
                >
                  <DropdownItem
                    key="all"
                    onClick={() => setSelectedCategory("All Categories")}
                    className="text-sm hover:bg-gray-100"
                  >
                    All Categories
                  </DropdownItem>
                  {productData.map((category, idx) => (
                    <DropdownItem
                      key={idx}
                      onClick={() => setSelectedCategory(category.name)}
                      className="text-sm hover:bg-gray-100"
                    >
                      {category.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <input
                type="text"
                ref={inputRef}
                placeholder="Search for Product"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="flex-1 px-4 py-2 focus:outline-none text-sm"
                aria-label="Search products"
              />

              <button
                type="submit"
                onClick={handleSearch}
                className="p-2 rounded-none bg-transparent hover:bg-gray-100 transition-colors"
                aria-label="Submit search"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Search Results */}
            {isSearchFocused && searchTerm && filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-[999] mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                <ul className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <li key={product.slug} className="search-result-item">
                      <Link
                        href={`/products/${product.slug}`}
                        className="block p-3 hover:bg-gray-50 transition-colors"
                        onClick={handleSearchResultClick}
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {product.category}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button
                  className="hidden md:flex items-center gap-2 hover:text-blue-600 transition-colors"
                  aria-label="User menu"
                >
                  <User size={18} />
                  <span className="hidden md:inline whitespace-nowrap">
                    {user ? `Hi, ${username}` : "Login/Register"}
                  </span>
                  <ChevronDown size={16} className="hidden md:block" />
                </button>
              </DropdownTrigger>
              <DropdownMenu className="bg-white shadow-md w-44 rounded-md">
                {!user ? (
                  <>
                    <DropdownItem key="login" className="hover:bg-gray-100">
                      <Link href="/login" className="block w-full py-2">
                        Login
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="register" className="hover:bg-gray-100">
                      <Link href="/signup" className="block w-full py-2">
                        Register
                      </Link>
                    </DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem key="orders" className="hover:bg-gray-100">
                      <Link
                        href="/orders"
                        className="block w-full py-2"
                        onClick={closeMobileMenu}
                      >
                        Orders
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="profile" className="hover:bg-gray-100">
                      <Link
                        href="/account/profile"
                        className="block w-full py-2"
                        onClick={closeMobileMenu}
                      >
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      className="text-red-600 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>

            <AuthContextProvider>
              <HeaderClientButtons />
            </AuthContextProvider>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden mobile-menu-button p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div
          className="px-4 py-3 border-b border-gray-200 lg:hidden bg-white"
          ref={searchRef}
        >
          <form
            onSubmit={handleSearch}
            className="flex w-full items-center rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all"
          >
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="flex-1 px-4 py-2 focus:outline-none text-sm"
              aria-label="Search products"
            />
            <button
              type="submit"
              onClick={handleSearch}
              className="p-2 bg-transparent hover:bg-gray-100 transition-colors"
              aria-label="Submit search"
            >
              <Search size={20} />
            </button>
          </form>

          {isSearchFocused && searchTerm && (
            <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                <ul>
                  {filteredProducts.map((product) => (
                    <li key={product.slug} className="search-result-item">
                      <Link
                        href={`/products/${product.slug}`}
                        className="block p-3 hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          handleSearchResultClick()
                          closeMobileMenu()
                        }}
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {product.category}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[1000] bg-black bg-opacity-50 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          ref={mobileMenuRef}
          className={`fixed left-0 top-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 flex flex-col h-full overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="font-bold text-lg">Menu</h3>
              <button
                onClick={closeMobileMenu}
                className="p-1"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1">
              {!user ? (
                <div className="space-y-1">
                  <Link
                    href="/login"
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <User size={20} /> Login
                  </Link>
                  <Link
                    href="/signup"
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <User size={20} /> Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 p-3 font-medium">
                    <User size={20} /> Hi, {username}
                  </div>
                  <Link
                    href="/orders"
                    className="block p-3 hover:bg-gray-100 rounded transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Orders
                  </Link>
                  <Link
                    href="/account/profile"
                    className="block p-3 hover:bg-gray-100 rounded transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left p-3 hover:bg-gray-100 rounded transition-colors text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200 space-y-1">
                <Link
                  href="/contact"
                  className="block p-3 hover:bg-gray-100 rounded transition-colors"
                  onClick={closeMobileMenu}
                >
                  Support
                </Link>
                <Link
                  href="/category"
                  className="block p-3 hover:bg-gray-100 rounded transition-colors"
                  onClick={closeMobileMenu}
                >
                  All Categories
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header