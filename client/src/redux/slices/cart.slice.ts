import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartUtil,
  removeFromCartUtil,
  saveShippingAddressUtil,
  savePaymentMethodUtil,
  clearCartItemsUtil,
} from "../utils/cart.utils";

const getCartStateFromLocalStorage = localStorage.getItem("cart");
const initialState = getCartStateFromLocalStorage
  ? JSON.parse(getCartStateFromLocalStorage)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice: any = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => addToCartUtil(state, action),
    removeFromCart: (state, action) => removeFromCartUtil(state, action),
    saveShippingAddress: (state, action) => saveShippingAddressUtil(state, action),
    savePaymentMethod: (state, action) => savePaymentMethodUtil(state, action),
    clearCartItems: (state, action) => clearCartItemsUtil(state, action),
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
