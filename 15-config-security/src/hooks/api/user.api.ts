import { createApi } from "@reduxjs/toolkit/query/react";
import { ServerResponse } from "../../const/types/shared.types";
import { baseQuery } from "./baseApiConfig";

export const userApi = createApi({
    reducerPath: 'userapi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (body) => ({
                url: 'user/signin',
                method: "POST",
                body: {...body, fingerprint: sessionStorage.getItem('fingerprint')}
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
