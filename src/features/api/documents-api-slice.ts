import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDocument, IFormDocument } from "../../app/types";
import { endpointsTags } from "../../app/constants";

const { DOCUMENT } = endpointsTags;

interface IEditRequestParams {
  editedDocument: IFormDocument;
  id: number;
}

export const documentsApiSlice = createApi({
  reducerPath: "documentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/documents`,
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    fetchDocuments: builder.query<IDocument[], number | void>({
      query: () => "/",
      providesTags: () => [DOCUMENT],
    }),
    addDocument: builder.mutation<IDocument, IFormDocument>({
      query: (group) => ({
        url: `/`,
        method: "POST",
        body: group,
      }),
      invalidatesTags: [DOCUMENT],
    }),
    updateDocument: builder.mutation<IDocument, IEditRequestParams>({
      query: ({ id, editedDocument }) => ({
        url: `/${id}`,
        method: "PUT",
        body: editedDocument,
      }),
      invalidatesTags: [DOCUMENT],
    }),
    deleteDocument: builder.mutation<IDocument, IDocument>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [DOCUMENT],
    }),
    deleteDocumentFile: builder.mutation<number, string>({
      query: (fileName) => ({
        url: `/delete/${fileName}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useDeleteDocumentFileMutation,
  useFetchDocumentsQuery,
  useAddDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
} = documentsApiSlice;
