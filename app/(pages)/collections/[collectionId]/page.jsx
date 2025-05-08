// app/[collectionId]/page.jsx
import { ProductCard } from "@/app/components/Products";
import { getCollection } from "@/lib/firestore/collections/read_server";
import { getProduct } from "@/lib/firestore/products/read_server";

export async function generateMetadata({ params }) {
    const { collectionId } = params;
    const collection = await getCollection({ id: collectionId });

    const title = `${collection?.title} | Collection` ?? "E-Commerce Collection";
    const description = collection?.subTitle ?? "Browse our collection of mobile phones and accessories.";
    const imageURL = collection?.imageURL;

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            images: [imageURL],
            url: `https://yourdomain.com/collection/${collectionId}`,
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            image: imageURL,
        },
    };
}

async function page({ params }) {
    const { collectionId } = params;
    const collection = await getCollection({ id: collectionId });

    return (
        <main className='p-5 md:p-10 mt-12 h-screen'>
            <div className='w-full flex justify-center items-center flex-col'>
                <div className="w-full flex justify-center">
                    <img src={collection?.imageURL} alt={collection?.title} className="h-28" />
                </div>
                <div className="text-center">
                    <h2 className="md:text-4xl text-xl font-bold text-gray-900 uppercase">{collection?.title || "Our Collections"}</h2>
                    <h2 className="md:text-xl text-md text-gray-900 uppercase mt-4">{collection?.subTitle || "Our Collections"}</h2>
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
    );
}

export default page;

async function Product({ productId }) {
    const product = await getProduct({ id: productId });
    return <ProductCard product={product} />;
}
