import { ProductCard } from '@/app/components/Products';
import { getProductsByCategory } from '@/lib/firestore/products/read_server'


async function RelatedProducts({ categoryId }) {
    const mockProducts = [
        {
            id: 1,
            title: "Samsung Galaxy S23 Ultra",
            price: 1199,
            salePrice: 1099, // Discounted price
            brand: "Samsung",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.8-inch AMOLED display, 200MP camera, 5000mAh battery.",
        },
        {
            id: 2,
            title: "iPhone 15 Pro Max",
            price: 1299,
            salePrice: 1249, // Discounted price
            brand: "Apple",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.7-inch Super Retina XDR, A17 Pro chip, Titanium body.",
        },
        {
            id: 3,
            title: "Google Pixel 8 Pro",
            price: 999,
            salePrice: 949, // Discounted price
            brand: "Google",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.7-inch LTPO OLED, Tensor G3 chip, 50MP triple camera.",
        },
        {
            id: 4,
            title: "OnePlus 11 5G",
            price: 799,
            salePrice: 749, // Discounted price
            brand: "OnePlus",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.7-inch AMOLED, Snapdragon 8 Gen 2, 5000mAh battery.",
        },
        {
            id: 5,
            title: "Xiaomi 13 Pro",
            price: 899,
            salePrice: 849, // Discounted price
            brand: "Xiaomi",
            featuredImageURL: "/product-img2.jpg",
            shortDescription: "6.73-inch AMOLED, Snapdragon 8 Gen 2, Leica cameras.",
        },
    ];

    // const products = await getProductsByCategory({ categoryId: categoryId })
    return (
        <div className='max-w-8xl w-full px-8 '>
            <div className="text-start">
                <h2 className="md:text-2xl text-xl font-bold text-gray-900 uppercase">Related Products</h2>
            </div>
            <div className=" w-full mt-10 ">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {mockProducts?.map((item) => (
                        <ProductCard product={item} key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RelatedProducts