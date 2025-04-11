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

    const mockWhyBuyDataCard = [
        {
            id: 1,
            title: 'Pay 10% on Order',
            description: 'Pay Remaining on Delivery in',
            icon: '/icon/pay-icon.svg',
        },
        {
            id: 2,
            title: 'Phoner Guarantee',
            description: 'Pay Remaining on Delivery in',
            icon: '/icon/guarantee-icon.svg',
        },
        {
            id: 3,
            title: 'Payment Protection',
            description: 'Pay Remaining on Delivery in',
            icon: '/icon/protection.svg',
        },
    ]

    return (
        <div className="w-full p-6 bg-gray-50 rounded-xl  ">
            {/* Category & Brand */}
            {/* <div className="flex gap-3">
                <Category categoryId={product?.categoryId} />
                <Brand brandId={product?.brandId} />
            </div> */}

            {/* Product Title & Description */}
            <h1 className="text-xl font-bold mb-2 text-gray-900">{product?.title || 'LCD with Touch Screen for Samsung Galaxy S10 Plus - Black (display glass combo folder)'}</h1>
            <Suspense fallback="Failed To Load">
                <RatingReview product={product} />
            </Suspense>
            {/* <p className="text-gray-600 text-sm mt-2 leading-relaxed">{product?.shortDescription || 'Experience unparalleled performance and efficiency with the Apple MacBook Air M1 (2020), featuring 16GB RAM, 256GB SSD storage, and an advanced 8-core GPU for seamless multitasking and stunning visuals.'}</p> */}

            {/* Price Section */}
            {/* <div className="flex items-center gap-3 mt-4">
                <h2 className="text-2xl font-bold text-gray-900">₹{product?.salePrice || "50000"}</h2>
                <span className="text-gray-500 line-through text-md">₹{product?.price || "60000"}</span>
                {discount > 0 && (
                    <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-lg">
                        {discount || "5"}% OFF
                    </span>
                )}
            </div> */}

            {/* Price Section */}
            <div className="flex items-center gap-3 mt-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    ₹{product?.salePrice || "50000"}
                </h2>
                <span className="text-gray-500 line-through text-md">
                    ₹{product?.price || "60000"}
                </span>

                {/* Discount Badge */}
                <span className="bg-red-500 text-white text-sm font-thin px-3 py-1 rounded-lg">
                    {product?.price && product?.salePrice
                        ? `${Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF`
                        : '50% OFF'}
                </span>
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

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-4">Select Color</h3>
                <div className="flex gap-2">
                    <div className="h-6 w-6 bg-white border border-gray-400 rounded-full"></div>
                    <div className="h-6 w-6 bg-red-500 border border-gray-400 rounded-full"></div>
                    <div className="h-6 w-6 bg-gray-900 border border-gray-400 rounded-full"></div>
                    <div className="h-6 w-6 bg-red-500 border border-gray-400 rounded-full"></div>
                </div>

            </div>


            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
                <AuthContextProvider>
                    <AddToCartButton productId={product?.id} type={"large"} />
                </AuthContextProvider>
                <Link href={`/checkout?type=buynow&productId=${product?.id}`} className="flex-1">
                    <button className="text-sm sm:text-base py-2 sm:py-2 px-3 sm:px-6 text-red-500 font-normal border border-red-500 rounded-lg shadow hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300">
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

            {/* Delivery Time */}
            <div className="mt-5">
                <h5>Estimated delivery on 10 - 13
                    April,2025</h5>
            </div>

            {/* Why Buy us */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {mockWhyBuyDataCard.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center space-x-4 p-4  rounded-xl "
                    >
                        <div className="w-12 h-12">
                            <img src={item.icon} alt="pay-icon" className="w-full h-full object-contain" />
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

async function Category({ categoryId }) {
    const category = await getCategory({ id: categoryId });
    return (
        <Link href={`/categories/${categoryId}`} className="flex items-center gap-2 bg-green-100 border px-3 py-1 rounded-full">
            <img className="h-3" src={category?.imageURL || "/logo.png"} alt="Category" />
            <h4 className="text-sm font-semibold text-gray-800">{category?.name || 'Display'}</h4>
        </Link>
    );
}

async function Brand({ brandId }) {
    const brand = await getBrand({ id: brandId });
    return (
        <div className="flex items-center gap-2 bg-red-100 border px-3 py-1 rounded-full">
            <img className="h-3" src={brand?.imageURL || "/logo.png"} alt="Brand" />
            <h4 className="text-sm font-semibold text-gray-800">{brand?.name || 'Apple'}</h4>
        </div>
    );
}


async function RatingReview({ product }) {
    const counts = await getProductReviewCounts({ productId: product?.id })
    return (
        <div className=" flex flex-col ">
            <MyRating value={counts?.averageRating ?? 4} />
            <h2 className=" text-sm text-gray-900 font-semibold"> <span>{counts?.averageRating?.toFixed(2)}</span> {counts?.totalReviews || 100} reviews</h2>
        </div>
    )
}