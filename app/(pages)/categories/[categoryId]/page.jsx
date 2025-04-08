import { ProductCard } from '@/app/components/Products';
import { getCategory } from '@/lib/firestore/categories/read_server';
import { getProductsByCategory } from '@/lib/firestore/products/read_server';


export async function generateMetadata({ params }) {
    const { categoryId } = params;
    const category = await getCategory({ id: categoryId })

    return {
        title: `${category?.name} | Category` ?? "E Commarce category",
        description: category?.name ?? "",
        openGraph: {
            images: [collection?.imageURL],
        },
    };
}


async function page({ params }) {
    const { categoryId } = params;
    const category = await getCategory({ id: categoryId })
    const products = await getProductsByCategory({ categoryId: categoryId })
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
        <main className='p-5 md:p-10 mt-12'>
            <div className='w-full flex justify-center items-center flex-col'>
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 uppercase">{category?.name || "Related Products"}</h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto mt-2 rounded-full"></div>
                </div>
                <div className="max-w-6xl w-full mt-10">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {mockProducts?.map((item) => (
                            <ProductCard product={item} key={item.id} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page