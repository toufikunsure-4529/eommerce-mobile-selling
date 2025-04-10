import { getProduct } from '@/lib/firestore/products/read_server';;
import Photos from './components/Photos';
import Details from './components/Details';
import Description from './components/Description';
import Reviews from './components/Reviews';
import RelatedProducts from './components/RelatedProducts';
import AddReview from './components/AddReview';
import { AuthContextProvider } from '@/context/AuthContext';

export async function generateMetadata({ params }) {
    const { productId } = params;
    const product = await getProduct({ id: productId });

    return {
        title: `${product?.title} | Product` ?? "E Commarce Product",
        description: product?.shortDescription ?? "",
        openGraph: {
            images: [product?.featureImageURL],
        },
    };
}




export default async function Page({ params }) {
    const { productId } = params;
    const product = await getProduct({ id: productId });

    return (
        <main className="p-5 md:px-10 mt-10 max-w-8xl mx-auto">
            {/* Photo & Details Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Product Images */}
                <div className="flex justify-center">
                    <Photos imageList={[product?.featureImageURL, ...(product?.imageList ?? [])]} />
                </div>

                {/* Right: Product Details */}
                <div>
                    <Details product={product} />
                    <Description product={product} />

                </div>
            </section>



            <div className='flex  justify-center items-center py-10'>
                <div className='flex flex-col md:flex-row gap-4 md:max-w-4xl w-full'>
                    <AuthContextProvider>
                        <AddReview productId={product} />
                        <Reviews productId={product} />
                    </AuthContextProvider>
                </div>
            </div>

            {/* Related Products Section */}
            <section className="mt-10">
                <RelatedProducts categoryId={product?.categoryId} />
            </section>
        </main>
    );
}

