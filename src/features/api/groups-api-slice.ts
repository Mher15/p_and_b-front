import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFormGroup, IGroup } from "../../app/types";
import { endpointsTags } from "../../app/constants";

const { GROUP } = endpointsTags;

interface IEditRequestParams {
  editedGroup: IFormGroup;
  id: number;
}

export const groupsApiSlice = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/groups`,
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: [GROUP],
  endpoints: (builder) => ({
    fetchGroups: builder.query<IGroup[], number | void>({
      query: () => "/",
      providesTags: () => [GROUP],
    }),
    addGroup: builder.mutation<IGroup, IFormGroup>({
      query: (group) => ({
        url: `/`,
        method: "POST",
        body: group,
      }),
      invalidatesTags: [GROUP],
    }),
    updateGroup: builder.mutation<IGroup, IEditRequestParams>({
      query: ({ id, editedGroup }) => ({
        url: `/${id}`,
        method: "PUT",
        body: editedGroup,
      }),
      invalidatesTags: [GROUP],
    }),
    deleteGroup: builder.mutation<IGroup, IGroup>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [GROUP],
    }),
  }),
});

export const {
  useFetchGroupsQuery,
  useAddGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupsApiSlice;
