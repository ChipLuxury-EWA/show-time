import { USERS_URL } from "../constants/api.constants";
import { apiSlice } from "./api.slice";

export enum UserRoleEnum {
  ADMIN = "ADMIN",
  SHOW_ORGANIZER = "SHOW_ORGANIZER",
  BUYER = "BUYER",
}

export interface IUserDetails {
  _id: string;
  name: string;
  email: string;
  role: keyof typeof UserRoleEnum;
  createdAt?: string;
  updatedAt?: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<[IUserDetails], void>({
      //TODO tompo add the right type here - replace void
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApiSlice;
