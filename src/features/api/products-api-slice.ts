import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFormProduct, IProduct } from "../../app/types";
import { endpointsTags } from "../../app/constants";
interface IEditRequestParams {
  editedProduct: IFormProduct;
  id: number;
}

interface IDeleteRequestParams {
  fileName: string;
  productId: number;
}

const { PRODUCT } = endpointsTags;

export const productsApiSlice = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/products`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [PRODUCT],
  endpoints: (builder) => ({
    fetchProducts: builder.query<IProduct[], number | void>({
      query: () => "/",
      providesTags: () => [PRODUCT],
    }),
    fetchFavoriteProducts: builder.query<IProduct[], number | void>({
      query: () => "/favorite",
    }),
    fetchProduct: builder.query<IProduct, number>({
      query: (id) => `/${id}`,
    }),
    addProduct: builder.mutation<IProduct, IFormProduct>({
      query: (product) => ({
        url: `/`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: [PRODUCT],
    }),
    updateProduct: builder.mutation<IProduct, IEditRequestParams>({
      query: ({ id, editedProduct }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body: editedProduct,
        };
      },
      invalidatesTags: [PRODUCT],
    }),
    deleteProduct: builder.mutation<string, number>({
      query: (productId) => ({
        url: `/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [PRODUCT],
    }),
    deleteProductImage: builder.mutation<string, IDeleteRequestParams>({
      query: ({ fileName, productId }) => ({
        url: `/${productId}/image/${fileName}`,
        method: "DELETE",
      }),
      invalidatesTags: [PRODUCT],
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchFavoriteProductsQuery,
  useDeleteProductImageMutation,
} = productsApiSlice;
