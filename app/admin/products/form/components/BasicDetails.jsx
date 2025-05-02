"use client";

import { useBrands } from "@/lib/firestore/brands/read";
import { useCategories } from "@/lib/firestore/categories/read";
import { useSeriesByBrand } from "@/lib/firestore/series/read";
import { useModelsBySeries } from "@/lib/firestore/models/read";
import { useState, useEffect } from "react";

export default function BasicDetails({ data, handleData }) {
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();
  const [selectedBrand, setSelectedBrand] = useState(data?.brandId ?? "");
  const [selectedSeries, setSelectedSeries] = useState(data?.seriesId ?? "");

  const { data: series } = useSeriesByBrand(selectedBrand);
  const { data: models } = useModelsBySeries(selectedBrand, selectedSeries);

  useEffect(() => {
    setSelectedBrand(data?.brandId ?? "");
    setSelectedSeries(data?.seriesId ?? "");
  }, [data?.brandId, data?.seriesId]);

  useEffect(() => {
    if (selectedBrand && selectedBrand !== data?.brandId) {
      handleData("brandId", selectedBrand);
      handleData("seriesId", "");
      handleData("modelId", "");
      setSelectedSeries("");
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedSeries && selectedSeries !== data?.seriesId) {
      handleData("seriesId", selectedSeries);
      handleData("modelId", "");
    }
  }, [selectedSeries]);

  return (
    <section className="flex-1 flex flex-col gap-4 bg-white rounded-xl p-5 border shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800">Basic Details</h1>

      {/* Product Name */}
      <InputField
        label="Product Name"
        value={data?.title ?? ""}
        onChange={(e) => handleData("title", e.target.value)}
        required
      />

      {/* Short Description */}
      <InputField
        label="Short Description"
        value={data?.shortDescription ?? ""}
        onChange={(e) => handleData("shortDescription", e.target.value)}
        required
      />

      {/* Brand */}
      <SelectField
        label="Brand"
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        options={brands}
        required
      />

      {/* Series */}
      <SelectField
        label="Series"
        value={selectedSeries}
        onChange={(e) => setSelectedSeries(e.target.value)}
        options={series}
        required
        disabled={!selectedBrand}
      />

      {/* Model */}
      <SelectField
        label="Model"
        value={data?.modelId ?? ""}
        onChange={(e) => handleData("modelId", e.target.value)}
        options={models}
        required
        disabled={!selectedSeries}
      />

      {/* Category */}
      <SelectField
        label="Category"
        value={data?.categoryId ?? ""}
        onChange={(e) => handleData("categoryId", e.target.value)}
        options={categories}
        required
      />

      {/* Stock */}
      <InputField
        label="Stock"
        type="number"
        value={data?.stock ?? ""}
        onChange={(e) => handleData("stock", e.target.valueAsNumber)}
        required
      />

      {/* Price */}
      <InputField
        label="Price"
        type="number"
        value={data?.price ?? ""}
        onChange={(e) => handleData("price", e.target.valueAsNumber)}
        required
      />

      {/* Sale Price */}
      <InputField
        label="Sale Price"
        type="number"
        value={data?.salePrice ?? ""}
        onChange={(e) => handleData("salePrice", e.target.valueAsNumber)}
      />

      {/* Is Featured */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm font-medium">Featured Product</label>
        <select
          value={data?.isFeatured ? "yes" : "no"}
          onChange={(e) => handleData("isFeatured", e.target.value === "yes")}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
    </section>
  );
}

function InputField({ label, type = "text", value, onChange, required = false }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-500 text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border border-gray-300 px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options = [], required = false, disabled = false }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-500 text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="border border-gray-300 px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      >
        <option value="">Select {label}</option>
        {options?.map((item) => (
          <option key={item?.id} value={item?.id}>
            {item?.name || item?.seriesName}
          </option>
        ))}
      </select>
    </div>
  );
}
