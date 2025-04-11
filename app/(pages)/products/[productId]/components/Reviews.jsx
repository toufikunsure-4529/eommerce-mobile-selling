"use client";

import { useAuth } from "@/context/AuthContext";
import { useReviews } from "@/lib/firestore/reviews/read";
import { deleteReview } from "@/lib/firestore/reviews/write";
import { Avatar, CircularProgress, Rating } from "@mui/material";
import { Button, Card } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "./EmptyState";

function Reviews({ productId }) {
    const { data, isLoading: reviewsLoading } = useReviews({ productId });
    const [isDeleting, setIsDeleting] = useState(false);
    const { user } = useAuth();

    const handleDelete = async (reviewId) => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        setIsDeleting(true);
        try {
            if (!user) throw new Error("Please sign in to delete reviews");
            await deleteReview({ uid: user.uid, productId, reviewId });
            toast.success("Review deleted successfully");
        } catch (error) {
            toast.error(error?.message || "Failed to delete review");
        }
        setIsDeleting(false);
    };

    return (
        <div className="w-full max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Reviews</h2>

            {reviewsLoading ? (
                <div className="flex justify-center py-10">
                    <CircularProgress />
                </div>
            ) : data?.length > 0 ? (
                <div className="space-y-4">
                    {data.map((item,index) => (
                        <Card
                            key={index}
                            className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            aria-labelledby={`review-${item.id}-title`}
                        >
                            <div className="flex gap-3">
                                <Avatar
                                    src={item.photoURL}
                                    alt={`${item.displayName}'s avatar`}
                                    className="w-10 h-10 border border-gray-200"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h3
                                            id={`review-${item.id}-title`}
                                            className="font-medium text-gray-800 truncate"
                                        >
                                            {item.displayName}
                                        </h3>
                                        {user?.uid === item.uid && (
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                isDisabled={isDeleting}
                                                onPress={() => handleDelete(item.id)}
                                                className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                                                aria-label="Delete review"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        )}
                                    </div>
                                    <Rating
                                        value={item.rating}
                                        readOnly
                                        size="small"
                                        precision={0.5}
                                        className="mt-1 [&>span]:text-sm"
                                    />
                                    <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                                        {item.message}
                                    </p>
                                    {item.createdAt && (
                                        <p className="text-xs text-gray-500 mt-2">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="No reviews yet"
                    description="Be the first to share your thoughts about this product"
                    className="py-8"
                />
            )}
        </div>
    );
}

export default Reviews;