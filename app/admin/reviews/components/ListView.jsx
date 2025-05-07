"use client";

import { useProduct } from "@/lib/firestore/products/read";
import { useAllReview } from "@/lib/firestore/reviews/read";
import { deleteReview } from "@/lib/firestore/reviews/write";
import { Rating } from "@mui/material";
import {
  Avatar,
  Button,
  CircularProgress,
  Card,
  CardBody,
} from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
  const { data: reviews, isLoading, error } = useAllReview();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load reviews: {error}
      </div>
    );
  }

  const sortedReviews = Array.isArray(reviews)
    ? [...reviews].sort(
        (a, b) => b.timestamp?.toMillis?.() - a.timestamp?.toMillis?.()
      )
    : [];

  return (
    <div className="flex-1 flex flex-col gap-4 md:pr-5 md:px-0 px-5 rounded-xl">
      {sortedReviews.length > 0 ? (
        <div className="grid gap-4">
          {sortedReviews.map((item, index) => (
            <ReviewCard key={index} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">
          No reviews found.
        </div>
      )}
    </div>
  );
}
function ReviewCard({ item }) {
    const [isDeleting, setIsDeleting] = useState(false);
  
    const productId =
      typeof item?.productId === "string"
        ? item.productId
        : item?.productId?.id;
  
    // ❗ Skip if productId is invalid (prevents Firestore crash)
    if (!productId) {
      return null;
    }
  
    const { data: product } = useProduct({ productId });
  
    const handleDelete = async () => {
      if (!confirm("Are you sure you want to delete this review?")) return;
      setIsDeleting(true);
      try {
        await deleteReview({
          uid: item?.uid,
          productId,
        });
        toast.success("Review deleted successfully");
      } catch (error) {
        toast.error(error?.message || "Failed to delete review");
      } finally {
        setIsDeleting(false);
      }
    };
  
    return (
      <Card shadow="sm" className="border rounded-xl p-4 bg-white hover:shadow-md transition-all">
        <CardBody className="flex gap-4">
          <Avatar src={item?.photoURL} className="w-12 h-12" />
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-semibold text-lg">{item?.displayName}</h1>
                <Rating value={item?.rating || 0} readOnly size="small" className="mt-1" />
                <Link
                  href={`/products/${productId}`}
                  className="text-sm text-blue-500 hover:underline"
                >
                  {product?.title || "Unknown Product"}
                </Link>
              </div>
              <Button
                isIconOnly
                size="sm"
                color="danger"
                variant="flat"
                isDisabled={isDeleting}
                isLoading={isDeleting}
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
  