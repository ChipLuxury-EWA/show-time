import { USER_URL } from "../constants/api.constants";
import { apiSlice } from "./api.slice";

export enum UserRoleEnum {
  ADMIN = "ADMIN",
  SHOW_ORGANIZER = "SHOW_ORGANIZER",
  BUYER = "BUYER",
}

export interface IUserDetailsForLogin {
  email: string;
  password: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<[IUserDetailsForLogin], IUserDetailsForLogin>({
      //TODO tompo add the right type here - replace void
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      //TODO tompo add the right type here - replace void
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = userApiSlice;
