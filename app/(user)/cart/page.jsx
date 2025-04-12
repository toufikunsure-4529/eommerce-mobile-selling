"use client";

import { useAuth } from "@/context/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import { updateCarts } from "@/lib/firestore/user/write";
import { CircularProgress } from "@mui/material";
import { Button } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
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

    const calculateSummary = () => {
        if (!data?.carts) return {};

        let productTotal = 0;
        let totalItems = 0;

        data.carts.forEach(item => {
            const productPrice = item.salePrice || item.price || 0;
            productTotal += productPrice * item.quantity;
            totalItems += item.quantity;
        });

        const discount = 0;
        const deliveryFee = 0;
        const total = productTotal - discount + deliveryFee;

        return {
            productTotal,
            totalItems,
            discount,
            deliveryFee,
            total
        };
    };

    const summary = calculateSummary();

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-14 px-4 sm:px-6 lg:px-8 xl:px-20">
            <div className="max-w-8xl mx-auto">

                {(!data?.carts || data?.carts?.length === 0) ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg p-8 text-center">
                        <img
                            className="h-60 mb-8 w-auto"
                            src="/svgs/Empty-pana.svg"
                            alt="Shopping cart is empty"
                        />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                            Your cart feels lonely
                        </h2>
                        <p className="text-gray-500 mb-6 max-w-md">
                            Your shopping cart is empty. Let's fill it with some amazing products!
                        </p>
                        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:scale-105">
                            Continue Shopping
                        </button>
                        <p className="mt-4 text-sm text-gray-400">
                            Need help? <a href="#" className="text-indigo-500 hover:underline">Contact support</a>
                        </p>
                    </div>
                ) : (
                    <>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">YOUR CART</h1>
                        <h2 className="text-base md:text-lg font-semibold">Order Summary</h2>

                        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mt-6">

                            {/* Cart Items - Left Side */}
                            <div className="lg:w-2/3">
                                {/* Desktop Table Header */}
                                <div className="hidden md:block bg-white p-4 rounded-t-lg border border-gray-200 shadow-sm">
                                    <div className="grid grid-cols-12 gap-4 font-medium text-gray-600">
                                        <div className="col-span-5">Product</div>
                                        <div className="col-span-2 text-center">Price</div>
                                        <div className="col-span-2 text-center">Quantity</div>
                                        <div className="col-span-2 text-center">Subtotal</div>
                                        <div className="col-span-1">Action</div>
                                    </div>
                                </div>

                                {/* Cart Items */}
                                <div className="space-y-4">
                                    {data?.carts?.map((item) => (
                                        <CartItem key={item.id} item={item} user={user} data={data} />
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary - Right Side */}
                            <div className="lg:w-1/3">
                                <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200 sticky top-8">
                                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                                    <div className="space-y-3 border-b border-gray-200 pb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Product Total</span>
                                            <span className="font-medium">${summary.productTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Quantity</span>
                                            <span className="font-medium">{summary.totalItems}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Discount</span>
                                            <span className="font-medium">${summary.discount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Delivery fee</span>
                                            <span className="font-medium">${summary.deliveryFee.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-sm mt-6">
                                        <span className="text-gray-600">Total</span>
                                        <span className="text-lg md:text-xl font-bold">${summary.total.toFixed(2)}</span>
                                    </div>
                                    <Link href={`/checkout?type=cart`} className="block w-full mt-4">
                                        <button className="w-full bg-[#FF1212] hover:bg-red-600 text-white py-3 rounded-md font-medium transition-colors">
                                            Order Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div></>
                )}
            </div>
        </div>
    );
};

const CartItem = ({ item, user, data }) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const { data: product } = useProduct({ productId: item?.id });

    const price = product?.salePrice || product?.price || 0;
    const subtotal = price * item.quantity;
    const isOutOfStock = product?.stock === 0;

    const handleRemove = async () => {
        if (!confirm("Are you sure?")) return;
        setIsRemoving(true);
        try {
            const newList = data?.carts?.filter((d) => d?.id !== item?.id);
            await updateCarts({ list: newList, uid: user?.uid });
            toast.success("Item removed from cart");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsRemoving(false);
    };

    const handleUpdate = async (quantity) => {
        if (quantity < 1) return;
        setIsUpdating(true);
        try {
            const newList = data?.carts?.map((d) => {
                if (d?.id === item?.id) {
                    return { ...d, quantity: parseInt(quantity) };
                }
                return d;
            });
            await updateCarts({ list: newList, uid: user?.uid });
        } catch (error) {
            toast.error(error?.message);
        }
        setIsUpdating(false);
    };

    return (
        <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 ${isOutOfStock ? 'opacity-70' : ''}`}>
            {/* Mobile View - Stacked Layout */}
            <div className="md:hidden flex flex-col gap-4">
                {isOutOfStock && (
                    <div className="bg-red-50 text-red-600 px-3 py-1 rounded text-sm font-medium mb-2">
                        Out of Stock
                    </div>
                )}
                <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0">
                        <img
                            src={product?.featureImageURL || "/cart-item.png"}
                            alt={product?.title}
                            className="w-full h-full object-cover rounded"
                        />
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-base font-medium text-gray-800">
                            {product?.title || "Product Title"}
                        </h3>
                        <p className="text-sm text-gray-500">Color: Black</p>
                        <p className="text-sm text-gray-500">Display Size: 6.40 inches</p>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">${price.toFixed(2)}</div>

                    <div className="flex items-center gap-2">
                        {isOutOfStock ? (
                            <span className="text-sm text-red-600">Out of Stock</span>
                        ) : (
                            <>
                                <button
                                    onClick={() => handleUpdate(item.quantity - 1)}
                                    disabled={isUpdating || item.quantity <= 1}
                                    className="p-1 border border-gray-300 bg-gray-100 rounded-l hover:bg-gray-200 disabled:opacity-50"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="px-3 py-1 border border-gray-300 text-sm">{item.quantity}</span>
                                <button
                                    onClick={() => handleUpdate(item.quantity + 1)}
                                    disabled={isUpdating}
                                    className="p-1 border border-gray-300 bg-gray-100 rounded-r hover:bg-gray-200 disabled:opacity-50"
                                >
                                    <Plus size={16} />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                <button
                    onClick={handleRemove}
                    disabled={isRemoving}
                    className="self-end text-gray-400 hover:text-red-500 disabled:opacity-50"
                >
                    {isRemoving ? (
                        <CircularProgress size={16} />
                    ) : (
                        <img src="/icon/tursh.svg" alt="Remove" className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Desktop View - Grid Layout */}
            <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                {isOutOfStock && (
                    <div className="col-span-12 bg-red-50 text-red-600 px-3 py-1 rounded text-sm font-medium mb-1">
                        Out of Stock
                    </div>
                )}
                <div className="col-span-5 flex items-center gap-4">
                    <div className="w-20 h-20 flex-shrink-0">
                        <img
                            src={product?.featureImageURL || "/cart-item.png"}
                            alt={product?.title}
                            className="w-full h-full object-cover rounded"
                        />
                    </div>
                    <div>
                        <h3 className="text-base font-medium text-gray-800">
                            {product?.title || "Product Title"}
                        </h3>
                        <p className="text-sm text-gray-500">Color: Black</p>
                        <p className="text-sm text-gray-500">Display Size: 6.40 inches</p>
                    </div>
                </div>

                <div className="col-span-2 text-center font-medium">${price.toFixed(2)}</div>

                <div className="col-span-2 flex justify-center">
                    {isOutOfStock ? (
                        <span className="text-sm text-red-600">Out of Stock</span>
                    ) : (
                        <div className="flex items-center">
                            <button
                                onClick={() => handleUpdate(item.quantity - 1)}
                                disabled={isUpdating || item.quantity <= 1}
                                className="p-1 border border-gray-300 bg-gray-100 rounded-l hover:bg-gray-200 disabled:opacity-50"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 border border-gray-300 text-sm">{item.quantity}</span>
                            <button
                                onClick={() => handleUpdate(item.quantity + 1)}
                                disabled={isUpdating}
                                className="p-1 border border-gray-300 bg-gray-100 rounded-r hover:bg-gray-200 disabled:opacity-50"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="col-span-2 text-center font-semibold">${subtotal.toFixed(2)}</div>

                <div className="col-span-1 flex justify-end">
                    <button
                        onClick={handleRemove}
                        disabled={isRemoving}
                        className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                    >
                        {isRemoving ? (
                            <CircularProgress size={16} />
                        ) : (
                            <img src="/icon/tursh.svg" alt="Remove" className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;