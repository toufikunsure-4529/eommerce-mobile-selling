import { getProduct } from '@/lib/firestore/products/read_server';
import Photos from './components/Photos';
import Details from './components/Details';
import Description from './components/Description';
import Reviews from './components/Reviews';
import RelatedProducts from './components/RelatedProducts';
import AddReview from './components/AddReview';
import { AuthContextProvider } from '@/context/AuthContext';
import InTheBoxSection from './components/InTheBoxSection';
import { notFound } from 'next/navigation';

// Using server-side async functions properly
export async function generateMetadata({ params }) {
    // Await the params here
    const { productId } = await params;  // Ensure params is awaited
    const product = await getProduct({ id: productId });
    if (!product) {
        return {
            title: 'Product Not Found | E-Commerce',
            description: 'The product you are looking for does not exist.',
        };
    }

    return {
        title: `${product.title} | E-Commerce Product`,
        description: product.shortDescription ?? '',
        openGraph: {
            images: [product.featureImageURL],
        },
    };
}

export default async function Page({ params }) {
    // Await the params here as well
    const { productId } = await params;  // Ensure params is awaited
    const product = await getProduct({ id: productId });

    if (!product) return notFound(); // Handle case where product is not found

    return (
        <main className="p-4 md:px-10 w-full max-w-7xl mx-auto bg-gray-100">
            {/* ✅ Product Main Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Images */}
                <div className="flex justify-center">
                    <Photos
                        imageList={[product.featureImageURL, ...(product.imageList ?? [])]}
                    />
                </div>

                {/* Product Details */}
                <div>
                    <Details product={product} />
                </div>
            </section>

            {/* ✅ Description Section */}
            <section className="mb-10">
                <Description product={product} />
            </section>

            {/* ✅ What's in the Box */}
            <section className="mb-10">
                <InTheBoxSection />
            </section>

            {/* ✅ Review Section */}
            <section className="py-12 bg-white border-t">
                <div className="container mx-auto px-4 max-w-5xl">
                    <AuthContextProvider>
                        <AddReview productId={product.id} />
                        <Reviews productId={product.id} />
                    </AuthContextProvider>
                </div>
            </section>

            {/* ✅ Related Products */}
            <section className="mt-10">
                <RelatedProducts categoryId={product.categoryId} />
            </section>
        </main>
    );
}
