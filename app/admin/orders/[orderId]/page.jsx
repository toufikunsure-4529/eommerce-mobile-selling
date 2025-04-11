"use client";

import { useOrder } from "@/lib/firestore/orders/read";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import ChangeOrderStatus from "./components/ChangeStatus";

function Page() {
    const { orderId } = useParams();
    const { data: order, error, isLoading } = useOrder({ id: orderId });

    if (!orderId) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
                <p className="text-red-500 text-lg font-semibold">Invalid Order ID</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
                <CircularProgress size={50} thickness={4} color="primary" />
                <p className="mt-4 text-gray-600 font-medium">Fetching order details...</p>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
                <p className="text-red-500 text-lg font-semibold">Order Not Found</p>
                <p className="text-gray-600 mt-2">Please check the order ID and try again.</p>
            </div>
        );
    }

    const totalAmount = order?.checkout?.line_items?.reduce((prev, curr) => (
        prev + (curr?.price_data?.unit_amount / 100) * curr?.quantity
    ), 0);

    const address = JSON.parse(order?.checkout?.metadata?.address ?? "{}");

    return (
        <main className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4">
            <div className="max-w-3xl w-full bg-white  p-6 space-y-6">
                <div className="flex justify-between items-center gap-3">
                    <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
                    <ChangeOrderStatus order={order} />
                </div>

                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-blue-600">
                        {order?.paymentMode === "cod" ? "Cash On Delivery" : order?.paymentMode}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${order?.status === "delivered" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                        {order?.status ?? "Pending"}
                    </span>
                    <span className="text-lg font-semibold text-green-600">₹ {totalAmount}</span>
                </div>

                <p className="text-xs text-gray-500">Ordered on: {order?.timestampCreate?.toDate()?.toLocaleString()}</p>

                <div className="max-w-3xl w-full bg-green-50 rounded-xl p-6 mt-6">
                    <h2 className="text-xl font-semibold text-gray-600 mb-4">Shipping Address</h2>
                    <div className="space-y-2 text-sm text-gray-700">
                        <p><span className="font-medium">Full Name:</span> {address?.fullName}</p>
                        <p><span className="font-medium">Mobile:</span> {address?.mobile}</p>
                        <p><span className="font-medium">Email:</span> {address?.email}</p>
                        <p><span className="font-medium">Address:</span> {address?.addressLine1}, {address?.addressLine2}</p>
                        <p><span className="font-medium">City:</span> {address?.city}, {address?.state} - {address?.pincode}</p>
                        <p><span className="font-medium">Notes:</span> {address?.note}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {order?.checkout?.line_items?.map((product, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow">
                            <img
                                className="rounded-lg border h-8 w-8 object-cover"
                                src={product?.price_data?.product_data?.images?.[0]}
                                alt={product?.price_data?.product_data?.name}
                            />
                            <div>
                                <h1 className="text-sm font-medium text-gray-800">{product?.price_data?.product_data?.name}</h1>
                                <p className="text-gray-600 text-xs">₹ {product?.price_data?.unit_amount / 100} x {product?.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </main>
    );
}

export default Page;