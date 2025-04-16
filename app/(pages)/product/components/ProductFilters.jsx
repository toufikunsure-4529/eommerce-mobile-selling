"use client";
import React from 'react';

const ProductFilters = ({ onFilterChange }) => {
  const categories = [
    { name: 'Battery Tray', count: 12 },
    { name: 'Charging Board', count: 23 },
    { name: 'Mobile Display', count: 67 },
    { name: 'Screen Protector', count: 12 },
  ];

  const brands = [
    { name: 'Apple', count: 18 },
    { name: 'Poco', count: 12 },
    { name: 'Real me', count: 23 },
    { name: 'Oppo', count: 67 },
    { name: 'Xiaomi', count: 34 },
  ];

  return (
    <div className="w-full md:w-64 p-4 bg-white shadow-lg rounded-lg sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button className="text-blue-500 text-sm hover:underline">Clear All</button>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-2">Category</h3>
          {categories.map((category) => (
            <div key={category.name} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={category.name}
                onChange={(e) => onFilterChange('category', e.target.checked ? category.name : '')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={category.name} className="ml-2 text-sm text-gray-700">
                {category.name} ({category.count})
              </label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-md font-medium mb-2">Brand</h3>
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={brand.name}
                onChange={(e) => onFilterChange('brand', e.target.checked ? brand.name : '')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={brand.name} className="ml-2 text-sm text-gray-700">
                {brand.name} ({brand.count})
              </label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-md font-medium mb-2">Price</h3>
          <input
            type="range"
            min="0"
            max="200"
            onChange={(e) => onFilterChange('price', e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>₹0</span>
            <span>₹200</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;