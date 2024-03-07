import { configureStore } from "@reduxjs/toolkit";
import { reducer as FormReducer } from 'redux-form';

export const store = configureStore({
    reducer: {
        form: FormReducer
    }
})