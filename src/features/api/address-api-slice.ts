import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICity, ICountry, IRegion } from "../../app/types";

export const addressApiSlice = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/address`,
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    fetchCountries: builder.query<ICountry[], void>({
      query: () => ({
        url: "/countries",
      }),
    }),
    fetchRegions: builder.query<IRegion[], void>({
      query: () => ({
        url: "/regions",
      }),
    }),
    fetchCities: builder.query<ICity[], void>({
      query: () => ({
        url: "/cities",
      }),
    }),
  }),
});

export const {
  useFetchCountriesQuery,
  useFetchRegionsQuery,
  useFetchCitiesQuery,
} = addressApiSlice;
