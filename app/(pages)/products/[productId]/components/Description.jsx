

function Description({ product }) {
  return (
    <>
      <section className="mt-10 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
        <p className="text-gray-700">{product?.description || `The Apple MacBook Air M1 (2020) is a revolutionary laptop designed to elevate your productivity and creativity. Powered by the groundbreaking Apple M1 chip, this device features an 8-core GPU and 16GB of RAM, delivering exceptional speed and performance for demanding applications, from graphic design to video editing.



The 256GB SSD provides fast storage and quick access to your files, ensuring that your workflow remains uninterrupted. The stunning 13.3-inch Retina display offers vibrant colors and sharp details, making everything from watching movies to working on projects a delight. With True Tone technology, the display adjusts to your environment for a more natural viewing experience.



The MacBook Air M1 boasts an impressive battery life of up to 18 hours, allowing you to work, browse, and stream without constantly worrying about charging. The fanless design ensures silent operation, making it perfect for use in quiet environments.



With macOS Big Sur, you'll enjoy a seamless user experience with access to a wide range of applications optimized for the M1 chip. The laptop also features a FaceTime HD camera, Touch ID for secure authentication, and multiple Thunderbolt 3 ports for versatile connectivity.`}</p>
      </section>
    </>
  )
}

export default Description