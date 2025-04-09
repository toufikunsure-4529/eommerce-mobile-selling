"use client"
import { useState, useEffect, useRef } from "react"
import { Input } from "@nextui-org/react"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"
import { ChevronDown, Menu, Search, User, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthContextProvider } from "@/context/AuthContext"
import HeaderClientButtons from "./HeaderClientBtn"
import toast from "react-hot-toast"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

const Header = () => {
  const router = useRouter()
  const searchRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Product data structure
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

  // Get all products for search
  const getAllProducts = () => {
    return productData.flatMap((category) =>
      category.products.map((product) => ({
        ...product,
        category: category.name,
      })),
    )
  }

  // Handle search
  const handleSearch = () => {
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

    setFilteredProducts(results)
  }

  // Trigger search when filters change
  useEffect(() => {
    handleSearch()
  }, [searchTerm, selectedCategory])

  // Handle key press (Enter key)
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
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
        setUsername(currentUser.displayName || currentUser.email?.split("@")[0] || "User")
      } else {
        setUser(null)
        setUsername("")
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    if (!confirm("Are you sure?")) return
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

  return (
    <>
      {/* Header */}
      <header className="flex flex-col z-[99] bg-white shadow-sm">
        {/* Top Row - Not Sticky */}
        <div className="flex items-center justify-between w-full px-4 py-4 md:px-6 lg:px-20 border-b border-gray-200">
          {/* Left Side - Hamburger & Logo */}
          <div>
            <Link href="/">
              <img src="/logo.png" alt="Mobile Display" className="h-14 w-auto" />
            </Link>
          </div>

          {/* Search Bar - Desktop Only */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-4 relative" ref={searchRef}>
            <div className="flex w-full py-1 items-center rounded-full border border-gray-300 overflow-hidden">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" className="flex items-center px-4 py-2 gap-2 rounded-none">
                    <Menu size={16} />
                    <span className="text-sm">{selectedCategory}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Categories" className="bg-white shadow-md w-52 rounded-md">
                  <DropdownItem key="all" onClick={() => setSelectedCategory("All Categories")} className="text-sm">
                    All Categories
                  </DropdownItem>
                  {productData.map((category, idx) => (
                    <DropdownItem key={idx} onClick={() => setSelectedCategory(category.name)} className="text-sm">
                      {category.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <Input
                placeholder="Search for Product"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                onFocus={() => setIsSearchFocused(true)}
                className="flex-1 rounded-none border-l border-gray-300"
                classNames={{
                  inputWrapper: "border-none shadow-none focus-within:ring-0 focus-within:border-none h-10",
                  input: "px-3 py-2 focus:outline-none text-sm",
                }}
              />

              <Button isIconOnly className="rounded-none bg-transparent" onClick={handleSearch}>
                <Search size={16} />
              </Button>
            </div>

            {/* Search Results */}
            {isSearchFocused && searchTerm && (
              <div className="absolute top-full left-0 right-0 z-[999] mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
                    {filteredProducts.map((product, index) => (
                      <li key={index}>
                        <Link
                          href={`/products/${product.slug}`}
                          className="block p-4 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsSearchFocused(false)}
                        >
                          <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{product.category}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No products found. Try a different search term.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side - User Controls */}
          <div className="flex items-center gap-2">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button variant="light" className="hidden md:flex items-center gap-2">
                  <User size={18} />
                  <span className="hidden md:inline">{user ? `Hi, ${username}` : "Login/Register"}</span>
                  <ChevronDown size={16} className="hidden md:block" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="bg-white shadow-md w-44">
                {!user ? (
                  <>
                    <DropdownItem>
                      <Link href="/login" className="block w-full">
                        Login
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/signup" className="block w-full">
                        Register
                      </Link>
                    </DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem onClick={closeMobileMenu}>
                      <Link href="/account" className="block text-gray-700 hover:text-blue-600 w-full">
                        Orders
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={closeMobileMenu}>
                      <Link href="/account/profile" className="block text-gray-700 hover:text-blue-600 w-full">
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>
            <AuthContextProvider>
              <HeaderClientButtons />
            </AuthContextProvider>
            <Button isIconOnly variant="light" onClick={toggleMobileMenu} className="lg:hidden">
              <Menu size={26} />
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile Only, Sticky */}
        <div className="px-4 py-3 border-b border-gray-200 lg:hidden sticky top-0 bg-white z-[99]">
          <div className="flex w-full items-center rounded-lg border border-gray-300 overflow-hidden">
            <Input
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() => setIsSearchFocused(true)}
              className="flex-1"
              classNames={{
                inputWrapper: "border-none shadow-none h-10",
                input: "px-3 py-3 focus:outline-none",
              }}
            />
            <Button isIconOnly className="rounded-none bg-transparent" onClick={handleSearch}>
              <Search size={16} />
            </Button>
          </div>

          {/* Mobile Search Results */}
          {isSearchFocused && searchTerm && (
            <div className="absolute left-0 right-0 z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto mx-4">
              {filteredProducts.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {filteredProducts.map((product, index) => (
                    <li key={index}>
                      <Link
                        href={`/products/${product.slug}`}
                        className="block p-4 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsSearchFocused(false)}
                      >
                        <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{product.category}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No products found. Try a different search term.
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mobile Offcanvas Menu */}
      <div
        className={`fixed inset-0 z-[1000] bg-black bg-opacity-50 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          ref={mobileMenuRef}
          className={`fixed left-0 top-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="font-bold text-lg">Menu</h3>
              <Button isIconOnly variant="light" onClick={closeMobileMenu}>
                <X size={24} />
              </Button>
            </div>

            {!user ? (
              <div className="flex flex-col gap-2">
                <Link href="/login">
                  <Button variant="light" className="w-full justify-start gap-3 py-3 text-left">
                    <User size={20} />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="light" className="w-full justify-start gap-3 py-3 text-left">
                    <User size={20} />
                    <span>Register</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <Button variant="light" className="w-full justify-start gap-3 py-4 text-left">
                <User size={20} />
                <span>Hi, {username}</span>
              </Button>
            )}

            <div className="pt-4 border-t border-gray-200">
              {user && (
                <>
                  <Button variant="light" className="w-full justify-start gap-3 py-3" onClick={closeMobileMenu}>
                    <span>
                      <Link href="/account">Orders</Link>
                    </span>
                  </Button>
                  <Button variant="light" className="w-full justify-start gap-3 py-3" onClick={closeMobileMenu}>
                    <span>
                      <Link href="/account/profile">Account</Link>
                    </span>
                  </Button>
                  <Button variant="light" className="w-full justify-start gap-3 py-3" onClick={handleLogout}>
                    <span>Logout</span>
                  </Button>
                </>
              )}
              <Button variant="light" className="w-full justify-start gap-3 py-3" onClick={closeMobileMenu}>
                <span>
                  <Link href="/contact">Support</Link>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
