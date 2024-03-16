import { configureStore } from "@reduxjs/toolkit";
import { reducer as FormReducer } from 'redux-form';
import modalReducer from './slice/modalSlice';

export const store = configureStore({
    reducer: {
        form: FormReducer,
        modal: modalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>