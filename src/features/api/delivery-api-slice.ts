import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IDeliveryOffer,
  IDeliveryOfferParams,
  ILocationDetect,
  ILocationDetectParams,
  IPickupPoint,
  IPickupPointsListParams,
  IPricingCalculationParams,
} from "../../app/types";
import queryString from "query-string";

interface ICreateOfferBody {
  billing_info: {
    payment_method:
      | "already_paid"
      | "cash_on_receipt"
      | "card_on_receipt"
      | "cashless";
  };
}

interface ICreateOffer {
  points: [
    {
      address: {
        comment: string;
        full_address: string;
        room: string;
      };
      contact: {
        email: string;
        first_name: string;
        last_name: string;
        partonymic: string;
        phone: string;
      };
      id: string;
      instruction: string;
      is_dark_store: boolean;
      is_market_partner: boolean;
      is_post_office: boolean;
      is_yandex_branded: boolean;
      name: string;
      payment_methods: [string];
      position: {
        latitude: number;
        longitude: number;
      };
      schedule: {
        restrictions: [
          {
            days: [number];
            time_from: {
              hours: number;
              minutes: number;
            };
            time_to: {
              hours: number;
              minutes: number;
            };
          }
        ];
        time_zone: number;
      };
      type: string;
    }
  ];
}

export const deliveryApiSlice = createApi({
  reducerPath: "deliveryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/delivery`,
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    pricingCalculation: builder.query<number, IPricingCalculationParams>({
      query: (pricingCalculationParams) => {
        const params = queryString.stringify(pricingCalculationParams);

        return {
          url: `/price?${params}`,
          method: "GET",
        };
      },
    }),
    fetchOffersInfo: builder.query<IDeliveryOffer[], IDeliveryOfferParams>({
      query: ({ countryId, cityId, deliveryAddress }) =>
        `/offers-info?countryId=${countryId}&cityId=${cityId}&deliveryAddress=${deliveryAddress}`,
    }),
    getLocationDetect: builder.query<ILocationDetect, ILocationDetectParams>({
      query: ({ countryId, cityId }) => ({
        url: `/detect-location?countryId=${countryId}&cityId=${cityId}`,
        method: "GET",
      }),
    }),
    fetchPickupPointsList: builder.query<
      IPickupPoint[],
      IPickupPointsListParams
    >({
      query: ({ countryId, cityId }) => ({
        url: `/pickup-points?countryId=${countryId}&cityId=${cityId}`,
        method: "GET",
      }),
    }),
    createOffer: builder.mutation<ICreateOffer, ICreateOfferBody>({
      query: (body) => ({
        url: `/create-offer`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useFetchOffersInfoQuery,
  useGetLocationDetectQuery,
  usePricingCalculationQuery,
  useFetchPickupPointsListQuery,
} = deliveryApiSlice;
