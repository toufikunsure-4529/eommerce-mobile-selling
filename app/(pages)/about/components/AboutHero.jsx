import React from 'react';

function AboutHero() {
    return (
        <div className="relative bg-white overflow-hidden h-auto sm:h-[550px] md:h-auto lg:h-[450px] xl:h-[500px]">
            <div className="max-w-8xl mx-auto py-12 px-4 sm:px-6 lg:px-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 min-h-[450px]">
                    {/* Text Section */}
                    <div className="w-full lg:w-1/2 p-4 flex flex-col justify-center">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                            ABOUT US
                        </h1>
                        <p className="text-base sm:text-md mb-6 text-gray-800 leading-relaxed">
                            We believe in providing high-quality mobile spare parts to keep your devices running smoothly. Our platform is designed to make phone repairs more accessible and affordable for individuals and businesses alike. With a commitment to reliability and innovation, we ensure that every product meets the highest standards of performance and durability.
                        </p>
                        <button className="bg-[#FF0000] text-white px-6 py-3 rounded-lg text-sm  font-semibold hover:bg-red-600 transition duration-300 w-fit">
                            EXPLORE MORE
                        </button>
                    </div>

                    {/* Image Grid Section */}
                    <div className="w-full lg:w-1/2 flex-1 p-4">
                        <div className="grid grid-cols-2 gap-4 max-w-[500px] mx-auto">
                            <img
                                alt="Various mobile spare parts and tools"
                                className="rounded-lg col-span-2 w-full h-48 sm:h-64 lg:h-48 object-cover shadow-md"
                                src="/about-hero1.png"
                            />
                            <img
                                alt="Disassembled mobile phone with spare parts"
                                className="rounded-lg w-full h-32 sm:h-40 lg:h-48 object-cover shadow-md"
                                src="/about-hero2.png"
                            />
                            <img
                                alt="Mobile phone repair tools and parts"
                                className="rounded-lg w-full h-32 sm:h-40 lg:h-48 object-cover shadow-md"
                                src="/about-hero3.png"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Curved background shape */}
            <div className="absolute bottom-0 left-0 right-0 w-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    className="w-full h-32 sm:h-40 lg:h-48"
                >
                    <path
                        fill="#F9E1E1"
                        fillOpacity="1"
                        d="M0,160L34.3,165.3C68.6,171,137,181,206,197.3C274.3,213,343,235,411,229.3C480,224,549,192,617,154.7C685.7,117,754,75,823,58.7C891.4,43,960,53,1029,80C1097.1,107,1166,149,1234,144C1302.9,139,1371,85,1406,58.7L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                    />
                </svg>
            </div>
        </div>
    );
}

export default AboutHero;