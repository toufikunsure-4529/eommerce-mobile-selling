"use client";

import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/lib/firestore/orders/read';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import { updateOrderStatus } from "@/lib/firestore/orders/write";
import toast from "react-hot-toast";
import { useState } from 'react';
import ConfirmationDialog from './components/ConfirmationDialog';

const OrdersPage = () => {
    const { user } = useAuth();
    const { data: orders, error, isLoading } = useOrders({ uid: user?.uid });
    const [orderToCancel, setOrderToCancel] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);

    const handleCancelClick = (orderId) => {
        setOrderToCancel(orderId);
    };


    const handleCancelConfirm = async () => {
        if (!orderToCancel) return;

        setIsCancelling(true);
        try {
            await toast.promise(
                updateOrderStatus({ id: orderToCancel, status: "cancelled" }),
                {
                    loading: "Cancelling order...",
                    success: "Order cancelled successfully",
                    error: (e) => e?.message || "Failed to cancel order",
                }
            );
        } catch (error) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setIsCancelling(false);
            setOrderToCancel(null);
        }
    };

    const getDeliveryDate = (orderDate) => {
        if (!orderDate) return 'Calculating...';
        const date = new Date(orderDate);
        date.setDate(date.getDate() + 3); // Adding 3 days for delivery estimate
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const getStatusBadge = (status) => {
        const baseClasses = "text-xs px-2.5 py-1 rounded-full font-medium";

        switch (status) {
            case "Delivered":
                return `${baseClasses} bg-green-100 text-green-800`;
            case "cancelled":
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-red-100 text-blue-800`;
        }
    };

    if (isLoading) {
        return (
            <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
                <CircularProgress size={50} thickness={4} color="primary" />
                <p className="mt-4 text-gray-600 font-medium">Loading your orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
                <p className="text-red-600 font-medium">Error loading orders: {error.message}</p>
                <button
                    className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <main className="min-h-screen max-w-8xl bg-white py-10 px-4 md:px-8 lg:px-20">
            <div className='flex justify-between items-center mb-8'>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
            </div>

            {(!orders || orders.length === 0) ? (
                <div className='flex flex-col justify-center items-center py-20 md:py-32'>
                    <Image
                        src="/svgs/Empty-pana.svg"
                        width={250}
                        height={250}
                        alt="No Orders"
                        priority
                    />
                    <h2 className="text-lg font-medium text-gray-600 mt-4">You have no orders yet</h2>
                    <p className="text-gray-500 text-sm mt-2">Your orders will appear here once you place them</p>
                </div>
            ) : (
                <div className='space-y-6'>
                    {orders.map((order, orderIndex) => {
                        const orderDate = order?.timestampCreate?.toDate();
                        const totalAmount = order?.checkout?.line_items?.reduce((prev, curr) => (
                            prev + (curr?.price_data?.unit_amount / 100) * curr?.quantity
                        ), 0)?.toFixed(2) || '0.00';
                        const canCancel = order?.status !== "cancelled" && order?.status !== "Delivered";

                        return (
                            <div key={order.id || orderIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                {/* Order Header */}
                                <div className="px-5 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-gray-900">
                                            Order #{orders.length - orderIndex}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            • {orderDate?.toLocaleString() || 'Date not available'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${order?.paymentMode === "cod"
                                            ? "bg-orange-100 text-orange-800"
                                            : "bg-purple-100 text-purple-800"
                                            }`}>
                                            {order?.paymentMode === "cod" ? "Cash On Delivery" : "Paid Online"}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-900">₹{totalAmount}</span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="divide-y divide-gray-200">
                                    {order?.checkout?.line_items?.map((product, index) => (
                                        <div key={index} className="p-4 md:p-5">
                                            <div className="flex items-start  gap-4">
                                                {/* Product Image */}
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="rounded-md border border-gray-200 w-16 h-16 object-contain"
                                                        src={product?.price_data?.product_data?.images?.[0] || '/images/placeholder-product.png'}
                                                        alt={product?.price_data?.product_data?.name || "Product image"}

                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="">
                                                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                                                        {product?.price_data?.product_data?.name || "Iphone Display"}
                                                    </h3>
                                                    <div className="mt-1 flex flex-wrap flex-col gap-x-4 gap-y-1 text-sm text-gray-600">
                                                        <span>Size: {product?.size || 'Standard'}</span>
                                                        <span>Qty: {product?.quantity || 1}</span>
                                                        <span>₹{(product?.price_data?.unit_amount / 100)?.toFixed(2) || '0.00'}</span>
                                                    </div>
                                                </div>

                                                <div className="flex-grow flex flex-col justify-center items-center mb-2">
                                                    <p className="text-xs text-gray-500 mb-1">Order Status</p>
                                                    <span className={getStatusBadge(order?.status)}>
                                                        {order?.status ?? "Processing"}
                                                    </span>
                                                </div>

                                                {/* Status and Delivery Info */}
                                                <div className="flex-shrink-0 flex flex-col items-end">

                                                    {order?.status !== "cancelled" && (
                                                        <p className="text-xs text-gray-500 text-right">
                                                            Expected by<br />
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {getDeliveryDate(orderDate)}
                                                            </span>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Footer */}
                                <div className="px-5 py-3 border-t border-gray-200">
                                    <div className="flex justify-end">
                                        {canCancel && (
                                            <button
                                                onClick={() => handleCancelClick(order?.id)}
                                                disabled={isCancelling}
                                                className={`text-sm font-medium px-3 py-1 border rounded-md transition-colors ${isCancelling
                                                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                                    : "text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                                                    }`}
                                            >
                                                {isCancelling ? "Processing..." : "Cancel Order"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={!!orderToCancel}
                onClose={() => setOrderToCancel(null)}
                onConfirm={handleCancelConfirm}
                title="Confirm Cancellation"
                message="Are you sure you want to cancel this order? This action cannot be undone."
                confirmText="Yes, Cancel Order"
                cancelText="No, Keep Order"
                isProcessing={isCancelling}
            />
        </main>
    );
};

export default OrdersPage;