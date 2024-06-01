import { createApi } from "@reduxjs/toolkit/query/react";
import { ServerResponse } from "../../const/types/shared.types";
import { baseQueryWithReauth } from "./baseApiConfig";


export const propertyApi = createApi({
    reducerPath: 'propertyapi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ["PROPERTY_LIST"],
    endpoints: (builder) => ({
        createProperty: builder.mutation({
            query: (body) => ({
                url: '/property',
                method: "POST",
                body
            }),
            transformResponse: (response: ServerResponse) => {
                return response?.data;
            },
            transformErrorResponse(response: ServerResponse, meta, arg) {
                return response?.data
            },
            invalidatesTags: ["PROPERTY_LIST"]
        }),
        getPropertyList: builder.query({
            query: () => ({
                url: "/property/list",
                method: "POST",
            }),
            transformResponse: (response: ServerResponse) => {
                return response?.data;
            },
            transformErrorResponse(response: ServerResponse, meta, arg) {
                return response?.data
            },
            providesTags: ["PROPERTY_LIST"]
        })
    })
})

export const { useCreatePropertyMutation, useGetPropertyListQuery } = propertyApi;
