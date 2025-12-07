"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import CheckoutPopup from "@/components/CheckoutPopup";

interface Product {
  _id: string;
  title: string;
  subtitle: string;
  price: number;
  details: string;
  image?: string;
}

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    if (!params?.id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setProduct(data.product || null);
      } catch (err: any) {
        console.error("Failed to load product:", err);
        setError(err.message || "Something went wrong");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params?.id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found!</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Checkout Popup */}
      {openPopup && (
        <CheckoutPopup total={product.price} onClose={() => setOpenPopup(false)} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-gray-100 p-6 rounded-xl flex items-center justify-center">
          <div className="relative w-full aspect-square">
            <Image
              src={product.image && product.image !== "" ? product.image : "/images/fallback.png"} // fallback
              alt={product.title || "Product Image"}
              fill
              className="object-contain rounded-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          <button
            className="text-sm text-gray-500 hover:underline w-fit"
            onClick={() => router.back()}
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold">{product.title}</h1>
          <h2 className="text-lg text-gray-700">{product.subtitle}</h2>

          <p className="text-2xl font-bold text-red-600">${product.price}</p>

          <p className="text-gray-600 leading-relaxed">{product.details}</p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex-1"
              onClick={() => dispatch(addToCart(product))}
            >
              Add To Cart
            </button>

            <button
              className="border border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-600 hover:text-white flex-1"
              onClick={() => setOpenPopup(true)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
