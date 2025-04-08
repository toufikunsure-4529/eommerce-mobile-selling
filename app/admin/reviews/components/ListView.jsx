"use client";

import { useProduct } from "@/lib/firestore/products/read";
import { useAllReview } from "@/lib/firestore/reviews/read";
import { deleteReview } from "@/lib/firestore/reviews/write";
import { Rating } from "@mui/material";
import { Avatar, Button, CircularProgress, Card, CardBody } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
    const { data: reviews } = useAllReview();

    return (
        <div className="flex-1 flex flex-col gap-4 md:pr-5 md:px-0 px-5 rounded-xl">
            {reviews?.length > 0 ? (
                <div className="grid gap-4">
                    {reviews.map((item, index) => (
                        <ReviewCard item={item} key={index} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-10">No reviews found.</div>
            )}
        </div>
    );
}

function ReviewCard({ item }) {
    const [isLoading, setIsLoading] = useState(false);
    const { data: product } = useProduct({ productId: item?.productId });

    const handleDelete = async () => {
        if (!confirm("Are you sure?")) return;
        setIsLoading(true);
        try {
            await deleteReview({
                uid: item?.uid,
                productId: item?.productId,
            });
            toast.success("Successfully Deleted");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    return (
        <Card shadow="sm" className="border rounded-xl p-4 bg-white hover:shadow-md transition-all">
            <CardBody className="flex gap-4">
                <Avatar src={item?.photoURL} className="w-12 h-12" />
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="font-semibold text-lg">{item?.displayName}</h1>
                            <Rating value={item?.rating} readOnly size="small" className="mt-1" />
                            <Link href={`/products/${item?.productId}`} className="text-sm text-blue-500 hover:underline">
                                {product?.title || "Unknown Product"}
                            </Link>
                        </div>
                        <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="flat"
                            isDisabled={isLoading}
                            isLoading={isLoading}
                            onClick={handleDelete}
                        >
                            <Trash2 size={14} />
                        </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{item?.message}</p>
                </div>
            </CardBody>
        </Card>
    );
}
