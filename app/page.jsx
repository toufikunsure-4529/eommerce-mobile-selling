import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Header from "./components/header/Header";
import FeaturedProductSlider from "./components/Sliders";
import { getBestSellingProducts, getNewArrivalProducts, getProducts } from "@/lib/firestore/products/read_server";  // Add the new method
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
import CategoriesNav from "./components/header/CategoriesNav";

export default async function Home() {
  // Fetch data from Firestore
  const [bestSelling, newArrivals, collections, categories, products, brands] = await Promise.all([
    getBestSellingProducts(),
    getNewArrivalProducts(),  // Fetch new arrivals
    getCollections(),
    getCategories(),
    getProducts(),
    getBrands(),
  ]);


  // Example: Use real Firestore data instead of mock data
  const bestSellingProducts = bestSelling;  // Now using the fetched best-selling products
  const newArrivalProducts = newArrivals;   // Using the fetched new arrival products

  return (
    <>
      <main className="h-screen overflow-x-hidden overflow-y-auto">
        <Header />
        <CategoriesNav />
        {/* <CategoryListHero /> */}
        <FeaturedProductSlider />
        <Collections collections={collections} />
        {/* <Categories categories={categories} /> */}
        <Accessories />
        <WhyUsSection />
        
        {/* Display Best Selling Products */}
        <ProductSection title="Best Selling" products={bestSellingProducts} />

        {/* Display New Arrivals */}
        <ProductSection title="New Arrival" products={newArrivalProducts} />

        {/* <ProductsGridView products={products} /> */}
        <ComboOffer />
        <CustomerReviews />
        {/* <Brands brands={brands} /> */}
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
