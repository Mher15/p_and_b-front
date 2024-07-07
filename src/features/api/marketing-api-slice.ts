import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMarketing } from "../../app/types";
import { endpointsTags } from "../../app/constants";

const { MARKETING } = endpointsTags;

export const marketingApiSlice = createApi({
  reducerPath: "marketingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/marketing`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [MARKETING],
  endpoints: (builder) => ({
    fetchMarketing: builder.query<IMarketing, void>({
      query: () => "/",
      providesTags: () => [endpointsTags.COMPANY_INFO],
    }),
    addMarketing: builder.mutation<IMarketing, IMarketing>({
      query: (companyInfo) => ({
        url: `/`,
        method: "POST",
        body: companyInfo,
      }),
      invalidatesTags: [MARKETING],
    }),
    updateMarketing: builder.mutation<IMarketing, IMarketing>({
      query: (companyInfo) => ({
        url: `/`,
        method: "PUT",
        body: companyInfo,
      }),
      invalidatesTags: [MARKETING],
    }),
    calculate: builder.query<string, void>({
      query: () => `/calculateRewards`,
    }),
  }),
});

export const {
  useFetchMarketingQuery,
  useAddMarketingMutation,
  useUpdateMarketingMutation,
  useLazyCalculateQuery,
} = marketingApiSlice;
