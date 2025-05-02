"use client";

import { useBrands } from "@/lib/firestore/brands/read";
import { deleteBrand } from "@/lib/firestore/brands/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
  const { data: brands, error, isLoading } = useBrands();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <CircularProgress />
        <h3 className="mt-3 text-sm font-medium text-gray-600">Loading brands...</h3>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="flex-1 px-5 md:px-0">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Brands List</h1>
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar border rounded-lg">
          <table className="min-w-full text-sm border-separate border-spacing-y-2">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">SN</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Image</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Name</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands?.map((item, index) => (
                <Row key={item?.id} item={item} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this brand?")) return;

    setIsDeleting(true);
    try {
      await deleteBrand({ id: item?.id });
      toast.success("Brand deleted successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to delete");
    }
    setIsDeleting(false);
  };

  const handleUpdate = () => {
    router.push(`/admin/brands?id=${item?.id}`);
  };

  return (
    <tr className="bg-white rounded-md shadow-sm">
      <td className="px-4 py-3 text-center">{index + 1}</td>
      <td className="px-4 py-3 text-center">
        <img src={item?.imageURL} alt={item?.name} className="h-8 mx-auto object-contain" />
      </td>
      <td className="px-4 py-3">{item?.name}</td>
      <td className="px-4 py-3 text-center">
        <div className="flex justify-center gap-2">
          <Button onClick={handleUpdate} isIconOnly size="sm" variant="light" color="primary">
            <Edit2 size={16} />
          </Button>
          <Button
            onClick={handleDelete}
            isLoading={isDeleting}
            isIconOnly
            size="sm"
            color="danger"
            variant="light"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
