"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/features/cart/cartSlice";

interface CheckoutPopupProps {
  onClose: () => void;
  total: number;
}

export default function CheckoutPopup({ onClose, total }: CheckoutPopupProps) {
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const dispatch = useDispatch();

  // Redux cart state
  const cartItems = useSelector((state: any) => state.cart.items);

  const deliveryCost = 75;
  const finalTotal = paymentMethod === "cod" ? total + deliveryCost : total;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    if (!phone) {
      alert("Phone number is required!");
      return;
    }

    // Data to send to backend
    const orderData = {
      name,
      phone,
      address,
      paymentMethod,
      total: finalTotal,
      products: cartItems, // full cart items
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (result.success) {
        alert("Order Saved Successfully!");
        dispatch(clearCart());
        onClose();
      } else {
        alert("Failed to save order");
      }
    } catch (error) {
      alert("Server error!");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Enter your details</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="border px-3 py-2 rounded"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="border px-3 py-2 rounded"
          />

          <textarea
            name="address"
            placeholder="Address"
            required
            className="border px-3 py-2 rounded"
          />

          {/* Payment Method */}
          <div className="mt-2">
            <p className="font-semibold mb-1">Payment Method</p>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery (+${deliveryCost})
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
              />
              Online Payment
            </label>
          </div>

          <p className="font-bold mt-2">Total: ${finalTotal.toFixed(2)}</p>

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
