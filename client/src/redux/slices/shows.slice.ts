import { SHOWS_URL } from "../constants/api.constants";
import { apiSlice } from "./api.slice";

interface IShow {
  _id: string;
  categoryId: any;
  ticketsIds: any;
  sellerId: any;
  name: string;
  price: number;
  location: number;
  address: string;
  image: string;
  date: Date;
  time: number;
  minutesBeforePurchase: number;
  description: string;
  duration: number;
  cast: string[];
  rate: number;
}

export const showSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllShows: builder.query<[IShow], void>({
      //TODO tompo add the right type here - replace void
      query: () => ({
        url: SHOWS_URL,
      }),
    }),
    getShowById: builder.query<IShow, IShow>({
      //TODO tompo add the right type here - replace void
      query: (id) => ({
        url: `${SHOWS_URL}/${id}`,
      }),
    }),
  }),
});

export const { useGetAllShowsQuery, useGetShowByIdQuery } = showSlice;
