import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import FeaturedProductSlider from "./components/Sliders";
import { getFeaturedProducts, getProducts } from "@/lib/firestore/products/read_server";
import Collections from "./components/Collections";
import { getCollections } from "@/lib/firestore/collections/read_server";
import Categories from "./components/Categories";
import { getCategories } from "@/lib/firestore/categories/read_server";
import CustomerReviews from "./components/CustomerReviews";
import Brands from "./components/Brands";
import { getBrands } from "@/lib/firestore/brands/read_server";
import Footer from "./components/Footer";
import { AuthContextProvider } from "@/context/AuthContext";
import CategoryListHero from "./components/CategoryListHero";
import Accessories from "./components/Accessories";
import WhyUsSection from "./components/WhyUsSection";
import ComboOffer from "./components/ComboOffer";
import ProductSection from "./components/ProductSection";

export default async function Home() {
  // fetch  data from firestore 
  const [featuredProducts, collections, categories, products, brands] = await Promise.all([
    getFeaturedProducts(),
    getCollections(),
    getCategories(),
    getProducts(),
    getBrands(),
  ]);


  const mockProducts = [
    {
      id: 1,
      title: "Galaxy S23 Ultra",
      price: 1199,
      salePrice: 1099,
      brand: "Samsung",
      featuredImageURL: "/product-img.png",
      shortDescription: "6.8-inch AMOLED display, 200MP camera",
      isBestSelling: true,    // Popular brand + good discount
      isLatest: false    // S23 series released early 2023
    },
    {
      id: 2,
      title: "iPhone 15 Pro Max",
      price: 1299,
      salePrice: 1249,
      brand: "Apple",
      featuredImageURL: "/product-img.png",
      shortDescription: "6.7-inch Super Retina XDR, A17 Pro chip, Titanium body.",
      isBestSelling: true,    // Apple products typically sell well
      isLatest: true     // iPhone 15 series is newer (late 2023)
    },
    {
      id: 3,
      title: "Google Pixel 8 Pro",
      price: 999,
      salePrice: 949,
      brand: "Google",
      featuredImageURL: "/product-img2.jpg",
      shortDescription: "6.7-inch LTPO OLED, Tensor G3 chip, 50MP triple camera.",
      isBestSelling: true,   // Good but less mainstream than Samsung/Apple
      isLatest: true     // Pixel 8 series is recent (late 2023)
    },
    {
      id: 4,
      title: "OnePlus 11 5G",
      price: 799,
      salePrice: 749,
      brand: "OnePlus",
      featuredImageURL: "/product-img2.jpg",
      shortDescription: "6.7-inch AMOLED, Snapdragon 8 Gen 2, 5000mAh battery.",
      isBestSelling: true,   // Niche brand
      isLatest: false    // Released early 2023
    },
    {
      id: 5,
      title: "Xiaomi 13 Pro",
      price: 899,
      salePrice: 849,
      brand: "Xiaomi",
      featuredImageURL: "/product-img2.jpg",
      shortDescription: "6.73-inch AMOLED, Snapdragon 8 Gen 2, Leica cameras.",
      isBestSelling: true,   // Less known in some markets
      isLatest: false    // Released early 2023
    },
  ];


  // Example: Filter products for Best Selling and Latest Arrival
  const bestSellingProducts = mockProducts.filter((product) => product.isBestSelling); // Add this flag in your data
  const latestArrivalProducts = mockProducts.filter((product) => product.isLatest); // Add this flag in your data

  return (
    <>
      <main className="w-screen h-screen overflow-x-hidden overflow-y-auto">
        <Header />
        <CategoryListHero />
        <FeaturedProductSlider featuredProducts={featuredProducts} />
        <Collections collections={collections} />
        <Categories categories={categories} />
        <Accessories />
        <WhyUsSection />
        <ProductSection title="Best Selling" products={bestSellingProducts} />
        <ProductSection title="Latest Arrival" products={latestArrivalProducts} />
        {/* <ProductsGridView products={products} /> */}
        <ComboOffer />
        <CustomerReviews />
        {/* <Brands brands={brands} /> */}
        <Footer />
      </main>
    </>
  );
}
