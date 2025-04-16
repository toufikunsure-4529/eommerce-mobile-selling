"use client";

// import { useBrands } from "@/lib/firestore/brands/read";
// import { deleteModel } from "@/lib/firestore/models/write";
import { Button, CircularProgress, Select, SelectItem } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ModelListView() {
  const [brandId, setBrandId] = useState("");
  const [seriesId, setSeriesId] = useState("");
  const [series, setSeries] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [isBrandsLoading , setIsBrandsLoading ] = useState(false);
  const [brands  , setBrand ] = useState([]);
  // const { data: brands, isLoading: isBrandsLoading } = useBrands();
  const router = useRouter();

  // Fetch series when brand is selected
  useEffect(() => {
    if (brandId) {
      fetchSeries();
    } else {
      setSeries([]);
      setSeriesId("");
      setModels([]);
    }
  }, [brandId]);

  // Fetch models when series is selected
  useEffect(() => {
    if (brandId && seriesId) {
      fetchModels();
    } else {
      setModels([]);
    }
  }, [brandId, seriesId]);

  async function fetchSeries() {
    try {
      const response = await fetch(`/api/series?brandId=${brandId}`);
      const data = await response.json();
      setSeries(data.series || []);
    } catch (error) {
      toast.error("Failed to fetch series");
      setSeries([]);
    }
  }

  async function fetchModels() {
    setIsLoadingModels(true);
    try {
      const response = await fetch(
        `/api/models?brandId=${brandId}&seriesId=${seriesId}`
      );
      const data = await response.json();
      setModels(data.models || []);
    } catch (error) {
      toast.error("Failed to fetch models");
      setModels([]);
    } finally {
      setIsLoadingModels(false);
    }
  }

  function handleBrandChange(e) {
    setBrandId(e.target.value);
    setSeriesId("");
  }

  function handleSeriesChange(e) {
    setSeriesId(e.target.value);
  }

  if (isBrandsLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <CircularProgress />
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4 md:pr-5 md:px-0 px-5 rounded-xl">
      <h1 className="text-2xl font-semibold">Models</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <label htmlFor="brandId" className="text-sm text-gray-600">
            Select Brand
          </label>
          <Select
            id="brandId"
            placeholder="Select a brand"
            isLoading={isBrandsLoading}
            value={brandId}
            onChange={handleBrandChange}
            className="w-full"
          >
            {brands?.map((brand) => (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <label htmlFor="seriesId" className="text-sm text-gray-600">
            Select Series
          </label>
          <Select
            id="seriesId"
            placeholder="Select a series"
            isDisabled={!brandId || series.length === 0}
            value={seriesId}
            onChange={handleSeriesChange}
            className="w-full"
          >
            {series.map((seriesItem) => (
              <SelectItem key={seriesItem.id} value={seriesItem.id}>
                {seriesItem.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Models Table */}
      {isLoadingModels ? (
        <div className="flex flex-col items-center gap-2">
          <CircularProgress />
          <h3>Loading models...</h3>
        </div>
      ) : models.length === 0 && brandId && seriesId ? (
        <p className="text-gray-500">No models found for the selected filters.</p>
      ) : (
        <table className="border-separate border-spacing-y-3 w-full">
          <thead>
            <tr>
              <th className="font-semibold border-y bg-white px-3 py-2 border-l rounded-l-lg text-center">
                SN
              </th>
              <th className="font-semibold border-y bg-white px-3 py-2 text-center">
                Image
              </th>
              <th className="font-semibold border-y bg-white px-3 py-2 text-left">
                Name
              </th>
              <th className="font-semibold border-y bg-white px-3 py-2 border-r rounded-r-lg text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {models.map((item, index) => (
              <Row key={item.id} item={item} index={index} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this model?")) return;

    setIsDeleting(true);
    try {
      // await deleteModel({ id: item.id });
      toast.success("Model deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete model");
    } finally {
      setIsDeleting(false);
    }
  }

  function handleUpdate() {
    router.push(`/admin/models?id=${item.id}`);
  }

  return (
    <tr>
      <td className="border-y bg-white px-3 py-2 border-l rounded-l-lg text-center">
        {index + 1}
      </td>
      <td className="border-y bg-white px-3 py-2 text-center">
        <div className="flex justify-center">
          <img
            className="h-7 object-cover"
            src={item.imageURL}
            alt={item.name}
          />
        </div>
      </td>
      <td className="border-y bg-white px-3 py-2">{item.name}</td>
      <td className="border-y bg-white px-3 py-2 border-r rounded-r-lg">
        <div className="flex gap-2 items-center justify-center">
          <Button
            onClick={handleUpdate}
            isDisabled={isDeleting}
            isIconOnly
            size="sm"
            className="bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <Edit2 size={13} />
          </Button>
          <Button
            onClick={handleDelete}
            isLoading={isDeleting}
            isDisabled={isDeleting}
            isIconOnly
            size="sm"
            color="danger"
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </td>
    </tr>
  );
}