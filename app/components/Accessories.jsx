"use client";
import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categoriesSlides = [
    {
        id: 1,
        imageURL: "/accessories.png",
        name: "Mic",
        subTitle: "Power up your device",
    },
    {
        id: 2,
        imageURL: "/accessories.png",
        name: "Ear Speaker",
        subTitle: "Secure your SIM card",
    },
    {
        id: 3,
        imageURL: "/accessories.png",
        name: "Tools Kit",
        subTitle: "Crystal-clear visuals",
    },
    {
        id: 4,
        imageURL: "/accessories.png",
        name: "Sim Socket",
        subTitle: "Structural support",
    },
];

const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "16px",
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
        { breakpoint: 480, settings: { slidesToShow: 1.2 } },
        { breakpoint: 640, settings: { slidesToShow: 1.5 } },
        { breakpoint: 768, settings: { slidesToShow: 2, centerMode: false } },
        { breakpoint: 1024, settings: { slidesToShow: 3, centerMode: false } },
        { breakpoint: 1280, settings: "unslick" },
    ],
};

// Reusable Category Card Component
const AccessoriesCard = ({ category, isSlider = false }) => (
    <Link href={`/categories/${category.id}`} className="block h-full">
        <div className={`
      flex flex-col h-full
    
      bg-white rounded-lg overflow-hidden
      border border-gray-100 shadow-sm
      hover:shadow-md hover:border-blue-200
      transition-all duration-300
      ${isSlider ? 'mx-2' : ''}
    `}>
            <div className="flex items-center justify-center p-4 bg-white h-40 sm:h-48">
                <img
                    src={category.imageURL}
                    alt={category.name}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="p-4 text-center">
                <h3 className="text-base sm:text-md font-semibold text-gray-800 mb-1">
                    {category.name}
                </h3>
                {/* <p className="text-sm text-gray-500 hidden sm:block">
                    {category.subTitle}
                </p> */}
            </div>
        </div>
    </Link>
);

export default function Accessories() {
    return (
        <section className="w-full bg-gray-100 py-12 px-4 sm:px-6 lg:px-20">
            <div className="max-w-8xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 uppercase tracking-tight">
                        Other Accessories
                    </h2>
                    <Link
                        href="/categories"
                        className="text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline"
                    >
                        View All
                    </Link>
                </div>

                {/* Desktop Grid */}
                <div className="hidden xl:grid grid-cols-4 gap-6 ">
                    {categoriesSlides.map((category) => (
                        <AccessoriesCard key={category.id} category={category} />
                    ))}
                </div>

                {/* Mobile/Tablet Slider */}
                <div className="xl:hidden">
                    <Slider {...sliderSettings}>
                        {categoriesSlides.map((category) => (
                            <AccessoriesCard
                                key={category.id}
                                category={category}
                                isSlider={true}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}