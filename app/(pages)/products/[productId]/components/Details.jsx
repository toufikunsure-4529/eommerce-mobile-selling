import AddToCartButton from "@/app/components/AddToCartButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import MyRating from "@/app/components/MyRating";
import { AuthContextProvider } from "@/context/AuthContext";
import { getBrand } from "@/lib/firestore/brands/read_server";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import Link from "next/link";
import { Suspense } from "react";

function Details({ product }) {
    const discount = product?.price && product?.salePrice
        ? Math.round(((product.price - product.salePrice) / product.price) * 100)
        : 0;

    const mockProducts = [
        {
            id: 1,
            title: "Samsung Galaxy S23 Ultra",
            price: 1199,
            salePrice: 1099, // Discounted price
            brand: "Samsung",
            featuredImageURL: "/laptop.webp",
            shortDescription: "6.8-inch AMOLED display, 200MP camera, 5000mAh battery.",
        },
        {
            id: 2,
            title: "iPhone 15 Pro Max",
            price: 1299,
            salePrice: 1249, // Discounted price
            brand: "Apple",
            featuredImageURL: "/laptop.webp",
            shortDescription: "6.7-inch Super Retina XDR, A17 Pro chip, Titanium body.",
        },
        {
            id: 3,
            title: "Google Pixel 8 Pro",
            price: 999,
            salePrice: 949, // Discounted price
            brand: "Google",
            featuredImageURL: "/laptop.webp",
            shortDescription: "6.7-inch LTPO OLED, Tensor G3 chip, 50MP triple camera.",
        },
        {
            id: 4,
            title: "OnePlus 11 5G",
            price: 799,
            salePrice: 749, // Discounted price
            brand: "OnePlus",
            featuredImageURL: "/laptop.webp",
            shortDescription: "6.7-inch AMOLED, Snapdragon 8 Gen 2, 5000mAh battery.",
        },
        {
            id: 5,
            title: "Xiaomi 13 Pro",
            price: 899,
            salePrice: 849, // Discounted price
            brand: "Xiaomi",
            featuredImageURL: "/laptop.webp",
            shortDescription: "6.73-inch AMOLED, Snapdragon 8 Gen 2, Leica cameras.",
        },
    ];

    return (
        <div className="w-full p-6 bg-gray-50 rounded-xl  ">
            {/* Category & Brand */}
            <div className="flex gap-3">
                <Category categoryId={product?.categoryId} />
                <Brand brandId={product?.brandId} />
            </div>

            {/* Product Title & Description */}
            <h1 className="text-xl font-bold mb-2 text-gray-900">{product?.title || 'Apple MacBook Air M1 (2020) - 16GB RAM, 256GB SSD, 8-Core GPU'}</h1>
            <Suspense fallback="Failed To Load">
                <RatingReview product={product} />
            </Suspense>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">{product?.shortDescription || 'Experience unparalleled performance and efficiency with the Apple MacBook Air M1 (2020), featuring 16GB RAM, 256GB SSD storage, and an advanced 8-core GPU for seamless multitasking and stunning visuals.'}</p>

            {/* Price Section */}
            <div className="flex items-center gap-3 mt-4">
                <h2 className="text-2xl font-bold text-gray-900">₹{product?.salePrice || "50000"}</h2>
                <span className="text-gray-500 line-through text-md">₹{product?.price || "60000"}</span>
                {discount > 0 && (
                    <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-lg">
                        {discount}% OFF
                    </span>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
                <AuthContextProvider>
                    <AddToCartButton productId={product?.id} type={"large"} />
                </AuthContextProvider>
                <Link href={`/checkout?type=buynow&productId=${product?.id}`} className="flex-1">
                    <button className="w-full py-2 text-white font-semibold bg-black rounded-lg shadow-md hover:bg-gray-800 hover:border-black transition-all duration-300">
                        Buy Now
                    </button>
                </Link>

                <AuthContextProvider>
                    <FavoriteButton productId={product?.id} />
                </AuthContextProvider>
            </div>
            {product?.stock <= (product?.orders ?? 0) && <div className="flex mt-3">
                <h3 className="text-red-500 bg-red-50 py-1 px-2 rounded-lg text-sm">Out of Stock</h3>
            </div>}

        </div>
    );
}

export default Details;

async function Category({ categoryId }) {
    const category = await getCategory({ id: categoryId });
    return (
        <Link href={`/categories/${categoryId}`} className="flex items-center gap-2 bg-green-100 border px-3 py-1 rounded-full">
            <img className="h-3" src={category?.imageURL || "/logo.png"} alt="Category" />
            <h4 className="text-sm font-semibold text-gray-800">{category?.name || 'Unknown'}</h4>
        </Link>
    );
}

async function Brand({ brandId }) {
    const brand = await getBrand({ id: brandId });
    return (
        <div className="flex items-center gap-2 bg-blue-100 border px-3 py-1 rounded-full">
            <img className="h-3" src={brand?.imageURL || "/logo.png"} alt="Brand" />
            <h4 className="text-sm font-semibold text-gray-800">{brand?.name || 'Unknown'}</h4>
        </div>
    );
}


async function RatingReview({ product }) {
    const counts = await getProductReviewCounts({ productId: product?.id })
    return (
        <div className=" flex gap-3 items-center">
            <MyRating value={counts?.averageRating ?? 0} />
            <h2 className=" text-sm text-gray-400"> <span>{counts?.averageRating?.toFixed(2)}</span> ({counts?.totalReviews}) Reviews</h2>
        </div>
    )
}