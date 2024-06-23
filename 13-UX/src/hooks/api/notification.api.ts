import { createApi } from "@reduxjs/toolkit/query/react";
import { ServerResponse } from "../../const/types/shared.types";
import { baseQueryWithReauth } from "./baseApiConfig";
import { io } from 'socket.io-client';

const socket = io("localhost:4000");

export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getNotificationList: builder.query({
            query: () => ({
                url: "/notification/list",
                method: "GET",
            }),
            transformResponse: (response: ServerResponse) => {
                return response?.data;
            },
            transformErrorResponse(response: ServerResponse, meta, arg) {
                return response?.data
            },
            async onQueryStarted(args, { updateCachedData, queryFulfilled }) {
                console.log("Called query started", args);
                await queryFulfilled;
                console.log("Query was fulfulled");

                const propertyAddedHandler = (event: any) => {
                    console.log("handler called",event);

                    updateCachedData((draft) => {
                        draft.push(event);
                    })
                }

                socket.on("property", propertyAddedHandler)

            }
        })
    }),
})

export const { useGetNotificationListQuery } = notificationApi;
