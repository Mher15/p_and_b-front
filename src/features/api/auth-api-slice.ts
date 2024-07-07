import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpointsTags } from "../../app/constants";
import {
  IAuthentificationResponse,
  IAuthontificationFormValues,
  IRegistrationData,
  IRegistrationResponse,
  IUser,
} from "../../app/types";

const { CHECK_AUTH } = endpointsTags;

interface IChangePassword {
  id: number;
  oldPassword: string;
  newPassword: string;
}
interface IChangePasswordResponse {
  token: string;
  user: IUser;
}
interface IRestorePassword {
  phone: string;
}
interface IRestorePasswordResponse {
  token: string;
  user: IUser;
}

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/user`,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: [CHECK_AUTH],
  endpoints: (builder) => ({
    checkAuth: builder.query<boolean, number | void>({
      query: () => "/auth",
      providesTags: () => [CHECK_AUTH],
    }),
    login: builder.mutation<
      IAuthentificationResponse,
      IAuthontificationFormValues
    >({
      query: (authValues) => ({
        url: `/login`,
        method: "POST",
        body: authValues,
      }),
      invalidatesTags: [CHECK_AUTH],
    }),
    registration: builder.mutation<IRegistrationResponse, IRegistrationData>({
      query: (registrationData) => ({
        url: `/registration`,
        method: "POST",
        body: registrationData,
      }),
      invalidatesTags: [CHECK_AUTH],
    }),
    changePassword: builder.mutation<IChangePasswordResponse, IChangePassword>({
      query: (registrationValues) => ({
        url: `/change-password`,
        method: "POST",
        body: registrationValues,
      }),
      invalidatesTags: [CHECK_AUTH],
    }),
    restorePassword: builder.mutation<
      IRestorePasswordResponse,
      IRestorePassword
    >({
      query: (restorePasswordData) => ({
        url: `/restore-password`,
        method: "POST",
        body: restorePasswordData,
      }),
      invalidatesTags: [CHECK_AUTH],
    }),
  }),
});

export const {
  useCheckAuthQuery,
  useLoginMutation,
  useRegistrationMutation,
  useChangePasswordMutation,
  useRestorePasswordMutation,
} = authApiSlice;
