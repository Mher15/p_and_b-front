import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBrand, IFormBrand } from "../../app/types";
import { endpointsTags } from "../../app/constants";

const { BRAND } = endpointsTags;

interface IEditRequestParams {
  editedBrand: IFormBrand;
  id: number;
}

export const brandsApiSlice = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/brands`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [BRAND],
  endpoints: (builder) => ({
    fetchBrands: builder.query<IBrand[], number | void>({
      query: () => "/",
      providesTags: () => [BRAND],
    }),
    fetchBrand: builder.query<IBrand, number>({
      query: (id) => `/${id}`,
    }),
    addBrand: builder.mutation<IBrand, IFormBrand>({
      query: (group) => ({
        url: `/`,
        method: "POST",
        body: group,
      }),
      invalidatesTags: [BRAND],
    }),
    updateBrand: builder.mutation<IBrand, IEditRequestParams>({
      query: ({ id, editedBrand }) => ({
        url: `/${id}`,
        method: "PUT",
        body: editedBrand,
      }),
      invalidatesTags: [BRAND],
    }),
    deleteBrand: builder.mutation<IBrand, IBrand>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [BRAND],
    }),
  }),
});

export const {
  useFetchBrandsQuery,
  useFetchBrandQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApiSlice;
