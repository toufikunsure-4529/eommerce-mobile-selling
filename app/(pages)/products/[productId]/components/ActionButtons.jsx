'use client';

import { AuthContextProvider } from "@/context/AuthContext";
import AddToCartButton from "@/app/components/AddToCartButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ActionButtons({ product, selectedColor, selectedQuality }) {
    const validateSelection = () => {
        if (product?.isVariable && product?.colors?.length > 0 && !selectedColor) {
            toast.error("Please select a color");
            return false;
        }
        if (product?.hasQualityOptions && product?.qualities?.length > 0 && !selectedQuality) {
            toast.error("Please select a quality");
            return false;
        }
        return true;
    };

    const handleBuyNowClick = (e) => {
        if (!validateSelection()) {
            e.preventDefault();
        }
    };

    return (
        <div className="flex gap-4 mt-6">
            <AuthContextProvider>
                <AddToCartButton
                    productId={product?.id}
                    type="large"
                    selectedColor={selectedColor}
                    selectedQuality={selectedQuality}
                    isVariable={product?.isVariable && product?.colors?.length > 0}
                    hasQualityOptions={product?.hasQualityOptions && product?.qualities?.length > 0}
                />
            </AuthContextProvider>
            <Link
                href={
                    `/checkout?type=buynow&productId=${product?.id}${
                        product?.isVariable && selectedColor ? `&color=${encodeURIComponent(selectedColor)}` : ""
                    }${
                        product?.hasQualityOptions && selectedQuality ? `&quality=${encodeURIComponent(selectedQuality)}` : ""
                    }`
                }
                className="flex-1"
                onClick={handleBuyNowClick}
            >
                <button className="text-sm sm:text-base py-2 sm:py-2 px-3 sm:px-6 text-red-500 font-normal border border-red-500 rounded-lg shadow hover:bg-red-500 hover:text-white transition duration-300">
                    Buy Now
                </button>
            </Link>
            <AuthContextProvider>
                <FavoriteButton productId={product?.id} />
            </AuthContextProvider>
        </div>
    );
}