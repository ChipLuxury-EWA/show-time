import { createSlice } from "@reduxjs/toolkit";
import { addToCartUtil } from "../utils/addToCart.util";

const getCartStateFromLocalStorage = localStorage.getItem("cart");
const initialState = getCartStateFromLocalStorage ? JSON.parse(getCartStateFromLocalStorage) : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => addToCartUtil(state, action),
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
