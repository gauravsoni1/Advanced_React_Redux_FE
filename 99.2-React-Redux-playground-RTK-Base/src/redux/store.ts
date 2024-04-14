import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoSlice';
import { api } from "./api/todo.api";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        todo: todoReducer
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export default store;