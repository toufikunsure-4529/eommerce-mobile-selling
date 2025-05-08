// app/brand/[brandId]/page.jsx
import BrandSeriesPage from "./BrandSeriesPage";

export const metadata = {
    title: "Browse Phone Series by Brand | Mobile Display Seller",
    description:
        "Explore mobile phone series and models by top brands. Find compatible displays for your devices at Mobile Display Seller.",
};


export default function BrandPage() {
    return <BrandSeriesPage />;
}
