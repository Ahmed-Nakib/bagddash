// app/checkout/page.tsx
'use client';

import React from 'react';
import { ShoppingBag, CreditCard, User, Truck } from 'lucide-react';

// --- Utility and Mock Data ---

interface Totals {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

// Mock Totals (In a real app, this would come from the cart state)
const mockTotals: Totals = {
    subtotal: 254.49,
    shipping: 0.00,
    tax: 20.36,
    total: 274.85,
};

// --- Form Input Component (Reused) ---
interface InputProps {
    label: string;
    id: string;
    type?: string;
    placeholder: string;
    required?: boolean;
}

const CheckoutInput: React.FC<InputProps> = ({ label, id, type = 'text', placeholder, required = true }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        />
    </div>
);


// --- Main Checkout Component ---
const CheckoutPage: React.FC = () => {
    
    // In a real app, form submission logic would go here
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Checkout form submitted! (Simulated)');
    };

    return (
        <div className="container mx-auto px-4 py-16 mt-16 md:mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-10 border-b pb-4 flex items-center">
                <ShoppingBag className="w-8 h-8 mr-3 text-indigo-600" />
                Proceed to Checkout
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
                
                {/* 1. 🚚 Shipping and Payment Form (Left/Main Column) */}
                <div className="lg:w-2/3 space-y-8 order-2 lg:order-1">
                    
                    {/* Contact & Shipping Info */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
                            <User className="w-5 h-5 mr-3 text-indigo-500" /> Shipping Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CheckoutInput label="Full Name" id="fullName" placeholder="John Doe" />
                            <CheckoutInput label="Email Address" id="email" type="email" placeholder="john@example.com" />
                            <div className="md:col-span-2">
                                <CheckoutInput label="Shipping Address" id="address" placeholder="123 Main St" />
                            </div>
                            <CheckoutInput label="City" id="city" placeholder="Anytown" />
                            <CheckoutInput label="Zip Code" id="zip" placeholder="12345" />
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
                            <CreditCard className="w-5 h-5 mr-3 text-indigo-500" /> Payment Method
                        </h2>
                        
                        <div className="bg-indigo-50 border-2 border-indigo-200 p-4 rounded-lg flex items-center mb-4">
                            <input type="radio" id="card" name="paymentMethod" value="card" defaultChecked className="mr-3 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="card" className="font-semibold text-gray-700">Credit/Debit Card</label>
                        </div>
                        
                        <CheckoutInput label="Card Number" id="cardNumber" type="text" placeholder="XXXX XXXX XXXX XXXX" />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <CheckoutInput label="Expiration (MM/YY)" id="expiry" placeholder="01/26" />
                            <CheckoutInput label="CVV" id="cvv" placeholder="123" />
                        </div>
                    </div>

                </div>

                {/* 2. 📝 Order Summary (Right/Sidebar Column) */}
                <div className="lg:w-1/3 order-1 lg:order-2">
                    <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                            Your Order
                        </h2>
                        
                        {/* Summary Breakdown */}
                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between">
                                <span>Items Subtotal:</span>
                                <span className="font-medium">${mockTotals.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span className="font-medium">{mockTotals.shipping === 0 ? 'Free' : `$${mockTotals.shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax:</span>
                                <span className="font-medium">${mockTotals.tax.toFixed(2)}</span>
                            </div>
                            
                            <div className="border-t pt-4 mt-4 flex justify-between text-xl font-bold text-gray-900">
                                <span>Order Total:</span>
                                <span>${mockTotals.total.toFixed(2)}</span>
                            </div>
                        </div>
                        
                        {/* Place Order Button */}
                        <button type="submit" className="w-full mt-8 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-xl flex items-center justify-center">
                            <Truck className="w-5 h-5 mr-2" />
                            Place Order (${mockTotals.total.toFixed(2)})
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default CheckoutPage;