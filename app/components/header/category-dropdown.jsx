"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, ChevronDown } from "lucide-react"

export default function CategoryDropdown({
  selectedCategory,
  setSelectedCategory,
  categories
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center md:px-4 px-2 gap-2 rounded-l-full border-r border-gray-300 h-10 hover:bg-gray-50 transition-colors focus:outline-none"
        aria-label="Select category"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Menu size={12} className="text-gray-600 hidden md:block" />
        <span className="md:text-sm text-xs whitespace-nowrap truncate max-w-[100px] text-gray-800">
          {selectedCategory}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform text-gray-500 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-1 z-20 bg-white shadow-lg w-56 rounded-md border border-gray-200 py-1 max-h-60 overflow-y-auto"
          role="listbox"
        >
          {categories.map((category, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCategorySelect(category)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100 ${
                selectedCategory === category
                  ? "bg-gray-100 font-medium text-gray-900"
                  : "text-gray-700"
              }`}
              role="option"
              aria-selected={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}