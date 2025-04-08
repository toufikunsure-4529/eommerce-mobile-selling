import { ProductCard } from "@/app/components/Products";

const ProductList = ({ products }) => {
    if (!products.length) {
        return <p className="text-center text-gray-500">No products found.</p>;
    }

    return (
        <div className="grid gap-4 mt-5 md:grid-cols-3 sm:grid-cols-2">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
