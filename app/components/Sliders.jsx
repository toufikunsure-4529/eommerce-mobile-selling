"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const heroSlides = [
    {
        id: 1,
        image: "/hero-banner.png",
        title: "Premium Mobile Spare Parts - Fast Delivery & Guaranteed Compatibility",
        shortDescription: "Extensive inventory of OEM and high-quality aftermarket parts for all major smartphone brands. Get your repair parts delivered next-day with our express shipping options.",
    },
    {
        id: 2,
        image: "/hero-banner.png",
        title: "Trusted by Repair Professionals Worldwide",
        shortDescription: "Join thousands of repair shops and technicians who rely on our parts for consistent quality and performance. Bulk pricing available for business accounts.",
    },
    {
        id: 3,
        image: "/hero-banner.png",
        title: "One-Stop Solution for All Your Repair Needs",
        shortDescription: "From screens and batteries to charging ports and cameras - we've got every component you need at competitive prices with a 90-day warranty on all parts.",
    },
];

export default function HeroSectionSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        pauseOnHover: false,
    };

    return (
        <div className="relative overflow-hidden">
            <Slider {...settings}>
                {heroSlides.map((slide) => (
                    <div key={slide.id}>
                        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[500px] lg:h-[450px]">
                            {/* Background Image with Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat"
                                }}
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-30 md:bg-[#d2c7c7] md:bg-opacity-5"></div>
                            </div>

                            {/* Content Container */}
                            <div className="relative h-full flex items-center max-w-8xl px-2 ">
                                <div className="container mx-auto px-2 sm:px-3 md:px-4 lg:px-20">
                                    <div className="max-w-full sm:max-w-[70%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] text-left">
                                        <h1 className="text-xl sm:text-xl md:text-4xl lg:text-4xl font-bold leading-tight text-white md:text-black drop-shadow-md">
                                            {slide.title}
                                        </h1>
                                        <p className="mt-3 sm:mt-4 md:mt-5 text-white md:text-black text-xs sm:text-base md:text-md lg:text-md leading-relaxed drop-shadow-md">
                                            {slide.shortDescription}
                                        </p>
                                        <button className="mt-4 sm:mt-6 md:mt-8 px-6 py-2 sm:px-8 sm:py-3 bg-[#FF0101] hover:bg-red-500 text-white font-medium rounded-3xl transition duration-300">
                                            Shop Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Custom Dots Styling */}
            <style jsx global>{`
     .slick-dots {
                    bottom: 20px !important;
                    padding: 0 20px;
                    
                }
                .slick-dots li {
                    margin: 0 6px;
                }
                .slick-dots li button:before {
                    color: white !important;
                    opacity: 0.7;
                    font-size: 10px !important;
                    transition: all 0.3s;
                    
                }
                .slick-dots li.slick-active button:before {
                    color: #fff !important;
                    opacity: 1;
                    font-size: 12px !important;
                    
                }
                @media (max-width: 640px) {
                    .slick-dots {
                        bottom: 15px !important;
                    }
                    .slick-dots li button:before {
                        font-size: 8px !important;
                    }
                    .slick-dots li.slick-active button:before {
                        font-size: 10px !important;
                    }
                }
    `}</style>
        </div>
    );
}