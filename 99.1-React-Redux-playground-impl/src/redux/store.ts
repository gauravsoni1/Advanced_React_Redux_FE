import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoSlice';

const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

const store = configureStore({
    reducer: {
        todo: todoReducer
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>

export default store;