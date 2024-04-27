import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as FormReducer } from 'redux-form';
import modalReducer from './slice/modalSlice';
import notificationReducer from './slice/notificationSlice';
import userReducer from './slice/userSlice';
import { userApi } from '../hooks/api/user.api';
import { propertyApi } from "../hooks/api/property.api";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage: storage,
    blackList: [propertyApi.reducerPath]
}

const rootReducer = combineReducers({
    form: FormReducer,
    modal: modalReducer,
    notification: notificationReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddle) =>
        defaultMiddle().concat(userApi.middleware, propertyApi.middleware)
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>