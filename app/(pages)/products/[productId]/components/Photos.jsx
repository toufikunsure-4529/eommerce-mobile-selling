"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react"

// Custom arrow components with fixed positioning
const PrevArrow = (props) => {
    const { onClick } = props
    return (
        <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/70 text-white cursor-pointer hover:bg-black transition-all duration-200"
            onClick={onClick}
            type="button"
            aria-label="Previous slide"
        >
            <ChevronLeft size={24} />
        </button>
    )
}

const NextArrow = (props) => {
    const { onClick } = props
    return (
        <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/70 text-white cursor-pointer hover:bg-black transition-all duration-200"
            onClick={onClick}
            type="button"
            aria-label="Next slide"
        >
            <ChevronRight size={24} />
        </button>
    )
}

function Photos({ imageList = [] }) {
    const defaultImage = "/prodduct.png"
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [isZoomed, setIsZoomed] = useState(false)
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
    const [showFullscreen, setShowFullscreen] = useState(false)
    const mainSliderRef = useRef(null)
    const thumbnailSliderRef = useRef(null)

    // If no images, use default
    const images = imageList.length ? imageList : [defaultImage]

    // Settings for the main slider
    const mainSliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: !isPaused,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        beforeChange: (current, next) => {
            setCurrentSlide(next)
        },
        afterChange: (current) => {
            setCurrentSlide(current)
        },
    }

    // Settings for the thumbnail slider
    const thumbnailSliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: images.length > 6 ? 6 : images.length,
        slidesToScroll: 1,
        arrows: false,
        focusOnSelect: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: images.length > 3 ? 3 : images.length,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: images.length > 2 ? 2 : images.length,
                },
            },
        ],
    }

    // Handle zoom functionality
    const handleMouseMove = (e) => {
        if (!isZoomed) return

        const container = e.currentTarget
        const rect = container.getBoundingClientRect()

        // Calculate relative position within the container (0 to 1)
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height

        setZoomPosition({ x, y })
    }

    // Handle thumbnail click
    const handleThumbnailClick = (index) => {
        if (mainSliderRef.current) {
            mainSliderRef.current.slickGoTo(index)
            setCurrentSlide(index)
        }
    }

    // Handle fullscreen view
    const toggleFullscreen = () => {
        setShowFullscreen(!showFullscreen)
        setIsPaused(true)
    }

    // Sync the two sliders
    useEffect(() => {
        if (mainSliderRef.current && thumbnailSliderRef.current) {
            thumbnailSliderRef.current.slickGoTo(currentSlide)
        }
    }, [currentSlide])

    if (!images.length) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-red-500 px-6 text-center">
                    Something Went Wrong
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-8xl  mx-auto px-4 sm:px-6 lg:px-10 py-6 bg-white">
            {/* Fullscreen View */}
            {showFullscreen && (
                <div className="fixed inset-0 top-16 bg-black z-50 flex items-center justify-center" onClick={toggleFullscreen}>
                    <button
                        className="absolute top-4 right-4 z-50 w-10 h-10 bg-white text-black p-2 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation()
                            toggleFullscreen()
                        }}
                    >
                        ✕
                    </button>
                    <Image
                        src={images[currentSlide] || "/placeholder.svg"}
                        alt={`Full size image ${currentSlide + 1}`}
                        fill
                        className="object-contain p-4 cursor-zoom-out"
                    />
                </div>
            )}

            <div className="flex flex-col space-y-4">
                {/* Main Image Carousel */}
                <div
                    className="relative w-full h-[280px] sm:h-[360px] md:h-[450px] lg:h-[480px] overflow-hidden rounded-xl   cursor-zoom-in"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => {
                        setIsPaused(false)
                        setIsZoomed(false)
                    }}
                >
                    <Slider ref={mainSliderRef} {...mainSliderSettings}>
                        {images.map((img, index) => (
                            <div key={index} className="relative w-full h-full">
                                <div
                                    className="relative w-full h-[280px] sm:h-[360px] md:h-[450px] lg:h-[480px] flex justify-center items-center  overflow-hidden"
                                    onMouseMove={handleMouseMove}
                                    onMouseEnter={() => setIsZoomed(true)}
                                    onMouseLeave={() => setIsZoomed(false)}
                                    onClick={toggleFullscreen}
                                >
                                    <button
                                        className="absolute top-0 right-3 z-10 bg-black/70 text-white p-2 rounded-full"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleFullscreen()
                                        }}
                                    >
                                        <Maximize2 size={20} />
                                    </button>

                                    <div
                                        className={`transition-all duration-75 w-full h-full ${isZoomed ? "scale-[2]" : "scale-100"}`}
                                        style={
                                            isZoomed
                                                ? {
                                                    transformOrigin: `${zoomPosition.x * 200}% ${zoomPosition.y * 200}%`,
                                                }
                                                : {}
                                        }
                                    >
                                        <Image
                                            src={img || "/placeholder.svg"}
                                            alt={`Product Image ${index + 1}`}
                                            fill
                                            className="object-contain"
                                            priority={index === 0}
                                        />
                                    </div>

                                    {/* Image caption/details */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 transform transition-transform duration-300 translate-y-full hover:translate-y-0">
                                        <h3 className="text-lg font-semibold">Product Image {index + 1}</h3>
                                        <p className="text-sm opacity-80">Click to view full details</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Thumbnail Navigation */}
                {images.length > 1 && (
                    <div className="w-full relative hidden md:block">
                        <Slider ref={thumbnailSliderRef} {...thumbnailSliderSettings}>
                            {images.map((img, index) => (
                                <div key={index} className="px-1">
                                    <button
                                        className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 h-20 w-full ${currentSlide === index ? "border-black" : "border-gray-200 opacity-70"
                                            }`}
                                        onClick={() => handleThumbnailClick(index)}
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={img || "/placeholder.svg"}
                                                alt={`Thumbnail ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}

                {/* Image counter */}
                <div className="text-center text-sm text-gray-600">
                    {currentSlide + 1} / {images.length}
                </div>
            </div>
        </div>
    )
}

export default Photos
