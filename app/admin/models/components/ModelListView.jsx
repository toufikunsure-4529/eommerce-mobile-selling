"use client";

import { useBrands } from "@/lib/firestore/brands/read";
import { useSeriesByBrand } from "@/lib/firestore/series/read";
import { useModelsBySeries } from "@/lib/firestore/models/read";
import { deleteModel } from "@/lib/firestore/models/write";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

export default function ModelListView() {
  const [brandId, setBrandId] = useState("");
  const [seriesId, setSeriesId] = useState("");

  const { data: brands, isLoading: isBrandsLoading } = useBrands();
  const { data: series, isLoading: isSeriesLoading } = useSeriesByBrand(brandId);
  const { data: models, isLoading: isModelsLoading } = useModelsBySeries(brandId, seriesId);
  const router = useRouter();

  const handleBrandChange = useCallback((e) => {
    setBrandId(e.target.value);
    setSeriesId("");
  }, []);

  const handleSeriesChange = useCallback((e) => {
    setSeriesId(e.target.value);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-6 px-4 md:px-0 md:pr-5">
      <h1 className="text-2xl font-bold">Models</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <label htmlFor="brandId" className="block text-sm font-medium text-gray-700 mb-1">
            Select Brand
          </label>
          <select
            id="brandId"
            value={brandId}
            onChange={handleBrandChange}
            disabled={isBrandsLoading}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Brand --</option>
            {brands?.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/2">
          <label htmlFor="seriesId" className="block text-sm font-medium text-gray-700 mb-1">
            Select Series
          </label>
          <select
            id="seriesId"
            value={seriesId}
            onChange={handleSeriesChange}
            disabled={!brandId || isSeriesLoading || series?.length === 0}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Series --</option>
            {series?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.seriesName}
              </option>
            ))}
          </select>
          {isSeriesLoading && <p className="text-sm text-gray-500 mt-1">Loading series...</p>}
          {brandId && !isSeriesLoading && series?.length === 0 && (
            <p className="text-sm text-gray-500 mt-1">No series available</p>
          )}
        </div>
      </div>

      {/* Models Table */}
      {isModelsLoading ? (
        <div className="flex flex-col items-center gap-2">
          <span className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></span>
          <h3 className="text-sm">Loading models...</h3>
        </div>
      ) : models?.length === 0 && brandId && seriesId ? (
        <p className="text-gray-500">No models found for the selected filters.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="bg-white border px-3 py-2 rounded-l-lg text-sm text-center">SN</th>
                <th className="bg-white border px-3 py-2 text-sm text-center">Image</th>
                <th className="bg-white border px-3 py-2 text-sm text-left">Name</th>
                <th className="bg-white border px-3 py-2 rounded-r-lg text-sm text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {models?.map((item, index) => (
                <Row key={item.id} item={item} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = useCallback(async () => {
    if (!confirm("Are you sure you want to delete this model?")) return;
    setIsDeleting(true);
    try {
      await deleteModel({ id: item.id });
      toast.success("Model deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete model");
    } finally {
      setIsDeleting(false);
    }
  }, [item.id]);

  const handleUpdate = useCallback(() => {
    router.push(`/admin/models?id=${item.id}`);
  }, [item.id, router]);

  return (
    <tr className="bg-white shadow rounded-lg">
      <td className="border px-3 py-2 text-center">{index + 1}</td>
      <td className="border px-3 py-2 text-center">
        <img className="h-7 w-auto object-contain mx-auto" src={item.imageURL} alt={item.name} />
      </td>
      <td className="border px-3 py-2">{item.name}</td>
      <td className="border px-3 py-2">
        <div className="flex justify-center gap-2">
          <button
            onClick={handleUpdate}
            disabled={isDeleting}
            className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 transition"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition"
          >
            {isDeleting ? (
              <span className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin inline-block"></span>
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}
