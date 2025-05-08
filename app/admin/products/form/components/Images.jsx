"use client";

export default function Images({
  data,
  setFeatureImage,
  featureImage,
  imageList,
  setImageList,
  variantImages,
  setVariantImages,
}) {
  const handleVariantImageChange = (color, files) => {
    const newFiles = Array.from(files);
    setVariantImages((prev) => ({
      ...prev,
      [color]: newFiles,
    }));
  };

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl">
      <h1 className="font-semibold">Images</h1>
      {data?.isVariable ? (
        <>
          {/* Variant Images */}
          {data?.colors?.map((color) => (
            <div key={color} className="flex flex-col gap-1">
              <h2 className="text-sm font-medium capitalize">{color} Variant Images</h2>
              {variantImages[color]?.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {variantImages[color].map((item, index) => (
                    <img
                      className="w-20 object-cover rounded-lg"
                      src={URL.createObjectURL(item)}
                      alt=""
                      key={index}
                    />
                  ))}
                </div>
              )}
              {data?.variantImages?.[color]?.length > 0 && !variantImages[color] && (
                <div className="flex flex-wrap gap-3">
                  {data?.variantImages[color].map((item, index) => (
                    <img
                      className="w-20 object-cover rounded-lg"
                      src={item}
                      alt=""
                      key={index}
                    />
                  ))}
                </div>
              )}
              <label
                className="text-gray-500 text-xs"
                htmlFor={`variant-images-${color}`}
              >
                {color} Images <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id={`variant-images-${color}`}
                name={`variant-images-${color}`}
                multiple
                onChange={(e) => handleVariantImageChange(color, e.target.files)}
                className="border px-4 py-2 rounded-lg w-full outline-none"
              />
            </div>
          ))}
          {/* Feature Image for Variable Products */}
          <div className="flex flex-col gap-1">
            {data?.featureImageURL && !featureImage && (
              <div className="flex justify-center">
                <img
                  className="h-20 object-cover rounded-lg"
                  src={data?.featureImageURL}
                  alt=""
                />
              </div>
            )}
            {featureImage && (
              <div className="flex justify-center">
                <img
                  className="h-20 object-cover rounded-lg"
                  src={URL.createObjectURL(featureImage)}
                  alt=""
                />
              </div>
            )}
            <label
              className="text-gray-500 text-xs"
              htmlFor="product-feature-image"
            >
              Feature Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="product-feature-image"
              name="product-feature-image"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setFeatureImage(e.target.files[0]);
                }
              }}
              className="border px-4 py-2 rounded-lg w-full outline-none"
            />
          </div>
          {/* Image List for Variable Products */}
          <div className="flex flex-col gap-1">
            {imageList?.length === 0 && data?.imageList?.length !== 0 && (
              <div className="flex flex-wrap gap-3">
                {data?.imageList?.map((item, index) => (
                  <img
                    className="w-20 object-cover rounded-lg"
                    src={item}
                    alt=""
                    key={index}
                  />
                ))}
              </div>
            )}
            {imageList?.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {imageList?.map((item, index) => (
                  <img
                    className="w-20 object-cover rounded-lg"
                    src={URL.createObjectURL(item)}
                    alt=""
                    key={index}
                  />
                ))}
              </div>
            )}
            <label className="text-gray-500 text-xs" htmlFor="product-images">
              Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="product-images"
              name="product-images"
              multiple
              onChange={(e) => {
                const newFiles = Array.from(e.target.files);
                setImageList(newFiles);
              }}
              className="border px-4 py-2 rounded-lg w-full outline-none"
            />
          </div>
        </>
      ) : (
        <>
          {/* Feature Image for Non-Variable Products */}
          <div className="flex flex-col gap-1">
            {data?.featureImageURL && !featureImage && (
              <div className="flex justify-center">
                <img
                  className="h-20 object-cover rounded-lg"
                  src={data?.featureImageURL}
                  alt=""
                />
              </div>
            )}
            {featureImage && (
              <div className="flex justify-center">
                <img
                  className="h-20 object-cover rounded-lg"
                  src={URL.createObjectURL(featureImage)}
                  alt=""
                />
              </div>
            )}
            <label
              className="text-gray-500 text-xs"
              htmlFor="product-feature-image"
            >
              Feature Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="product-feature-image"
              name="product-feature-image"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setFeatureImage(e.target.files[0]);
                }
              }}
              className="border px-4 py-2 rounded-lg w-full outline-none"
            />
          </div>
          {/* Image List for Non-Variable Products */}
          <div className="flex flex-col gap-1">
            {imageList?.length === 0 && data?.imageList?.length !== 0 && (
              <div className="flex flex-wrap gap-3">
                {data?.imageList?.map((item, index) => (
                  <img
                    className="w-20 object-cover rounded-lg"
                    src={item}
                    alt=""
                    key={index}
                  />
                ))}
              </div>
            )}
            {imageList?.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {imageList?.map((item, index) => (
                  <img
                    className="w-20 object-cover rounded-lg"
                    src={URL.createObjectURL(item)}
                    alt=""
                    key={index}
                  />
                ))}
              </div>
            )}
            <label className="text-gray-500 text-xs" htmlFor="product-images">
              Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="product-images"
              name="product-images"
              multiple
              onChange={(e) => {
                const newFiles = Array.from(e.target.files);
                setImageList(newFiles);
              }}
              className="border px-4 py-2 rounded-lg w-full outline-none"
            />
          </div>
        </>
      )}
    </section>
  );
}