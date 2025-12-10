import { Product } from "@/type/productType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CartState {
  cart: Product[];
}

// Load cart from localStorage
const storedCart = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
const initialState: CartState = {
  cart: storedCart ? JSON.parse(storedCart) : [],
};

const saveCart = (cart: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existing = state.cart.find((p) => p._id === product._id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      saveCart(state.cart);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((p) => p._id !== action.payload);
      saveCart(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      saveCart(state.cart);
    },
    updateQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
      const item = state.cart.find((p) => p._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCart(state.cart);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
