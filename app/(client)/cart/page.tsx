"use client";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import { RootState } from "@/store/store";
import { clearCart, removeFromCart, updateQuantity } from "@/features/cart/cartSlice";
import CheckoutPopup from "@/components/CheckoutPopup";

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");

  if (cart.length === 0)
    return <p className="text-center mt-10">Your cart is empty.</p>;

  const cartTotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const deliveryCost = paymentMethod === "cod" ? 5 : 0;
  const finalTotal = cartTotal + deliveryCost;

  const handleIncrease = (id: string) => {
    const item = cart.find(p => p._id === id);
    if (item) dispatch(updateQuantity({ _id: id, quantity: (item.quantity || 1) + 1 }));
  };

  const handleDecrease = (id: string) => {
    const item = cart.find(p => p._id === id);
    if (item && (item.quantity || 1) > 1) {
      dispatch(updateQuantity({ _id: id, quantity: (item.quantity || 1) - 1 }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item._id} className="flex items-center gap-4 bg-[#F5F5F5] p-4 rounded-lg">
            <div className="relative w-24 h-24">
              <Image src={item.image} alt={item.title} fill className="object-contain rounded" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <button
                  className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => handleDecrease(item._id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => handleIncrease(item._id)}
                >
                  +
                </button>
              </div>
              <p className="text-red-600 font-bold mt-1">
                ${(item.price * (item.quantity || 1)).toFixed(2)}
              </p>
            </div>
            <button
              className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-800"
              onClick={() => dispatch(removeFromCart(item._id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Payment method selector for delivery cost preview */}
      <div className="mt-6">
        <p className="font-semibold mb-2">Payment Method (affects delivery cost)</p>
        <label className="flex items-center gap-2 mr-4">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          Cash on Delivery (+$5)
        </label>
        {/* <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="online"
            checked={paymentMethod === "online"}
            onChange={() => setPaymentMethod("online")}
          />
          Online Payment
        </label> */}
      </div>

      <div className="mt-4 text-right space-y-2">
        <p className="text-lg font-bold">Cart Total: ${cartTotal.toFixed(2)}</p>
        {deliveryCost > 0 && <p className="text-lg font-bold">Delivery: ${deliveryCost.toFixed(2)}</p>}
        <p className="text-xl font-bold">Final Total: ${finalTotal.toFixed(2)}</p>

        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
            onClick={() => setShowPopup(true)}
          >
            Proceed to Buy
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      </div>

      {showPopup && <CheckoutPopup onClose={() => setShowPopup(false)} total={finalTotal} />}
    </div>
  );
}
