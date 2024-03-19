import { configureStore } from "@reduxjs/toolkit";
import { reducer as FormReducer } from 'redux-form';
import modalReducer from './slice/modalSlice';
import userReducer from './slice/userSlice';

export const store = configureStore({
    reducer: {
        form: FormReducer,
        modal: modalReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>