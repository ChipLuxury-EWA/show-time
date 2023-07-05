import { createSlice } from "@reduxjs/toolkit";

const getCartStateFromLocalStorage = localStorage.getItem("cart");
const initialState = getCartStateFromLocalStorage ? JSON.parse(getCartStateFromLocalStorage) : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer