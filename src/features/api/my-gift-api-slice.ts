import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpointsTags } from "../../app/constants";

const { PROFILE } = endpointsTags;


export const myGiftApiSlice = createApi({
  reducerPath: "myGiftApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/user`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [PROFILE],
  endpoints: (builder) => ({
    fetchGift: builder.query<any, number | void>({
      query: (userId) => `/my-gifts/${userId}`,
    }),
  }),
});

export const { useFetchGiftQuery } = myGiftApiSlice;
