"use client";

import { useAuth } from "@/context/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import { updateCarts } from "@/lib/firestore/user/write";
import { CircularProgress } from "@mui/material";
import { Button } from "@nextui-org/react";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
    const { user } = useAuth();
    const { data, isLoading } = useUser({ uid: user?.uid });

    if (isLoading) {
        return (
            <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
                <CircularProgress size={50} thickness={4} color="primary" />
                <p className="mt-4 text-gray-600 font-medium">Fetching Data...</p>
            </div>
        );
    }

    return (
        <main className="flex flex-col gap-3 justify-center items-center p-5">
            <h1 className="text-2xl font-semibold">Cart</h1>
            {(!data?.carts || data?.carts?.length === 0) && (
                <div className="flex flex-col gap-5 justify-center items-center h-full w-full py-20">
                    <div className="flex justify-center">
                        <img className="h-[200px]" src="/svgs/Empty-pana.svg" alt="" />
                    </div>
                    <h1 className="text-gray-600 font-semibold">
                        Please Add Products To Cart
                    </h1>
                </div>
            )}
            <div className="p-5 w-full md:max-w-[900px] gap-4 grid grid-cols-1 md:grid-cols-2">
                {data?.carts?.map((item, key) => {
                    return <ProductItem item={item} key={item?.id} />;
                })}
            </div>
            <div>
                <Link href={`/checkout?type=cart`}>
                    <button className="bg-blue-500 px-5 py-2 text-sm rounded-lg text-white">
                        Checkout
                    </button>
                </Link>
            </div>
        </main>
    );
};



const ProductItem = ({ item }) => {
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });

    const [isRemoving, setIsRemoving] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const { data: product } = useProduct({ productId: item?.id });

    const handleRemove = async () => {
        if (!confirm("Are you sure?")) return;
        setIsRemoving(true);
        try {
            const newList = data?.carts?.filter((d) => d?.id != item?.id);
            await updateCarts({ list: newList, uid: user?.uid });
            toast.success("Item Successfully Deleted");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsRemoving(false);
    };

    const handleUpdate = async (quantity) => {
        setIsUpdating(true);
        try {
            const newList = data?.carts?.map((d) => {
                if (d?.id === item?.id) {
                    return {
                        ...d,
                        quantity: parseInt(quantity),
                    };
                } else {
                    return d;
                }
            });
            await updateCarts({ list: newList, uid: user?.uid });
        } catch (error) {
            toast.error(error?.message);
        }
        setIsUpdating(false);
    };

    return (
        <div className="flex gap-4 items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="w-24 h-24 overflow-hidden rounded-lg">
                <img
                    className="w-full h-full object-cover transition-transform transform hover:scale-105"
                    src={product?.featureImageURL}
                    alt={product?.title}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <h1 className="text-lg font-semibold text-gray-800">{product?.title}</h1>
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-green-500">₹ {product?.salePrice}</h2>
                    <span className="text-sm text-gray-500 line-through">₹ {product?.price}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Button
                        onClick={() => handleUpdate(item?.quantity - 1)}
                        isDisabled={isUpdating || item?.quantity <= 1}
                        isIconOnly
                        size="sm"
                        className="h-8 w-8 p-2 border-2 border-gray-300 rounded-full hover:bg-gray-200"
                    >
                        <Minus size={14} />
                    </Button>
                    <h2 className="font-semibold text-gray-700">{item?.quantity}</h2>
                    <Button
                        onClick={() => handleUpdate(item?.quantity + 1)}
                        isDisabled={isUpdating}
                        isIconOnly
                        size="sm"
                        className="h-8 w-8 p-2 border-2 border-gray-300 rounded-full hover:bg-gray-200"
                    >
                        <Plus size={14} />
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-end">
                <Button
                    onClick={handleRemove}
                    isLoading={isRemoving}
                    isDisabled={isRemoving}
                    isIconOnly
                    color="error"
                    size="sm"
                    className="p-2 rounded-full hover:bg-red-100"
                >
                    <X size={16} />
                </Button>
            </div>
        </div>
    );
};

export default Page;
