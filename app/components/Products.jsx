
import Link from "next/link";
import React, { Suspense } from "react";
import FavoriteButton from "./FavoriteButton";
import { AuthContextProvider } from "@/context/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import MyRating from "./MyRating";

// function ProductsGridView({ products }) {
//     const mockProducts = [
//         {
//             id: 1,
//             title: "Samsung Galaxy S23 Ultra",
//             price: 1199,
//             salePrice: 1099, // Discounted price
//             brand: "Samsung",
//             featuredImageURL: "/laptop.webp",
//             shortDescription: "6.8-inch AMOLED display, 200MP camera, 5000mAh battery.",
//         },
//         {
//             id: 2,
//             title: "iPhone 15 Pro Max",
//             price: 1299,
//             salePrice: 1249, // Discounted price
//             brand: "Apple",
//             featuredImageURL: "/laptop.webp",
//             shortDescription: "6.7-inch Super Retina XDR, A17 Pro chip, Titanium body.",
//         },
//         {
//             id: 3,
//             title: "Google Pixel 8 Pro",
//             price: 999,
//             salePrice: 949, // Discounted price
//             brand: "Google",
//             featuredImageURL: "/laptop.webp",
//             shortDescription: "6.7-inch LTPO OLED, Tensor G3 chip, 50MP triple camera.",
//         },
//         {
//             id: 4,
//             title: "OnePlus 11 5G",
//             price: 799,
//             salePrice: 749, // Discounted price
//             brand: "OnePlus",
//             featuredImageURL: "/laptop.webp",
//             shortDescription: "6.7-inch AMOLED, Snapdragon 8 Gen 2, 5000mAh battery.",
//         },
//         {
//             id: 5,
//             title: "Xiaomi 13 Pro",
//             price: 899,
//             salePrice: 849, // Discounted price
//             brand: "Xiaomi",
//             featuredImageURL: "/laptop.webp",
//             shortDescription: "6.73-inch AMOLED, Snapdragon 8 Gen 2, Leica cameras.",
//         },
//     ];


//     return (
//         <section className="w-full flex flex-col gap-8 justify-center items-center px-4 sm:px-6 md:px-12 lg:px-20 py-12">
//             <div className="text-center">
//                 <h2 className="text-xl font-bold text-gray-900 uppercase">Our Products</h2>
//                 <div className="w-24 h-1 bg-green-500 mx-auto mt-2 rounded-full"></div>
//             </div>
//             <div className="max-w-6xl w-full">
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//                     {mockProducts?.map((item) => (
//                         <ProductCard product={item} key={item.id} />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default ProductsGridView;

export function ProductCard({ product }) {
    const isOutOfStock = product?.stock <= (product?.orders ?? 0);

    return (
        <div
            className={`border border-gray-200 bg-gray-100 shadow-sm rounded-lg overflow-hidden min-h-[200px] md:h-auto flex flex-col transition hover:shadow-lg ${isOutOfStock ? " filter grayscale opacity-80 pointer-events-none" : ""
                }`}
        >
            <div className="relative w-full ">
                <img
                    src={product?.featuredImageURL}
                    alt={product?.title}
                    className="w-full h-48 object-cover object-center"
                />
                <div className="absolute top-1 right-1">
                    <AuthContextProvider>
                        <FavoriteButton productId={product?.id} />
                    </AuthContextProvider>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow gap-2">
                <Link href={`/products/${product?.id}`}>
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2 hover:text-blue-500 transition-colors delay-100">
                        {product?.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{product?.shortDescription}</p>

                    <Suspense>
                        <RatingReview product={product} />
                    </Suspense>
                    <div className="flex justify-between items-center  mt-3">
                        <div className="flex gap-2 justify-center items-center">
                            <h2 className="text-md md:text-lg font-bold text-gray-900">₹{product?.salePrice}</h2>
                            <span className="text-[14px] md:text-sm font-semibold text-[#4E4D4D] line-through">₹{product?.price}</span>
                        </div>
                        {product?.salePrice < product?.price && (
                            <span className="bg-[#FFE5E5] text-[#FF0101] text-[10px] md:text-xs font-semibold px-2 py-1 rounded">
                                {Math.round(((product?.price - product?.salePrice) / product?.price) * 100)}% OFF
                            </span>
                        )}
                    </div>
                </Link>

                {isOutOfStock && (
                    <div className="flex mt-3">
                        <h3 className="text-red-500 bg-red-50 py-1 px-2 rounded-lg text-sm">Out of Stock</h3>
                    </div>
                )}

                {/* <div className="flex justify-between gap-3 mt-auto">
                    <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
                        <button className="bg-red-500 text-white flex-1 py-2 px-4 text-sm font-medium rounded-lg transition hover:bg-red-600 shadow-md">
                            Buy Now
                        </button>
                    </Link>

                    <AuthContextProvider>
                        <AddToCartButton productId={product?.id} />
                    </AuthContextProvider>
                </div> */}
            </div>
        </div>
    );
}



async function RatingReview({ product }) {
    const counts = await getProductReviewCounts({ productId: product?.id })
    return (
        <div className=" flex gap-3 items-center">
            <MyRating value={counts?.averageRating ?? 4} />
            <h2 className=" text-xs text-gray-400"> <span>{counts?.averageRating?.toFixed(2)}</span> ({counts?.totalReviews}) Reviews</h2>
        </div>
    )
}