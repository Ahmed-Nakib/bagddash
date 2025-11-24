/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export default function CreateProduct() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    price: "",
    description: "",
    image: null as File | null,
  });

  const submit = async (e: any) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("subtitle", form.subtitle);
    fd.append("price", form.price);
    fd.append("description", form.description);
    fd.append("image", form.image as File);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "x-admin-token": localStorage.getItem("admin-token") || "",
      },
      body: fd,
    });

    const data = await res.json();
    if (data.success) {
      alert("Product created!");
      window.location.href = "/admin/products";
    }
  };

  return (
    <form onSubmit={submit} className="max-w-lg mx-auto p-6 space-y-3">
      <h1 className="text-xl font-bold">Create Product</h1>

      <input
        className="border p-2 w-full"
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Subtitle"
        onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
      />

      <input
        className="border p-2 w-full"
        type="number"
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="file"
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, image: e.target.files?.[0] || null })
        }
      />

      <button className="bg-green-600 text-white p-2 rounded w-full">
        Create
      </button>
    </form>
  );
}
