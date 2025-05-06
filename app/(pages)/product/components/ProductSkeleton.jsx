const ProductSkeleton = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
        {/* Image placeholder */}
        <div className="h-48 bg-gray-200"></div>
  
        {/* Content placeholders */}
        <div className="p-3">
          {/* Title placeholder */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
  
          {/* Description placeholder */}
          <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
  
          {/* Price placeholder */}
          <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    )
  }
  
  export default ProductSkeleton
  