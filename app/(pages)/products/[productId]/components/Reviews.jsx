"use client";

import { useAuth } from "@/context/AuthContext";
import { useReviews } from "@/lib/firestore/reviews/read";
import { deleteReview } from "@/lib/firestore/reviews/write";
import { Avatar, Rating } from "@mui/material";
import { Button, Card } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function Reviews({ productId }) {
    const { data } = useReviews({ productId });
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    const handleDelete = async (reviewId) => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        setIsLoading(true);
        try {
            if (!user) throw new Error("Please log in first");
            await deleteReview({ uid: user.uid, productId, reviewId });
            toast.success("Review deleted successfully");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="w-full max-w-3xl mx-auto max-h-[600px] overflow-y-auto p-8 bg-white rounded-xl shadow-lg border border-gray-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Customer Reviews</h2>
            <div className="space-y-6">
                {data?.length > 0 ? (
                    data.map((item, index) => (
                        <Card key={index} className="p-6 bg-gray-50 shadow-md rounded-xl flex flex-col gap-4 border border-gray-200 hover:shadow-lg transition-all">
                            <div className="flex items-center gap-4">
                                <Avatar src={item.photoURL} className="w-14 h-14 border border-gray-300" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-xl text-gray-800">{item.displayName}</h3>
                                    <Rating value={item.rating} readOnly size="medium" className="mt-1" />
                                </div>
                                {user?.uid === item.uid && (
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        color="danger"
                                        variant="solid"
                                        isDisabled={isLoading}
                                        isLoading={isLoading}
                                        onClick={() => handleDelete(item.id)}
                                        className="hover:bg-red-600 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                )}
                            </div>
                            <p className="text-gray-700 text-md leading-relaxed border-l-4 border-gray-400 pl-4 italic">{item.message}</p>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-lg font-medium">No reviews yet. Be the first to leave one!</p>
                )}
            </div>
        </div>
    );
}

export default Reviews;