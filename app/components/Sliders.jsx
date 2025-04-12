"use client"

import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const heroSlides = [
    { id: 1, image: "/hero-banner.gif" },
    { id: 2, image: "/hero-banner.gif" },
    { id: 3, image: "/hero-banner.gif" },
]

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
    }

    return (
        <div className="relative w-full overflow-hidden">
            <Slider {...settings}>
                {heroSlides.map((slide) => (
                    <div key={slide.id}>
                        <div className="relative w-full h-[160px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[450px]">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: "cover", // Ensures the image covers the area
                                    backgroundPosition: "center", // Centers the image
                                }}
                            >
                                {/* Optional overlay */}
                                {/* <div className="absolute inset-0 bg-black/40 md:bg-black/20 lg:bg-black/10"></div> */}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Custom Dot Styling */}
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
                        bottom: 10px !important;
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
    )
}