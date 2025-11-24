"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);

  const load = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      // Check if API returned array or object with products
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
      setProducts([]);
    }
  };

  const del = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": localStorage.getItem("admin-token") || "",
        },
      });
      load(); // refresh list after delete
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      <Link
        href="/dashboard/create"
        className="bg-blue-600 text-white p-2 rounded inline-block mb-4"
      >
        + Add Product
      </Link>

      {products.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map((p) => (
          <div key={p._id} className="border p-3 rounded shadow">
            <Image
              src={p.image}
              alt={p.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="font-bold mt-2">{p.title}</h2>
            <p>{p.subtitle}</p>
            <p className="font-bold">${p.price}</p>

            <button
              onClick={() => del(p._id)}
              className="bg-red-500 text-white p-2 mt-2 rounded w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
