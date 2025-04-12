"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, ChevronDown } from "lucide-react"

export default function CategoryDropdown({ selectedCategory, setSelectedCategory, categories }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setIsOpen(false) // Close dropdown after selection
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
        className="flex items-center px-4 gap-2 rounded-l-full border-r border-gray-300 h-10 hover:bg-gray-50 transition-colors"
        aria-label="Select category"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Menu size={16} />
        <span className="text-sm whitespace-nowrap truncate max-w-[100px]">{selectedCategory}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 z-20 bg-white shadow-md w-52 rounded-md border border-gray-200 py-1 max-h-80 overflow-y-auto">
          <button
            onClick={() => handleCategorySelect("All Categories")}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
              selectedCategory === "All Categories" ? "bg-gray-50 font-medium" : ""
            }`}
          >
            All Categories
          </button>
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => handleCategorySelect(category)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                selectedCategory === category ? "bg-gray-50 font-medium" : ""
              }`}
              type="button" // Explicitly set button type
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}