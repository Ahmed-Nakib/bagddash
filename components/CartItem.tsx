// components/CartItem.tsx
'use client';

import React from 'react';

// Item data structure (unchanged)
interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: Item;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const itemTotal = item.price * item.quantity;

  return (
    // Outer Container: Mobile-first responsive grid layout
    // md:grid-cols-[1fr_auto_auto] ensures good spacing on medium/large screens
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 md:gap-6 py-4 border-b border-gray-200 items-center">
      
      {/* 1. Item Details (Image + Name/Price) */}
      <div className="flex items-start space-x-4 col-span-full md:col-auto">
        {/* Placeholder for Product Image */}
        <div className="h-16 w-16 bg-gray-200 rounded-md flex-shrink-0">
            {/* Image Tag can be used here later */}
        </div>
        
        {/* Item Info */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)} per unit</p>
        </div>
      </div>

      {/* 2. Quantity Controls (Mid Column on Desktop) */}
      {/* Mobile: Use order-3 to place it under name but before total */}
      <div className="flex justify-start md:justify-center order-3 md:order-2"> 
        <div className="flex items-center border rounded-lg overflow-hidden">
          {/* In a real app, these buttons would use useState/useReducer */}
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition">-</button>
          <span className="px-3 py-1 text-sm font-medium border-l border-r">{item.quantity}</span>
          <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition">+</button>
        </div>
      </div>
      
      {/* 3. Total Price and Remove Button (Last Column on Desktop) */}
      {/* Mobile: Use order-2 to place it beside quantity or slightly higher */}
      <div className="flex justify-between md:justify-end items-center space-x-4 order-2 md:order-3"> 
          {/* Total Price */}
          <p className="text-base sm:text-lg font-bold text-gray-900 w-20 text-right">
            ${itemTotal.toFixed(2)}
          </p>
          
          {/* Remove Button */}
          <button className="text-red-500 hover:text-red-700 transition flex-shrink-0">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
      </div>
    </div>
  );
};

export default CartItem;