"use client"
import { X } from "lucide-react"

const SortMenu = ({ isOpen, onClose, onSortChange, currentSort }) => {
    const sortOptions = [
        { id: "popularity", label: "Popularity" },
        { id: "priceLowToHigh", label: "Price: Low to High" },
        { id: "priceHighToLow", label: "Price: High to Low" },
        { id: "newest", label: "Newest First" },
        { id: "rating", label: "Rating" },
    ]

    return (
        isOpen && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col justify-end">
                <div className="bg-white rounded-t-xl p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Sort By</h2>
                        <button onClick={onClose} className="text-gray-500">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {sortOptions.map((option) => (
                            <div
                                key={option.id}
                                className={`p-3 rounded-md ${currentSort === option.id ? "bg-blue-50 border border-blue-200" : ""}`}
                                onClick={() => {
                                    onSortChange(option.id)
                                    onClose()
                                }}
                            >
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={currentSort === option.id}
                                        onChange={() => { }}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2">{option.label}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    )
}

export default SortMenu
