import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api.slice";
import cartSliceReducer from "./slices/cart.slice";
import authSliceReducer from "./slices/auth.slice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
