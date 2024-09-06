import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpointsTags } from "../../app/constants";

const { PROFILE } = endpointsTags;


export const officeApiSlice = createApi({
  reducerPath: "officeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/user`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [PROFILE],
  endpoints: (builder) => ({
    fetchOffice: builder.query<any, number | void>({
      query: (userId) => `/my-office/${userId}`,
    }),
  }),
});

export const { useFetchOfficeQuery } = officeApiSlice;
