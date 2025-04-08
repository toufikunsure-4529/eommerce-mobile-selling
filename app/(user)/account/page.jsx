'use client';

;
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/lib/firestore/orders/read';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';

const OrdersPage = () => {
    const { user } = useAuth();
    const { data: orders, error, isLoading } = useOrders({ uid: user?.uid });

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
                <p className="text-red-600 font-medium">Error: {error}</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">My Orders</h2>
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {(!orders || orders.length === 0) ? (
                    <div className='flex flex-col justify-center items-center py-32'>
                        <Image
                            src="/svgs/Empty-pana.svg"
                            width={200}
                            height={200}
                            alt="No Orders"
                        />
                        <h2 className="text-lg font-medium text-gray-600">You have no orders</h2>
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {orders.map((order, orderIndex) => {
                            const totalAmount = order?.checkout?.line_items?.reduce((prev, curr) => (
                                prev + (curr?.price_data?.unit_amount / 100) * curr?.quantity
                            ), 0);
                            return (
                                <div key={orderIndex} className='bg-gray-100 border rounded-lg p-5 shadow-sm'>
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <span className="text-sm font-medium text-gray-700">Order #{orderIndex + 1}</span>
                                        <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                                            {order?.paymentMode === "cod" ? "Cash On Delivery" : order?.paymentMode}
                                        </span>
                                        <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                                            {order?.status ?? "Pending"}
                                        </span>
                                        <span className="text-green-600 font-semibold">₹ {totalAmount}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {order?.timestampCreate?.toDate()?.toLocaleString()}
                                    </p>
                                    <div className="mt-4 space-y-4">
                                        {order?.checkout?.line_items?.map((product, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                <img
                                                    className="rounded-lg border h-10 w-10 "
                                                    src={product?.price_data?.product_data?.images?.[0]}
                                                    alt={product?.price_data?.product_data?.name}
 
                                                />
                                                <div>
                                                    <h1 className="text-sm font-medium">{product?.price_data?.product_data?.name}</h1>
                                                    <p className="text-gray-500 text-xs">
                                                        ₹ {product?.price_data?.unit_amount / 100} x {product?.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
};

export default OrdersPage;