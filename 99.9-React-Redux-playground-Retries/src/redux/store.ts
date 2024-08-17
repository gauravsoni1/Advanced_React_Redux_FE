import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoSlice';
import { api } from "./api/todo.api";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        todo: todoReducer
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch);

export default store;