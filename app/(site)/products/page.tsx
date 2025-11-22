import { Button } from "@/components/ui/button";
import getAllProducts from "@/lib/getAllProducts";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Product = async () => {
  const products = await getAllProducts();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-10 px-5">
      {products.map((product: Product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
        <Link
        href={`/products/${product.id}`}
        >
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="object-contain mx-auto"
          />
        </Link>
          <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
            {product.title}
          </h3>
          <p className="mt-2 font-semibold text-gray-900">Price: ${product.price}</p>
          <p className="text-gray-500 text-sm">Category: {product.category}</p>
          <div className="grid grid-cols gap-y-3 mt-5">
            <Button>Add Cart</Button>
            <Button>Buy Now</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
