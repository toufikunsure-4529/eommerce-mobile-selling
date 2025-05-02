"use client";

import { getBrands } from "@/lib/firestore/brands/read_server";
import { createNewSeries } from "@/lib/firestore/series/write";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiX } from "react-icons/fi";

export default function SeriesForm() {
  const [brandId, setBrandId] = useState("");
  const [seriesInput, setSeriesInput] = useState("");
  const [seriesList, setSeriesList] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const fetchBrands = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await getBrands();
      setBrands(res || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch brands");
      setBrands([]);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleAddSeries = useCallback(() => {
    if (!seriesInput.trim()) {
      setErrors({ seriesInput: "Series name is required" });
      return;
    }
    if (!brandId) {
      setErrors({ brandId: "Please select a brand first" });
      return;
    }
    
    setSeriesList(prev => [...prev, seriesInput.trim()]);
    setSeriesInput("");
    setErrors({});
  }, [seriesInput, brandId]);

  const handleRemoveSeries = useCallback((index) => {
    setSeriesList(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      
      if (!brandId) {
        setErrors({ brandId: "Brand is required" });
        toast.error("Please select a brand");
        return;
      }
      
      if (seriesList.length === 0) {
        setErrors({ seriesInput: "Please add at least one series" });
        toast.error("Please add at least one series");
        return;
      }

      setIsLoading(true);
      try {
        const promises = seriesList.map(seriesName => 
          createNewSeries({ 
            data: { 
              seriesName, 
              brandId,
              categoryId: ""
            } 
          })
        );
        
        await Promise.all(promises);
        toast.success(`${seriesList.length} series added successfully`);
        setSeriesList([]);
        setBrandId("");
        router.push("/admin/series");
      } catch (error) {
        toast.error(error.message || "Failed to add series");
      } finally {
        setIsLoading(false);
      }
    },
    [brandId, seriesList, router]
  );

  const brandOptions = useMemo(
    () => brands.map((brand) => ({ value: brand.id, label: brand.name })),
    [brands]
  );

  return (
    <div className="flex flex-col gap-6 bg-white rounded-2xl p-8 w-full max-w-lg shadow-lg h-full">
      <h1 className="text-2xl font-bold text-gray-900">Add New Series</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="brand" className="text-sm font-medium text-gray-700">
            Brand <span className="text-red-500">*</span>
          </label>
          <select
            id="brand"
            value={brandId}
            onChange={(e) => {
              setBrandId(e.target.value);
              setErrors(prev => ({ ...prev, brandId: "" }));
            }}
            disabled={isLoading || isFetching}
            className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.brandId ? "border-red-500" : "border-gray-300"
            } disabled:bg-gray-100 disabled:cursor-not-allowed`}
          >
            <option value="">Select Brand</option>
            {brandOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.brandId && (
            <p id="brand-error" className="text-red-500 text-xs mt-1">
              {errors.brandId}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="series-input" className="text-sm font-medium text-gray-700">
            Series Name <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <input
              id="series-input"
              type="text"
              placeholder="Enter Series Name"
              value={seriesInput}
              onChange={(e) => setSeriesInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSeries())}
              className={`flex-1 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.seriesInput ? "border-red-500" : "border-gray-300"
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
              disabled={isLoading || !brandId}
            />
            <button
              type="button"
              onClick={handleAddSeries}
              disabled={isLoading || !brandId}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <FiPlus size={18} />
            </button>
          </div>
          {errors.seriesInput && (
            <p id="series-input-error" className="text-red-500 text-xs mt-1">
              {errors.seriesInput}
            </p>
          )}
        </div>

        {seriesList.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Added Series ({seriesList.length})
            </h3>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {seriesList.map((series, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <span className="text-gray-800">{series}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSeries(index)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || isFetching || seriesList.length === 0}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Adding..." : "Add Series"}
        </button>
      </form>
    </div>
  );
}