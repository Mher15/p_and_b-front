import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../../app/types";
import { endpointsTags } from "../../app/constants";

const { FAVORITE_PRODUCT } = endpointsTags;

export const favoriteProductsApiSlice = createApi({
  reducerPath: "favoriteProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/favorite-products`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [FAVORITE_PRODUCT],
  endpoints: (builder) => ({
    fetchFavoriteProducts: builder.query<IProduct[], number | void>({
      query: () => "/",
      providesTags: () => [FAVORITE_PRODUCT],
    }),
    addFavoriteProduct: builder.mutation<IProduct, FormData>({
      query: (product) => ({
        url: `/`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: [FAVORITE_PRODUCT],
    }),
    deleteFavoriteProduct: builder.mutation<IProduct, IProduct>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [FAVORITE_PRODUCT],
    }),
  }),
});

export const {
  useFetchFavoriteProductsQuery,
  useAddFavoriteProductMutation,
  useDeleteFavoriteProductMutation,
} = favoriteProductsApiSlice;
