import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IOrder,
} from "../../app/types";
import { endpointsTags } from "../../app/constants";

const { ORDERS } = endpointsTags;


export const ordersApiSlice = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/orders`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [ORDERS],
  endpoints: (builder) => ({
    fetchMyOrders: builder.query<IOrder[], number>({
      query: (userId) => `get/${userId}`,
    }),
  }),
});

export const {
  useFetchMyOrdersQuery,
} = ordersApiSlice