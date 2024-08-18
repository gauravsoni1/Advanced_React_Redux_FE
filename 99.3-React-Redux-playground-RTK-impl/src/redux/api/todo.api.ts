import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "./types";
import { Draft } from "@reduxjs/toolkit";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/"
    }),
    tagTypes: ["TODO", "SINGLE_TODO"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => `todo/list`,
            transformResponse: (response: any) => {
                return response?.data;
            },
            providesTags: ["TODO"]
        }),
        getTodo: builder.query<Todo, number | null>({
            query: (id) => `/todo/${id}`,
            transformResponse: (response: any) => {
                return response?.data;
            },
            providesTags: (result, error, arg) => {
                if (result) {
                    return [{ type: "SINGLE_TODO", id: result?.id }]
                }
                return ["SINGLE_TODO"];
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
            },
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                // console.log("Query started", body);
                const tempId = Math.random().toString(36);
                const patchResult = dispatch(api.util.updateQueryData('getTodos', null, (draft) => {
                    console.log(draft);
                    const tempTodo = { ...body, isDone: false, id: tempId };
                    draft.push(tempTodo);
                }))

                try {
                    const { data: returnedData } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getTodos', null, (draft) => {
                        const todo = draft.find(t => t.id === tempId);
                        if (todo){
                            todo.id = returnedData.data.id
                        }
                    }))
                    // console.log("Query ended");
                } catch (error) {
                    // console.log('undo cache update');
                    patchResult.undo();
                }

            },
            invalidatesTags: []
        }),
        updateTodo: builder.mutation({
            query: (body: Partial<Todo>) => ({
                url: `/todo/${body.id}`,
                method: "PUT",
                body
            }),
            transformResponse: (response) => {
                return response
            },
            invalidatesTags: (result, error, arg) => {
                console.log({ result, error, arg });
                return [{ type: "SINGLE_TODO", id: arg?.id }, { type: "TODO" }]
            }
        }),
        deleteTodo: builder.mutation({
            query: (body: number) => ({
                url: `/todo/${body}`,
                method: "DELETE"
            }),
            transformResponse: (response) => {
                return response
            },
            invalidatesTags: ["TODO"]
        }),
    })
});

export const { useGetTodosQuery, useGetTodoQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, usePrefetch } = api;
