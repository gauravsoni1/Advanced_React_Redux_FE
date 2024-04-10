import { configureStore } from "@reduxjs/toolkit";
import { reducer as FormReducer } from 'redux-form';
import modalReducer from './slice/modalSlice';
import notificationReducer from './slice/notificationSlice';
import userReducer from './slice/userSlice';
import { userApi } from '../hooks/api/user.api';
import { propertyApi } from "../hooks/api/property.api";

export const store = configureStore({
    reducer: {
        form: FormReducer,
        modal: modalReducer,
        notification: notificationReducer,
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [propertyApi.reducerPath]: propertyApi.reducer
    },
    middleware: (defaultMiddle) =>
        defaultMiddle().concat(userApi.middleware, propertyApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>