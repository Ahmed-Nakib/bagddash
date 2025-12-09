"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import CheckoutPopup from "@/components/CheckoutPopup"; 
import {Product as CartProduct} from "@/features/cart/cartSlice"
import Link from "next/link";


function TopProduct() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // BUY NOW POPUP STATE
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedProductTotal, setSelectedProductTotal] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (Array.isArray(data)) setProducts(data);
        else if (data.products && Array.isArray(data.products)) setProducts(data.products);
        else setProducts([]);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (products.length === 0) return <p className="text-center mt-10">No products found.</p>;

  const handleBuyNow = (price: number) => {
    setSelectedProductTotal(price);
    setOpenPopup(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {openPopup && (
        <CheckoutPopup
          total={selectedProductTotal}
          onClose={() => setOpenPopup(false)}
        />
      )}

      <div className="grid gap-6 
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white">

        {products.map((product: CartProduct) => (
          <div
            key={product._id}
            className="bg-[#F5F5F5] p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            <div className="relative w-full aspect-square h-auto max-h-64 mb-4">
              <Link href={`/products/${product._id}`}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain rounded-lg"
              />
              </Link>
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <p className="font-semibold text-[#111111]">{product.title}</p>
              <p className="font-semibold text-[#111111]">{product.subtitle}</p>
              <p className="text-xl font-bold text-[#CC071E]">${product.price.toFixed(2)}</p>
              <p className="text-sm text-[#666666] line-clamp-3">{product.details}</p>
            </div>

            <div className="grid gap-2 mt-auto">
              <button
                className="w-full bg-[#CC071E] text-white px-4 py-2 rounded-md hover:bg-[#990514]"
                onClick={() => dispatch(addToCart(product))}
              >
                Add Cart
              </button>

              <button
                className="w-full border border-[#CC071E] text-[#CC071E] px-4 py-2 rounded-md hover:bg-[#CC071E] hover:text-white"
                onClick={() => handleBuyNow(product.price)}
              >
                Buy Now
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default TopProduct;
