"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const heroSlides = [
    {
        id: 1,
        image: "/banner-hero.jpg",
    },
    {
        id: 2,
        image: "/banner-hero.jpg",
    },
    {
        id: 3,
        image: "/banner-hero.jpg",
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