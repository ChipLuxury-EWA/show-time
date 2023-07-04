import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { BASE_URL } from "../constants/api.constants";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as any, //TODO tompo ts edit this type any to BaseQueryFN type
  tagTypes: ["Show", "Order", "User"],
  endpoints: (builder) => ({}),
});
