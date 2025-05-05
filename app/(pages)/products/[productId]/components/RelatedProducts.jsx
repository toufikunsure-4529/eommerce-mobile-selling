import { ProductCard } from '@/app/components/Products';
import { getProductsByCategory } from '@/lib/firestore/products/read_server';

async function RelatedProducts({ categoryId }) {
    // Fetch products by category from Firestore
    const products = await getProductsByCategory({ categoryId });

    return (
        <div className='max-w-8xl w-full px-8'>
            <div className="text-start">
                <h2 className="md:text-2xl text-xl font-bold text-gray-900 uppercase">Related Products</h2>
            </div>
            <div className="w-full mt-10">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {products?.map((item) => (
                        <ProductCard product={item} key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RelatedProducts;
