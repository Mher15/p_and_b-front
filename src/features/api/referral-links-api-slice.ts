import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IReferralLink, IReferralLinkCreate } from "../../app/types";

export const referralLinksApiSlice = createApi({
  reducerPath: "referralLinksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/referralLink`,
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    getOrCreateLink: builder.mutation<IReferralLink, IReferralLinkCreate>({
      query: (link) => {
        return {
          url: `/`,
          method: "POST",
          body: link,
        };
      },
    }),
    getByName: builder.query<IReferralLink, string>({
      query: (link) => {
        return {
          url: `/${link}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetOrCreateLinkMutation, useGetByNameQuery } =
  referralLinksApiSlice;
