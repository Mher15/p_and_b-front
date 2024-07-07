import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IStore, IStoreItem } from "../../app/types";
import { endpointsTags } from "../../app/constants";

const { STORE } = endpointsTags;

export const storeApiSlice = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/store`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [STORE],
  endpoints: (builder) => ({
    fetchStore: builder.query<IStore, number | void>({
      query: () => "/",
      providesTags: () => [STORE],
    }),
    updateStore: builder.mutation<IStoreItem[], IStoreItem[]>({
      query: (storeItems) => {
        return {
          url: `/update`,
          method: "POST",
          body: storeItems,
        };
      },
      invalidatesTags: [STORE],
    }),
    fetchCatalogProducts: builder.mutation<IStoreItem[], IStoreItem[]>({
      query: (storeItems) => {
        return {
          url: `/update`,
          method: "POST",
          body: storeItems,
        };
      },
    }),
  }),
});

export const { useFetchStoreQuery, useUpdateStoreMutation } = storeApiSlice;
