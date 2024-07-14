import { createApi } from "@reduxjs/toolkit/query/react";
import { ServerResponse } from "../../const/types/shared.types";
import { baseQueryWithReauth, publicApiSlice } from "./baseApiConfig";


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

    })
})

const publicPropertyApi = publicApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPropertyList: builder.query({
            query: (body) => ({
                url: "/property/list",
                method: "POST",
                body
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                console.log({currentArg, previousArg});
                return currentArg !== previousArg;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            transformResponse: (response: ServerResponse) => {
                return response?.data;
            },
            transformErrorResponse(response: ServerResponse, meta, arg) {
                return response?.data
            }
        }),
        searchProperty: builder.query({
            query: (propertyName: string) => ({
                url: `/property/search/${propertyName}`,
                method: "GET"
            }),
            transformResponse: (response: ServerResponse) => {
                return response?.data;
            },
            transformErrorResponse: (response: ServerResponse) => {
                return response?.data;
            }
        })
    })
})

export const { useCreatePropertyMutation } = propertyApi;

export const { useGetPropertyListQuery, useLazySearchPropertyQuery } = publicPropertyApi;
