// app/cart/page.tsx

import React from 'react';
import CartItem from "@/components/CartItem"; // CartItem component imported
import Link from 'next/link';

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Mock/Placeholder Cart Data (No changes here)
const cartItems: Item[] = [
  { id: 101, name: 'Premium T-Shirt', price: 29.99, quantity: 2, image: '/images/tshirt.jpg' },
  { id: 102, name: 'Wireless Headphones', price: 149.50, quantity: 1, image: '/images/headphones.jpg' },
  { id: 103, name: 'Minimalist Backpack', price: 75.00, quantity: 1, image: '/images/backpack.jpg' },
];

/**
 * Utility function to calculate the cart totals (No changes here)
 */
const calculateTotals = (items: Item[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.08; 
  const tax = subtotal * taxRate;
  const shipping = subtotal > 100 ? 0 : 10.00;
  const total = subtotal + tax + shipping;
  return { subtotal, tax, shipping, total };
};


const CartPage = () => {
  const totals = calculateTotals(cartItems);

  return (
    <div className="container mx-auto px-4 py-16 mt-16 md:mt-20">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 border-b pb-4">
        🛒 Your Shopping Cart
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* === Cart Items List (Left Column) === */}
        {/* On smaller screens, it takes full width (w-full). On large screens, it takes 3/4 (lg:w-3/4). */}
        <div className="w-full lg:w-3/4 bg-white p-6 rounded-xl shadow-lg order-2 lg:order-1"> 
          {/* order-2/order-1 ensures summary stays at the top on mobile if needed, though usually cart list comes first. */}
          
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
          )}
        </div>

        {/* === Order Summary (Right Column) === */}
        {/* On smaller screens, it takes full width (w-full). On large screens, it takes 1/4 (lg:w-1/4). */}
        <div className="w-full lg:w-1/4 order-1 lg:order-2">
          <div className="bg-indigo-50 p-6 rounded-xl shadow-lg border border-indigo-200 sticky top-24">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-3">
              Order Summary
            </h2>
            
            {/* Totals Breakdown */}
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-medium">{totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%):</span>
                <span className="font-medium">${totals.tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-4 mt-4 flex justify-between text-xl font-bold text-gray-900">
                <span>Order Total:</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button className="w-full mt-8 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md">
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;