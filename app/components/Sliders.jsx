"use client"

import React, { useState, useRef } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
    { id: 1, image: "/hero-banner.gif" },
    { id: 2, image: "/hero-banner.gif" },
    { id: 3, image: "/hero-banner.gif" },
]

export default function HeroSectionSlider() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const sliderRef = useRef(null)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        pauseOnHover: false,
        beforeChange: (_, next) => setCurrentSlide(next),
    }

    const CustomArrow = ({ direction }) => {
        const handleClick = () => {
            if (!sliderRef.current) return
            direction === "left"
                ? sliderRef.current.slickPrev()
                : sliderRef.current.slickNext()
        }

        return (
            <button
                onClick={handleClick}
                className={`hidden sm:flex absolute top-1/2 z-20 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-md items-center justify-center transition-all duration-300 ${direction === "left" ? "left-2 sm:left-4" : "right-2 sm:right-4"
                    }`}
                aria-label={direction === "left" ? "Previous slide" : "Next slide"}
            >
                {direction === "left" ? (
                    <ChevronLeft className="text-gray-800" size={24} />
                ) : (
                    <ChevronRight className="text-gray-800" size={24} />
                )}
            </button>
        )
    }

    return (
        <div className="relative w-full overflow-hidden">
            <Slider ref={sliderRef} {...settings}>
                {heroSlides.map((slide) => (
                    <div key={slide.id}>
                        <div className="relative w-full h-[160px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[450px]">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            />
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Custom Arrows (hidden on mobile) */}
            <CustomArrow direction="left" />
            <CustomArrow direction="right" />

            {/* Dot Navigation */}
            <div className="flex justify-center mt-4 gap-2">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => sliderRef.current?.slickGoTo(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "w-8 bg-red-600" : "w-2 bg-gray-300"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

        </div>
    )
}
