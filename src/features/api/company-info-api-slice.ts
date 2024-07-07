import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICompanyInfo } from "../../app/types";
import { endpointsTags } from "../../app/constants";

const { COMPANY_INFO } = endpointsTags;

export const companyInfoApiSlice = createApi({
  reducerPath: "companyInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/companyInfo`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [COMPANY_INFO],
  endpoints: (builder) => ({
    fetchCompanyInfo: builder.query<ICompanyInfo, void>({
      query: () => "/",
      providesTags: () => [endpointsTags.COMPANY_INFO],
    }),
    addCompanyInfo: builder.mutation<ICompanyInfo, ICompanyInfo>({
      query: (companyInfo) => ({
        url: `/`,
        method: "POST",
        body: companyInfo,
      }),
      invalidatesTags: [endpointsTags.COMPANY_INFO],
    }),
    updateCompanyInfo: builder.mutation<ICompanyInfo, ICompanyInfo>({
      query: (companyInfo) => ({
        url: `/`,
        method: "PUT",
        body: companyInfo,
      }),
      invalidatesTags: [endpointsTags.COMPANY_INFO],
    }),
  }),
});

export const {
  useFetchCompanyInfoQuery,
  useAddCompanyInfoMutation,
  useUpdateCompanyInfoMutation,
} = companyInfoApiSlice;
