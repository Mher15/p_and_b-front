import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpointsTags } from "../../app/constants";
import {
  IMentorDto,
  IProfile,
  IReferralLink,
  IUserData,
} from "../../app/types";

const { PROFILE } = endpointsTags;

interface IGetByLinkResponseData {
  mentor: IMentorDto;
  link: IReferralLink;
}
interface IEditUserRequestParams {
  editedUser: IUserData;
  id: number;
}
export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/user`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [PROFILE],
  endpoints: (builder) => ({
    fetchProfile: builder.query<IProfile, number | void>({
      query: (userId) => `/profile/${userId}`,
    }),
    getMentorByLink: builder.query<IGetByLinkResponseData, string>({
      queryFn: async (link: string) => {
        try {
          const refLinkResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/api/referralLink/${link}`
          );

          const refLink = await refLinkResponse.json();

          if (!refLink) {
            throw Error("Link is empty");
          }

          const mentorResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/api/user/mentor/${
              refLink.referralId
            }`
          );

          const mentor = await mentorResponse.json();

          if (!mentor) {
            throw Error("mentor is empty");
          }
          const data = { mentor, link: refLink };

          return { data };
        } catch (error) {
          // Catch any errors and return them as an object with an `error` field
          return { error };
        }
      },
    }),
    updateUser: builder.mutation<IProfile, IEditUserRequestParams>({
      query: ({ id, editedUser }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body: editedUser,
        };
      },
      invalidatesTags: [PROFILE],
    }),
  }),
});

export const {
  useGetMentorByLinkQuery,
  useFetchProfileQuery,
  useUpdateUserMutation,
} = userApiSlice;
