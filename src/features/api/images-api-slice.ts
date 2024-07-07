import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imagesApiSlice = createApi({
  reducerPath: "imagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/images`,
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    deleteImage: builder.mutation<number, string>({
      query: (fileName) => ({
        url: `/${fileName}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteImageMutation } = imagesApiSlice;
