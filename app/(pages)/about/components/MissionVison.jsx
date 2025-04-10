// components/MissionVision.js
import Image from 'next/image';

const MissionVision = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Image Grid Section */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-lg mx-auto">
              <div className="relative rounded-xl overflow-hidden col-span-2 h-48 sm:h-64 md:h-72 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  alt="Various mobile spare parts and tools"
                  src="/about-mission1.png"
                  layout="fill"
                  objectFit="cover"
                  quality={90}
                  className="hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden h-40 sm:h-48 md:h-56 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  alt="Disassembled mobile phone with spare parts"
                  src="/about-mission2.png"
                  layout="fill"
                  objectFit="cover"
                  quality={90}
                  className="hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden h-40 sm:h-48 md:h-56 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  alt="Mobile phone repair tools and parts"
                  src="/about-mission3.png"
                  layout="fill"
                  objectFit="cover"
                  quality={90}
                  className="hover:opacity-90 transition-opacity"
                />
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2 space-y-8 md:space-y-12">
            <div className="max-w-md mx-auto lg:mx-0">
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-700 mb-4">
                Our <span >Mission</span>
              </h2>
              <p className="text-lg md:text-md text-gray-600 leading-relaxed">
                We're revolutionizing mobile repairs by providing premium quality spare parts at affordable prices. Our mission is to empower both individuals and businesses with reliable components that extend device lifespans, reduce electronic waste, and make repairs accessible to everyone.
              </p>
            </div>

            <div className="max-w-md mx-auto lg:mx-0">
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our <span >Vision</span>
              </h2>
              <p className="text-lg md:text-md text-gray-600 leading-relaxed">
                To become the global leader in mobile spare parts distribution, setting industry standards for quality and innovation. We envision a world where device repairs are simpler, more sustainable, and more cost-effective than replacements.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                <span className="text-sm font-medium text-blue-800">Quality Assurance</span>
              </div>
              <div className="bg-purple-50 px-4 py-2 rounded-full flex items-center">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                <span className="text-sm font-medium text-purple-800">Maintenance</span>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-full flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                <span className="text-sm font-medium text-green-800">1-Year Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;