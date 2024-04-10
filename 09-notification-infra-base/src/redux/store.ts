import { configureStore } from "@reduxjs/toolkit";
import { reducer as FormReducer } from 'redux-form';
import modalReducer from './slice/modalSlice';
import notificationReducer from './slice/notificationSlice';
import userReducer from './slice/userSlice';
import { userApi } from '../hooks/api/user.api';

export const store = configureStore({
    reducer: {
        form: FormReducer,
        modal: modalReducer,
        notification: notificationReducer,
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (defaultMiddle) =>
     defaultMiddle().concat(userApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>