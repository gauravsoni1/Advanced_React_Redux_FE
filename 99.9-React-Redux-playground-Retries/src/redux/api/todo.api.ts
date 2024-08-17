import { FetchArgs, createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { Todo } from "./types";

const retryWithFailure = retry(async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
        baseUrl: "http://localhost:4000/"
    })(args, api, extraOptions)

    console.log(result);
    if (result?.error?.status === 401) {
        retry.fail("Unauthorized");
    }

    return result;
}, {
    maxRetries: 5, backoff: (attempt, maxRetries) => {
        const delay = Math.pow(2, attempt) * 1000;
        console.log({ delay, attempt })
        return new Promise((resolve) => setTimeout(resolve, delay));
    }
})

export const api = createApi({
    baseQuery: retryWithFailure,
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
                body,
            }),
            transformResponse: (response) => {
                return response
            },
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                let patchResult;

                try {
                    patchResult = dispatch(
                        api.util.updateQueryData(
                            'getTodos',
                            null,
                            (draft) => {
                                console.log({ draft });

                                const newTodo = { ...body, isDone: false, id: Math.random().toString(36) };
                                draft.push(newTodo);

                                console.log({ draft });
                            }
                        )
                    )
                    console.log("on Query started", body);

                    await queryFulfilled;
                } catch (error) {
                    if (patchResult) {
                        patchResult.undo();
                    }
                }
            },
            invalidatesTags: ["TODO"]
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
