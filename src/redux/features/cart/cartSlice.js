import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/cartUtils";

const initialState = (() => {
  try {
    const cart = localStorage.getItem("cart");
    return cart
      ? JSON.parse(cart)
      : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
  } catch (error) {
    console.warn("Failed to load cart from localStorage:", error);
    return { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
  }
})();
// Removes unnecessary fields (user, rating, numReviews, reviews) from the product data
// Uses underscore variables to ignore these fields
// Keeps only the essential product information in the item variable
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        user: _,
        rating: __,
        numReviews: ___,
        reviews: ____,
        ...item
      } = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state, item);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
