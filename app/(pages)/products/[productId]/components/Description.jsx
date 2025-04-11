function Description({ product }) {
  const defaultDescription = `Got a broken display in your Samsung Galaxy S10 Plus? Buy the complete LCD with Touch Screen for Samsung Galaxy S10 Plus - Black and replace the broken, cracked, or scratched screen in your handset. 100% Perfect fit with high manufacturing quality. With minimal technical know-how required, it is the easiest display to replace for your handset. 
The replacement combo LCD with touch for Samsung Galaxy S10 Plus comes with a manufacturing defect warranty, and the shipping is done in secure packing to ensure you get the product in perfect shape.`;

  const descriptionPoints = [
    "Easiest part type available for Samsung Galaxy S10 Plus to replace with minimal technical knowledge required.",
    "High-quality product with 100% perfect fit.",
    "Complete display combo with LCD screen and digitizer touch screen.",
    "Brand-new product with manufacturing defect warranty.",
  ];

  return (
    <section className="w-full py-10 px-4">
      <div className="max-w-8xl mx-auto bg-gray-100 p-6 md:p-10 ">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 border-b border-gray-400">
          Product Details
        </h2>
        <p className="text-gray-600  text-sm  md:text-lg leading-relaxed mb-6 mt-2 ">
          {product?.description || defaultDescription}
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-3 text-base md:text-md">
          {descriptionPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Description;