"use client"
import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const categories = [
    { name: 'Fashion', image: '/categories.png' },
    { name: 'Electronics', image: '/categories.png' },
    { name: 'Bags', image: '/categories.png' },
    { name: 'Footwear', image: '/categories.png' },
    { name: 'Groceries', image: '/categories.png' },
    { name: 'Beauty', image: '/categories.png' },
    { name: 'Wellness', image: '/categories.png' },
    { name: 'Jewellery', image: '/categories.png' },
    { name: 'Jewellery', image: '/categories.png' },
    { name: 'Jewellery', image: '/categories.png' },
];

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,

    responsive: [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 6,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
            },
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
            },
        },
    ],
};

const FeaturedCategories = () => {
    return (
        <div className="w-full max-w-8xl mx-auto py-8 px-4 sm:px-6 lg:px-20">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Featured Categories</h2>
            <Slider {...settings}>
                {categories.map((category, index) => (
                    <div key={index} className="px-2 focus:outline-none">
                        <div className="flex flex-col items-center bg-white rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                            <div className="w-20 h-20 md:w-32 md:h-32 relative mb-2 rounded-full bg-[#E3FFFA] flex items-center justify-center">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-center text-md font-medium text-gray-700 mt-2">{category.name}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FeaturedCategories;