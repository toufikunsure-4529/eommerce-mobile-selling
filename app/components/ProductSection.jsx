import React from "react";
import Link from "next/link";
import { ProductCard } from "./Products";

function ProductSection({ title, products, seeAllLink = "/product" }) {
    return (
        <section className="w-full px-3 sm:px-6 md:px-12 lg:px-20 py-8 bg-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 uppercase">{title}</h2>
                <Link href={seeAllLink} className="text-sm text-blue-500 hover:underline">
                    See all
                </Link>
            </div>
            <div className="md:max-w-8xl w-full">

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
                    {products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductSection;