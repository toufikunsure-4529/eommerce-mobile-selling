"use client"

import { ProductCard } from "@/app/components/Products"
import { useAuth } from "@/context/AuthContext"
import { useProduct } from "@/lib/firestore/products/read"
import { useUser } from "@/lib/firestore/user/read"
import { CircularProgress } from "@mui/material"

function Page() {
    const { user } = useAuth()
    const { data, isLoading } = useUser({ uid: user?.uid })
    if (isLoading) {
        return (
            <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
                <CircularProgress size={50} thickness={4} color="primary" />
                <p className="mt-4 text-gray-600 font-medium">Fetching Data...</p>
            </div>
        );
    }

    return (
        <main className="bg-gray-50 min-h-screen py-12 px-6 sm:px-8">
            <div className="max-w-screen-xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900">
                    Your Favorite Products
                </h2>
                <p className="text-lg text-gray-600 mt-4">
                    Explore and manage the products you've saved for later.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {data?.favorites?.length > 0 ? (
                    data.favorites.map((productId) => (
                        <ProductItem productId={productId} key={productId} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        <div>
                            <img className="h-[250px]" src="/svgs/Empty-pana.svg" alt="Empty" />
                        </div>
                        <p> You don't have any favorite products yet.</p>

                    </div>
                )}
            </div>
        </main>
    )
}

export default Page

function ProductItem({ productId }) {
    const { data: product } = useProduct({ productId })

    return (
        <div className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-lg p-4 bg-white border border-gray-200 shadow-sm">
            <ProductCard product={product} />
        </div>
    )
}
