"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRight, ArrowUpRightFromSquare, ChevronRight, LucideArrowUpRightFromSquare } from "lucide-react";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const ComboOffer = () => {
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    const slides = [
        "/offer.png",
        "/offer.png",
        "/offer.png",
    ];

    return (
        <div className="max-w-8xl bg-gray-100 py-10 px-4 md:px-8 lg:px-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left: Text Content */}
                <div className=" md:w-1/4 text-left flex flex-col gap-5">
                    <h2 className="text-2xl md:text-4xl font-bold text-black">Combo Offer</h2>
                    <p>Get More, Pay Less – Best Deals on Mobile Repair Kits</p>
                    <div>
                        <button className="bg-[#FF0000] hover:bg-red-500 text-white px-3 py-2 md:px-6 md:py-3 rounded-3xl text-sm md:text-md font-normal flex items-center gap-2">
                            Shop Now <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Right: Image Slider */}
                <div className="w-full md:w-1/2">
                    <Slider {...settings}>
                        {slides.map((src, index) => (
                            <div key={index} className="flex justify-center items-center">
                                <Image
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    width={600}
                                    height={300}
                                    className="object-contain max-w-full"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <style jsx global>{`
                .slick-prev, .slick-next {
                    z-index: 100;
                    display: block !important;
                    opacity: 1 !important;
                    width: 40px;
                    height: 40px;
                }

                .slick-prev:before, .slick-next:before {
                    color: black !important;
                    font-size: 24px !important;
                }

                .slick-prev {
                    left: -10px !important;
                }

                .slick-next {
                    right: -10px !important;
                }

                @media (max-width: 768px) {
                    .slick-prev {
                        left: 0px !important;
                    }

                    .slick-next {
                        right: 0px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ComboOffer;
