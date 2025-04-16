"use client";

import { useBrands } from "@/lib/firestore/brands/read";
// import { createNewModel } from "@/lib/firestore/models/write";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ModelForm() {
  const [formData, setFormData] = useState({
    name: "",
    brandId: "",
    seriesId: "",
  });
  const [image, setImage] = useState(null);
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: brands, isLoading: isBrandsLoading } = useBrands();
  const router = useRouter();

  // Fetch series when brand is selected
  useEffect(() => {
    if (formData.brandId) {
      fetchSeries();
    } else {
      setSeries([]);
      setFormData((prev) => ({ ...prev, seriesId: "" }));
    }
  }, [formData.brandId]);

  async function fetchSeries() {
    try {
      // Replace with your actual series API endpoint
      const response = await fetch(`/api/series?brandId=${formData.brandId}`);
      const data = await response.json();
      setSeries(data.series || []);
    } catch (error) {
      toast.error("Failed to fetch series");
      setSeries([]);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.brandId || !formData.seriesId || !image) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await createNewModel({
        data: {
          name: formData.name,
          brandId: formData.brandId,
          seriesId: formData.seriesId,
        },
        image,
      });
      toast.success("Model created successfully");
      setFormData({ name: "", brandId: "", seriesId: "" });
      setImage(null);
      router.push("/admin/models");
    } catch (error) {
      toast.error(error.message || "Failed to create model");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Create Model</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Model Name Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-gray-600">
            Model Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter model name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full"
            required
          />
        </div>

        {/* Brand Selection */}
        <div className="flex flex-col gap-2">
          <label htmlFor="brandId" className="text-sm text-gray-600">
            Brand <span className="text-red-500">*</span>
          </label>
          <Select
            id="brandId"
            name="brandId"
            placeholder="Select a brand"
            isLoading={isBrandsLoading}
            value={formData.brandId}
            onChange={handleInputChange}
            className="w-full"
            required
          >
            {brands?.map((brand) => (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Series Selection */}
        <div className="flex flex-col gap-2">
          <label htmlFor="seriesId" className="text-sm text-gray-600">
            Series <span className="text-red-500">*</span>
          </label>
          <Select
            id="seriesId"
            name="seriesId"
            placeholder="Select a series"
            isDisabled={!formData.brandId || series.length === 0}
            value={formData.seriesId}
            onChange={handleInputChange}
            className="w-full"
            required
          >
            {series.map((seriesItem) => (
              <SelectItem key={seriesItem.id} value={seriesItem.id}>
                {seriesItem.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-sm text-gray-600">
            Model Image <span className="text-red-500">*</span>
          </label>
          {image && (
            <div className="flex justify-center p-3">
              <img
                className="h-20 object-cover"
                src={URL.createObjectURL(image)}
                alt="Preview"
              />
            </div>
          )}
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border px-4 py-2 rounded-lg w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Create Model
        </Button>
      </form>
    </div>
  );
}