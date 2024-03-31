import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServerResponse } from "../../const/types/shared.types";

export const userApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (body) => ({
                url: 'user/signin',
                method: "POST",
                body
            }),
            transformResponse: (response:ServerResponse) =>{
                return response?.data;
            },
            transformErrorResponse(response: ServerResponse, meta, arg) {
                return response?.data
            },
        }),
    })
})

export const { useSignInMutation } = userApi;
