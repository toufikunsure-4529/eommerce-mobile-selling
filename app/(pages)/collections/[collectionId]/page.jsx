import { ProductCard } from "@/app/components/Products";
import { getCollection } from "@/lib/firestore/collections/read_server"
import { getProduct } from "@/lib/firestore/products/read_server";


export async function generateMetadata({ params }) {
    const { collectionId } = params;
    const collection = await getCollection({ id: collectionId })

    return {
        title: `${collection?.title} | Collection` ?? "E Commarce collection",
        description: collection?.subTitle ?? "",
        openGraph: {
            images: [collection?.imageURL],
        },
    };
}


async function page({ params }) {
    const { collectionId } = params;
    const collection = await getCollection({ id: collectionId })
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
        <main className='p-5 md:p-10 mt-12 h-screen'>
            <div className='w-full flex justify-center items-center flex-col'>
                <div className="w-full flx justify-center">
                    <img src={collection?.imageURL} alt={collection?.title} className="h-28" />
                </div>
                <div className="text-center">
                    <h2 className="md:text-4xl text-xl font-bold text-gray-900 uppercase">{collection?.title || "Our Collections"}</h2>
                    <h2 className="md:text-xl text-md  text-gray-900 uppercase mt-4">{collection?.subTitle || "Our Collections"}</h2>
                </div>
                <div className="max-w-6xl w-full mt-10">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {collection?.products?.map((productId) => (
                            <Product key={productId} productId={productId} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page



async function Product({ productId }) {
    const product = await getProduct({ id: productId })
    return <ProductCard product={product} />
}