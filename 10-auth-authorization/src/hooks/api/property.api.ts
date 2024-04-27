import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServerResponse } from "../../const/types/shared.types";
import { RootState } from "../../redux/store";

export const propertyApi = createApi({
    reducerPath: 'propertyapi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/",
        prepareHeaders: (headers, { getState }) => {
            const globalState = getState() as RootState;
            console.log(globalState);
            const token = globalState?.user?.access_token;

            if (token) {
                headers.set("token", token);
            }
        }
    }),
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
