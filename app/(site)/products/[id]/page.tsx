import getProduct, { Product } from "@/lib/getProduct";
import Image from "next/image";

interface ProductDetailsProps {
  params: { id: string };
}

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  const { id } = await params;

  const product: Product = await getProduct(id);

  return (
    <div className="container mx-auto px-4 py-16 mt-16 md:mt-20">
      <div className="bg-white shadow-xl rounded-xl p-6 md:p-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        
        <div className="md:w-1/3 p-4 bg-gray-50 rounded-lg relative h-64 md:h-80 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-2/3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            {product.title}
          </h1>

          {/* Price */}
          <p className="text-4xl font-bold text-indigo-600 mb-4">
            ${product.price.toFixed(2)}
          </p>

          {/* Category */}
          <p className="text-sm text-gray-500 mb-6 uppercase">
            Category:{" "}
            <span className="font-semibold text-gray-700">
              {product.category}
            </span>
          </p>

          {/* Description */}
          <h2 className="text-xl font-semibold text-gray-800 mb-3 border-t pt-4">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Rating + Button */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center text-yellow-500 font-bold">
              ⭐ {product.rating.rate.toFixed(1)}
              <span className="text-gray-500 ml-2 text-sm">
                ({product.rating.count} reviews)
              </span>
            </div>

           <div className="flex flex-col gap-y-2.5 md:flex-row space-x-2.5">
             <button className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300 shadow-md">
              Add to Cart
            </button>
            <button className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300 shadow-md">
              Buy Now
            </button>
           </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
