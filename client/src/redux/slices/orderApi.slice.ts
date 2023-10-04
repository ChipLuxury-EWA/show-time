import { ORDER_URL } from "../constants/api.constants";
import { apiSlice } from "./api.slice";
import { IOrder } from "../../components/OrderSummary";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query<IOrder, string>({
      query: (orderId: string) => ({
        url: `${ORDER_URL}/${orderId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = orderApiSlice;
