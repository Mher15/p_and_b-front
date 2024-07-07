import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IOrder,
  IOrderCreate,
  IOrderCreateResponse,
  IOrderPaymentResponse,
} from "../../app/types";
import { endpointsTags } from "../../app/constants";

const { ORDERS } = endpointsTags;

interface ICreateOrderParams {
  order: IOrderCreate;
  userId: number;
}

interface IOrderPaymentParams {
  orderId: number;
}

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/orders`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [ORDERS],
  endpoints: (builder) => ({
    fetchOrders: builder.query<IOrder[], number>({
      query: () => "/",
      providesTags: () => [ORDERS],
    }),
    fetchOrder: builder.query<IOrder, number>({
      query: (id) => `/${id}`,
    }),
    addOrder: builder.mutation<IOrderCreateResponse, ICreateOrderParams>({
      query: ({ order, userId }) => ({
        url: `/${userId}`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: [ORDERS],
    }),
    orderPay: builder.mutation<IOrderPaymentResponse, IOrderPaymentParams>({
      query: ({ orderId }) => ({
        url: `/${orderId}/pay`,
        method: "POST",
      }),
      invalidatesTags: [ORDERS],
    }),
  }),
});

export const {
  useFetchOrdersQuery,
  useFetchOrderQuery,
  useAddOrderMutation,
  useOrderPayMutation,
} = orderApiSlice;
