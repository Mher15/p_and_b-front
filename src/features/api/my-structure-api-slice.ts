import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpointsTags } from "../../app/constants";

const { PROFILE } = endpointsTags;


export const myStructureApiSlice = createApi({
  reducerPath: "myStructureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/user`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [PROFILE],
  endpoints: (builder) => ({
    fetchStructure: builder.query<any, number | void>({
      query: (userId) => `/my-structure/${userId}`,
    }),
  }),
});

export const { useFetchStructureQuery } = myStructureApiSlice;
