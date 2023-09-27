import { ORDER_URL } from "../constants/api.constants";
import { apiSlice } from "./api.slice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = orderApiSlice;
