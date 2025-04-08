"use client";

import { updateOrderStatus } from "@/lib/firestore/orders/write";
import toast from "react-hot-toast";

function ChangeOrderStatus({ order }) {
    const handleChangeStatus = async (status) => {
        try {
            if (!status) {
                return toast.error("Please select a status");
            }

            await toast.promise(
                updateOrderStatus({ id: order?.id, status }),
                {
                    loading: "Updating...",
                    success: "Successfully updated",
                    error: (e) => e?.message || "Failed to update status",
                }
            );
        } catch (error) {
            toast.error(error?.message || "Something went wrong");
        }
    };

    return (
        <div >
            <label htmlFor="change-order-status" className="block text-sm font-semibold text-gray-800 mb-2">
                Change Order Status
            </label>
            <select
                id="change-order-status"
                name="change-order-status"
                value={order?.status || ""}
                onChange={(e) => handleChangeStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
                           focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition
                           hover:border-gray-400"
            >
                <option value="">Update Status</option>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="pickup">Pickup</option>
                <option value="inTransit">In Transit</option>
                <option value="outForDelivery">Out For Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>
        </div>
    );
}

export default ChangeOrderStatus;
