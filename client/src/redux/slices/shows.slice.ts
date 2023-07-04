import { SHOWS_URL } from "../constants/api.constants";
import { apiSlice } from "./api.slice";

interface IShow {
  _id: string;
}

export const showSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllShows: builder.query<[IShow], void>({ //TODO tompo add the right type here
      query: () => ({
        url: SHOWS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllShowsQuery } = showSlice;
