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

const CartPage = () => {
    const { user } = useAuth();
    const { data, isLoading } = useUser({ uid: user?.uid });

    // Fetch product data for each cart item
    const cartItemsWithProducts = data?.carts?.map((item) => ({
        ...item,
        product: useProduct({ productId: item?.id }),
    })) || [];

    if (isLoading || cartItemsWithProducts.some((item) => item.product.isLoading)) {
        return (
            <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
                <CircularProgress size={50} thickness={4} color="primary" />
                <p className="mt-4 text-gray-600 font-medium">Loading Cart...</p>
            </div>
        );
    }

    const calculateSummary = () => {
        if (!cartItemsWithProducts || cartItemsWithProducts.length === 0) {
            return { productTotal: 0, totalItems: 0, discount: 0, deliveryFee: 0, total: 0 };
        }

        const summary = cartItemsWithProducts.reduce(
            (acc, item) => {
                const product = item.product.data;
                const price = parseFloat(product?.salePrice || product?.price || 0);
                const quantity = parseInt(item.quantity) || 0;
                const subtotal = price * quantity;

                return {
                    productTotal: acc.productTotal + subtotal,
                    totalItems: acc.totalItems + quantity,
                };
            },
            { productTotal: 0, totalItems: 0 }
        );

        const discount = summary.productTotal * 0.1; // 10% discount
        const deliveryFee = 100; // Fixed delivery fee
        const total = summary.productTotal - discount + deliveryFee;

        return {
            productTotal: summary.productTotal,
            totalItems: summary.totalItems,
            discount,
            deliveryFee,
            total,
        };
    };

    const summary = calculateSummary();

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-14 px-4 sm:px-6 lg:px-8 xl:px-20">
            <div className="max-w-8xl mx-auto">
                {(!data?.carts || data.carts.length === 0) ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg p-8 text-center">
                        <img
                            className="h-60 mb-8 w-auto"
                            src="/svgs/Empty-pana.svg"
                            alt="Empty cart"
                        />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                            Your Cart is Empty
                        </h2>
                        <p className="text-gray-500 mb-6 max-w-md">
                            No items in your cart yet. Start shopping to add some!
                        </p>
                        <Button
                            as={Link}
                            href="/products"
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-200"
                        >
                            Start Shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">SHOPPING CART</h1>
                        <h2 className="text-base md:text-lg font-semibold text-gray-700">Order Summary</h2>

                        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mt-6">
                            {/* Cart Items */}
                            <div className="lg:w-2/3">
                                <div className="hidden md:block bg-white p-4 rounded-t-lg border border-gray-200 shadow-sm">
                                    <div className="grid grid-cols-12 gap-4 font-medium text-gray-600">
                                        <div className="col-span-5">Product</div>
                                        <div className="col-span-2 text-center">Price</div>
                                        <div className="col-span-2 text-center">Quantity</div>
                                        <div className="col-span-2 text-center">Subtotal</div>
                                        <div className="col-span-1"></div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {cartItemsWithProducts.map((item) => (
                                        <CartItem
                                            key={`${item.id}-${item.selectedColor}`}
                                            item={item}
                                            user={user}
                                            data={data}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:w-1/3">
                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-8">
                                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                                    <div className="space-y-3 border-b border-gray-200 pb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-medium">₹{summary.productTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Total Items</span>
                                            <span className="font-medium">{summary.totalItems}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Discount (10%)</span>
                                            <span className="font-medium">₹{summary.discount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Delivery Charges</span>
                                            <span className="font-medium">₹{summary.deliveryFee.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-base mt-6">
                                        <span className="text-gray-600 font-semibold">Total</span>
                                        <span className="text-xl font-bold">₹{summary.total.toFixed(2)}</span>
                                    </div>
                                    <Button
                                        as={Link}
                                        href="/checkout?type=cart"
                                        className="w-full mt-6 bg-[#FF1212] hover:bg-red-600 text-white py-3 rounded-md font-medium transition-colors"
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const CartItem = ({ item, user, data }) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const { data: product } = item.product; // Product data is already fetched

    if (!product) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-center">
                <CircularProgress size={24} />
            </div>
        );
    }

    const price = Number(product?.salePrice || product?.price || 0);
    const subtotal = price * item.quantity;
    const isOutOfStock = product?.stock <= (product?.orders ?? 0);

    const handleRemove = async () => {
        if (!confirm("Are you sure you want to remove this item?")) return;
        setIsRemoving(true);
        try {
            const newList = data.carts.filter(
                (d) => !(d.id === item.id && d.selectedColor === item.selectedColor)
            );
            await updateCarts({ list: newList, uid: user?.uid });
            toast.success("Item removed from cart");
        } catch (error) {
            toast.error("Failed to remove item");
        }
        setIsRemoving(false);
    };

    const handleUpdate = async (quantity) => {
        if (quantity < 1) return;
        setIsUpdating(true);
        try {
            const newList = data.carts.map((d) => {
                if (d.id === item.id && d.selectedColor === item.selectedColor) {
                    return { ...d, quantity: parseInt(quantity) };
                }
                return d;
            });
            await updateCarts({ list: newList, uid: user?.uid });
            toast.success("Cart updated");
        } catch (error) {
            toast.error("Failed to update cart");
        }
        setIsUpdating(false);
    };

    return (
        <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 ${isOutOfStock ? 'opacity-70' : ''}`}>
            {/* Mobile View */}
            <div className="md:hidden flex flex-col gap-4">
                {isOutOfStock && (
                    <div className="bg-red-50 text-red-600 px-3 py-1 rounded text-sm font-medium">
                        Out of Stock
                    </div>
                )}
                <div className="flex gap-4">
                    <img
                        src={product?.featureImageURL || "/cart-item.png"}
                        alt={product?.title}
                        className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                        <h3 className="text-base font-medium text-gray-800">{product?.title || "Product"}</h3>
                        <p className="text-sm text-gray-500">Color: {item?.selectedColor || "N/A"}</p>
                        {product?.displaySize && (
                            <p className="text-sm text-gray-500">Size: {product.displaySize}</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">₹{price.toFixed(2)}</div>
                    <div className="flex items-center gap-2">
                        {isOutOfStock ? (
                            <span className="text-sm text-red-600">Out of Stock</span>
                        ) : (
                            <>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    onClick={() => handleUpdate(item.quantity - 1)}
                                    disabled={isUpdating || item.quantity <= 1}
                                    className="bg-gray-100"
                                >
                                    <Minus size={16} />
                                </Button>
                                <span className="px-3 py-1 border border-gray-300 text-sm">{item.quantity}</span>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    onClick={() => handleUpdate(item.quantity + 1)}
                                    disabled={isUpdating}
                                    className="bg-gray-100"
                                >
                                    <Plus size={16} />
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <Button
                    isIconOnly
                    size="sm"
                    onClick={handleRemove}
                    disabled={isRemoving}
                    className="self-end bg-transparent"
                >
                    {isRemoving ? (
                        <CircularProgress size={16} />
                    ) : (
                        <img src="/icon/tursh.svg" alt="Remove" className="h-5 w-5" />
                    )}
                </Button>
            </div>

            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                {isOutOfStock && (
                    <div className="col-span-12 bg-red-50 text-red-600 px-3 py-1 rounded text-sm font-medium">
                        Out of Stock
                    </div>
                )}
                <div className="col-span-5 flex items-center gap-4">
                    <img
                        src={product?.featureImageURL || "/cart-item.png"}
                        alt={product?.title}
                        className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                        <h3 className="text-base font-medium text-gray-800">{product?.title || "Product"}</h3>
                        {item?.selectedColor && <p className="text-sm text-gray-500">Color: {item?.selectedColor || "N/A"}</p>}
                        {product?.displaySize && (
                            <p className="text-sm text-gray-500">Size: {product.displaySize}</p>
                        )}
                    </div>
                </div>
                <div className="col-span-2 text-center font-medium">₹{price.toFixed(2)}</div>
                <div className="col-span-2 flex justify-center items-center gap-2">
                    {isOutOfStock ? (
                        <span className="text-sm text-red-600">Out of Stock</span>
                    ) : (
                        <>
                            <Button
                                isIconOnly
                                size="sm"
                                onClick={() => handleUpdate(item.quantity - 1)}
                                disabled={isUpdating || item.quantity <= 1}
                                className="bg-gray-100"
                            >
                                <Minus size={16} />
                            </Button>
                            <span className="px-3 py-1 border border-gray-300 text-sm">{item.quantity}</span>
                            <Button
                                isIconOnly
                                size="sm"
                                onClick={() => handleUpdate(item.quantity + 1)}
                                disabled={isUpdating}
                                className="bg-gray-100"
                            >
                                <Plus size={16} />
                            </Button>
                        </>
                    )}
                </div>
                <div className="col-span-2 text-center font-semibold">₹{subtotal.toFixed(2)}</div>
                <div className="col-span-1 flex justify-end">
                    <Button
                        isIconOnly
                        size="sm"
                        onClick={handleRemove}
                        disabled={isRemoving}
                        className="bg-transparent"
                    >
                        {isRemoving ? (
                            <CircularProgress size={16} />
                        ) : (
                            <img src="/icon/tursh.svg" alt="Remove" className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
