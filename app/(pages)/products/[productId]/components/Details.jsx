
import AddToCartButton from "@/app/components/AddToCartButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import MyRating from "@/app/components/MyRating";
import { AuthContextProvider } from "@/context/AuthContext";
import { getBrand } from "@/lib/firestore/brands/read_server";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function Details({ product }) {
    const discount = product?.price && product?.salePrice
        ? Math.round(((product.price - product.salePrice) / product.price) * 100)
        : 0;

    const whyBuyUs = [
        {
            id: 1,
            title: "Pay 10% on Order",
            description: "Pay remaining on delivery",
            icon: "/icon/pay-icon.svg",
        },
        {
            id: 2,
            title: "Phoner Guarantee",
            description: "Assured quality parts",
            icon: "/icon/guarantee-icon.svg",
        },
        {
            id: 3,
            title: "Payment Protection",
            description: "100% secure payments",
            icon: "/icon/protection.svg",
        },
    ];

    return (
        <div className="w-full p-6 bg-gray-50 rounded-xl">
            {/* Product Title */}
            <h1 className="text-xl font-bold mb-2 text-gray-900">
                {product?.title || "Product Title"}
            </h1>

            {/* Rating & Review */}
            <Suspense fallback={<p>Loading ratings...</p>}>
                <RatingReview product={product} />
            </Suspense>

            {/* Price */}
            <div className="flex items-center gap-3 mt-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    ₹{product?.salePrice}
                </h2>
                <span className="text-gray-500 line-through text-md">
                    ₹{product?.price}
                </span>
                {discount > 0 && (
                    <span className="bg-red-500 text-white text-sm font-thin px-3 py-1 rounded-lg">
                        {discount}% OFF
                    </span>
                )}
            </div>

            {/* Key Features */}
            <div className="w-full mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Performs as Original</li>
                    <li>Reliable and Efficient</li>
                    <li>Seamless User Experience</li>
                    <li>Responsive Design</li>
                </ul>
            </div>

            {/* Color Selection (Static for now) */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Select Color</h3>
                <div className="flex gap-2">
                    <div className="h-6 w-6 bg-white border border-gray-400 rounded-full"></div>
                    <div className="h-6 w-6 bg-red-500 border border-gray-400 rounded-full"></div>
                    <div className="h-6 w-6 bg-gray-900 border border-gray-400 rounded-full"></div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6">
                <AuthContextProvider>
                    <AddToCartButton productId={product?.id} type="large" />
                </AuthContextProvider>
                <Link href={`/checkout?type=buynow&productId=${product?.id}`} className="flex-1">
                    <button className=" text-sm sm:text-base py-2 sm:py-2 px-3 sm:px-6 text-red-500 font-normal border border-red-500 rounded-lg shadow hover:bg-red-500 hover:text-white transition duration-300">
                        Buy Now
                    </button>
                </Link>
                <AuthContextProvider>
                    <FavoriteButton productId={product?.id} />
                </AuthContextProvider>
            </div>

            {/* Stock info */}
            {product?.stock <= (product?.orders ?? 0) && (
                <div className="mt-3">
                    <h3 className="text-red-500 bg-red-50 py-1 px-2 rounded-lg text-sm">
                        Out of Stock
                    </h3>
                </div>
            )}

            {/* Estimated Delivery */}
            <div className="mt-5 text-sm text-gray-700">
                <p>Estimated delivery: <strong>10 - 13 April, 2025</strong></p>
            </div>

            {/* Why Buy Us */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-8">
                {whyBuyUs.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 rounded-xl">
                        <div className="w-12 h-12">
                            <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Details;

async function RatingReview({ product }) {
    const counts = await getProductReviewCounts({ productId: product?.id });

    return (
        <div className="flex flex-col gap-1">
            <MyRating value={counts?.averageRating ?? 4} />
            <p className="text-sm text-gray-800">
                {counts?.averageRating?.toFixed(2)} • {counts?.totalReviews || 0} reviews
            </p>
        </div>
    );
}
