"use client";

import { useProducts } from "@/lib/firestore/products/read";
import { deleteProduct } from "@/lib/firestore/products/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
    const [pageLimit, setPageLimit] = useState(10);
    const [lastSnapDocList, setLastSnapDocList] = useState([]);

    useEffect(() => {
        setLastSnapDocList([]);
    }, [pageLimit]);

    const {
        data: products,
        isLoading,
        lastSnapDoc,
    } = useProducts({
        pageLimit,
        lastSnapDoc: lastSnapDocList.length === 0 ? null : lastSnapDocList[lastSnapDocList.length - 1],
    });

    const handleNextPage = () => setLastSnapDocList([...lastSnapDocList, lastSnapDoc]);
    const handlePrePage = () => setLastSnapDocList(lastSnapDocList.slice(0, -1));

    // if (isLoading) {
    //     return (
    //         <div>
    //             <CircularProgress />
    //             <h1>Loading...</h1>
    //         </div>
    //     );
    // }
    // if (error) {
    //     return <div>{error}</div>;
    // }
    return (
        <div className="flex-1 flex flex-col gap-4 px-5 py-4 rounded-xl w-full overflow-x-auto bg-gray-50">
            <table className="w-full border-collapse bg-white rounded-lg shadow-md">
                <thead className="bg-gray-200">
                    <tr>
                        {['SN', 'Image', 'Title', 'Price', 'Stock', 'Orders', 'Status', 'Actions'].map((header) => (
                            <th key={header} className="px-4 py-3 text-left font-semibold text-gray-700">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={8} className="text-center py-5">
                                <CircularProgress />
                            </td>
                        </tr>
                    ) : (
                        products?.map((item, index) => (
                            <Row key={item.id} index={index + lastSnapDocList.length * pageLimit} item={item} />
                        ))
                    )}
                </tbody>
            </table>

            <div className="flex justify-between items-center py-4">
                <Button isDisabled={isLoading || lastSnapDocList.length === 0} onClick={handlePrePage} size="sm" variant="bordered">
                    Previous
                </Button>
                <select
                    value={pageLimit}
                    onChange={(e) => setPageLimit(Number(e.target.value))}
                    className="px-4 py-2 rounded-md border border-gray-300"
                >
                    {[3, 5, 10, 20, 100].map((value) => (
                        <option key={value} value={value}>{value} Items</option>
                    ))}
                </select>
                <Button isDisabled={isLoading || products?.length === 0} onClick={handleNextPage} size="sm" variant="bordered">
                    Next
                </Button>
            </div>
        </div>
    );
}

function Row({ item, index }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure?")) return;

        setIsDeleting(true);
        try {
            await deleteProduct({ id: item?.id });
            toast.success("Successfully Deleted");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsDeleting(false);
    };

    const handleUpdate = () => {
        router.push(`/admin/products/form?id=${item?.id}`);
    };

    return (
        <tr className="border-b hover:bg-gray-100 transition">

            <td className="px-4 py-3 text-center">{index + 1}</td>
            <td className="px-4 py-3 text-center">
                <img className="h-10 w-10 object-cover rounded-md" src={item?.featureImageURL} alt="Product" />
            </td>
            <td className="border-y bg-white px-3 py-2 whitespace-nowrap">
                {item?.title}{" "}
                {item?.isFeatured === true && (
                    <span className="ml-2 bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-[10px] rounded-full px-3 py-1">
                        Featured
                    </span>
                )}
            </td>
            <td className="border-y bg-white px-3 py-2  whitespace-nowrap">
                {item?.salePrice < item?.price && (
                    <span className="text-xs text-gray-500 line-through">
                        ₹ {item?.price}
                    </span>
                )}{" "}
                ₹ {item?.salePrice}
            </td>
            <td className="border-y bg-white px-3 py-2">{item?.stock}</td>
            <td className="border-y bg-white px-3 py-2">{item?.orders ?? 0}</td>
            <td className="border-y bg-white px-3 py-2">
                <div className="flex">
                    {item?.stock - (item?.orders ?? 0) > 0 && (
                        <div className="px-2 py-1 text-xs text-green-500 bg-green-100 font-bold rounded-md">
                            Available
                        </div>
                    )}
                    {item?.stock - (item?.orders ?? 0) <= 0 && (
                        <div className="px-2 py-1 text-xs text-red-500 bg-red-100 rounded-md">
                            Out Of Stock
                        </div>
                    )}
                </div>
            </td>
            <td className="px-4 py-3 text-center">
                <div className="flex gap-2 justify-center">
                    <Button onClick={() => router.push(`/admin/products/form?id=${item.id}`)} isDisabled={isDeleting} isIconOnly size="sm">
                        <Edit2 size={14} />
                    </Button>
                    <Button onClick={handleDelete} isLoading={isDeleting} isDisabled={isDeleting} isIconOnly size="sm" color="danger">
                        <Trash2 size={14} />
                    </Button>
                </div>
            </td>
        </tr>
    );
}