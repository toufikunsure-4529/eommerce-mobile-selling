// SeriesForm.jsx
"use client";

import { getSeries } from "@/lib/firestore/series/read_server";
import { createNewSeries, updateSeries } from "@/lib/firestore/series/write";
import { getCategories } from "@/lib/firestore/categories/read_server";
import { getBrandsByCategory } from "@/lib/firestore/brands/read_server";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";

export default function SeriesForm() {
  const [data, setData] = useState({ seriesName: "", categoryId: "", brandId: "" });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchSeries = useCallback(async () => {
    if (!id) return;
    setIsFetching(true);
    try {
      const res = await getSeries({ id });
      if (!res) {
        toast.error("Series not found!");
        router.push("/admin/series");
      } else {
        setData({
          seriesName: res.seriesName || "",
          categoryId: res.categoryId || "",
          brandId: res.brandId || "",
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch series");
    } finally {
      setIsFetching(false);
    }
  }, [id, router]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await getCategories();
      setCategories(res || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch categories");
    }
  }, []);

  const fetchBrands = useCallback(async (categoryId) => {
    if (!categoryId) {
      setBrands([]);
      return;
    }
    try {
      const res = await getBrandsByCategory({ categoryId });
      setBrands(res || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch brands");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchSeries();
    }
  }, [fetchCategories, fetchSeries, id]);

  useEffect(() => {
    if (data.categoryId) {
      fetchBrands(data.categoryId);
    } else {
      setBrands([]);
      setData((prev) => ({ ...prev, brandId: "" }));
    }
  }, [data.categoryId, fetchBrands]);

  const handleData = useCallback((key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!data.seriesName.trim()) {
      newErrors.seriesName = "Series name is required";
    }
    if (!data.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    if (!data.brandId) {
      newErrors.brandId = "Brand is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [data]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) {
        toast.error("Please fill all required fields");
        return;
      }

      setIsLoading(true);
      try {
        if (id) {
          await updateSeries({ id, data });
          toast.success("Series updated successfully");
          router.push("/admin/series");
        } else {
          await createNewSeries({ data });
          toast.success("Series created successfully");
          setData({ seriesName: "", categoryId: "", brandId: "" });
        }
      } catch (error) {
        toast.error(error.message || "Operation failed");
      } finally {
        setIsLoading(false);
      }
    },
    [id, data, validateForm, router]
  );

  const categoryOptions = useMemo(
    () => categories.map((category) => ({ value: category.id, label: category.name })),
    [categories]
  );

  const brandOptions = useMemo(
    () => brands.map((brand) => ({ value: brand.id, label: brand.name })),
    [brands]
  );

  return (
    <div className="flex flex-col gap-5 bg-white rounded-xl p-6 w-full max-w-md shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">
        {id ? "Update Series" : "Create Series"}
      </h1>
      {isFetching ? (
        <p className="text-gray-500">Loading series data...</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="series-name" className="text-sm text-gray-600 font-medium">
              Series Name <span className="text-red-500">*</span>
            </label>
            <input
              id="series-name"
              name="series-name"
              type="text"
              placeholder="Enter Series Name"
              value={data.seriesName}
              onChange={(e) => handleData("seriesName", e.target.value)}
              className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                errors.seriesName ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
              aria-invalid={!!errors.seriesName}
              aria-describedby={errors.seriesName ? "series-name-error" : undefined}
            />
            {errors.seriesName && (
              <p id="series-name-error" className="text-red-500 text-xs mt-1">
                {errors.seriesName}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-sm text-gray-600 font-medium">
              Category <span className="text-red-500">*</span>
            </label>
            <Select
              id="category"
              placeholder="Select Category"
              selectedKeys={data.categoryId ? [data.categoryId] : []}
              onChange={(e) => handleData("categoryId", e.target.value)}
              isDisabled={isLoading || !categoryOptions.length}
              aria-invalid={!!errors.categoryId}
              aria-describedby={errors.categoryId ? "category-error" : undefined}
              className={`${errors.categoryId ? "border-red-500" : "border-gray-300"}`}
            >
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            {errors.categoryId && (
              <p id="category-error" className="text-red-500 text-xs mt-1">
                {errors.categoryId}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="brand" className="text-sm text-gray-600 font-medium">
              Brand <span className="text-red-500">*</span>
            </label>
            <Select
              id="brand"
              placeholder="Select Brand"
              selectedKeys={data.brandId ? [data.brandId] : []}
              onChange={(e) => handleData("brandId", e.target.value)}
              isDisabled={isLoading || !brandOptions.length}
              aria-invalid={!!errors.brandId}
              aria-describedby={errors.brandId ? "brand-error" : undefined}
              className={`${errors.brandId ? "border-red-500" : "border-gray-300"}`}
            >
              {brandOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            {errors.brandId && (
              <p id="brand-error" className="text-red-500 text-xs mt-1">
                {errors.brandId}
              </p>
            )}
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            isDisabled={isLoading || isFetching}
            color="primary"
            className="mt-2"
          >
            {id ? "Update Series" : "Add New Series"}
          </Button>
        </form>
      )}
    </div>
  );
}