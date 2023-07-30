import { createSlice } from "@reduxjs/toolkit";
import { addToCartUtil, removeFromCartUtil } from "../utils/cart.utils";

const getCartStateFromLocalStorage = localStorage.getItem("cart");
const initialState = getCartStateFromLocalStorage ? JSON.parse(getCartStateFromLocalStorage) : { cartItems: [] };

const cartSlice: any = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => addToCartUtil(state, action),
    removeFromCart: (state, action) => removeFromCartUtil(state, action),
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
