import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/"
    }),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => `todo/list`,
            transformResponse: (response: any) => {
                return response?.data;
            }
        }),
        getTodo: builder.query<Todo, number | null>({
            query: (id) => `/todo/${id}`,
            transformResponse: (response: any) => {
                return response?.data;
            }
        }),
        createTodo: builder.mutation({
            query: (body: Partial<Todo>) => ({
                url: "/todo",
                method: "POST",
                body
            }),
            transformResponse: (response) => {
                return response
            }
        }),
        updateTodo: builder.mutation({
            query: (body: Partial<Todo>) => ({
                url: `/todo/${body.id}`,
                method: "PUT",
                body
            }),
            transformResponse: (response) => {
                return response
            }
        }),
        deleteTodo: builder.mutation({
            query: (body: number) => ({
                url: `/todo/${body}`,
                method: "DELETE"
            }),
            transformResponse: (response) => {
                return response
            }
        }),
    })
});

export const { useGetTodosQuery, useGetTodoQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = api;
