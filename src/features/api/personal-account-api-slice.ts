import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IPersonalAccountClient,
  IPersonalAccountPartner,
  IPersonalAccountTransaction,
} from "../../app/types";

export const personalAccountApiSlice = createApi({
  reducerPath: "personalAccount",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/personalAccount`,
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    fetchPrivateTradeTurnover: builder.query<number, string>({
      query: (referralId) => `/${referralId}/privateTradeTurnover`,
    }),
    fetchGroupTradeTurnover: builder.query<number, string>({
      query: (referralId) => `/${referralId}/groupTradeTurnover`,
    }),
    fetchMentorBonus: builder.query<number, string>({
      query: (referralId) => `/${referralId}/mentorBonus`,
    }),
    fetchAuthorBonus: builder.query<number, string>({
      query: (referralId) => `/${referralId}/authorBonus`,
    }),
    fetchClients: builder.query<IPersonalAccountClient[], string>({
      query: (referralId) => `/${referralId}/clients`,
    }),
    fetchPartners: builder.query<IPersonalAccountPartner[], string>({
      query: (referralId) => `/${referralId}/partners`,
    }),
    fetchGiftAmount: builder.query<number, string>({
      query: (referralId) => `/${referralId}/giftAmount`,
    }),
    fetchCashbackAmount: builder.query<number, string>({
      query: (referralId) => `/${referralId}/cashbackAmount`,
    }),
    fetchTransactions: builder.query<IPersonalAccountTransaction[], string>({
      query: (referralId) => `/${referralId}/transactions`,
    }),
    calculate: builder.query<string, void>({
      query: () => `/calculate`,
    }),
  }),
});

export const {
  useFetchPrivateTradeTurnoverQuery,
  useFetchGroupTradeTurnoverQuery,
  useFetchMentorBonusQuery,
  useFetchClientsQuery,
  useFetchPartnersQuery,
  useFetchGiftAmountQuery,
  useFetchCashbackAmountQuery,
} = personalAccountApiSlice;
