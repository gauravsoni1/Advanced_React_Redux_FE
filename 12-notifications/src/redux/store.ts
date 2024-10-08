import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as FormReducer } from 'redux-form';
import modalReducer from './slice/modalSlice';
import notificationReducer from './slice/notificationSlice';
import userReducer from './slice/userSlice';
import { userApi } from '../hooks/api/user.api';
import { propertyApi } from "../hooks/api/property.api";
import { notificationApi } from '../hooks/api/notification.api';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import navReducer from './slice/navSlice';

const persistConfig = {
    key: "root",
    storage: storage,
    blacklist: [propertyApi.reducerPath, notificationApi.reducerPath]
}

const rootReducer = combineReducers({
    form: FormReducer,
    modal: modalReducer,
    nav: navReducer,
    notification: notificationReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddle) =>
        defaultMiddle().concat(userApi.middleware, propertyApi.middleware, notificationApi.middleware)
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>