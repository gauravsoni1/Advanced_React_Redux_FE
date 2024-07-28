import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum Notification_Types {
    SUCCESS = 'success',
    INFO = "info",
    ERROR = "error",
    WARNING = 'warning'
}

interface notificationInitialStateInterface {
    type: Notification_Types;
    open: boolean;
    message: string;
}

const notificationInitialState: notificationInitialStateInterface = {
    type: Notification_Types.SUCCESS,
    open: true,
    message: "Default"
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: notificationInitialState,
    reducers: {
        openNotification: (state, action: PayloadAction<{ type: Notification_Types, message: string }>) => {
            const { type, message } = action.payload;
            state.type = type;
            state.message = message;
            state.open = true;
        },
        closeNotification: (state) => {
            state.open = false
        }
    }
})

export default notificationSlice.reducer;

export const { openNotification, closeNotification } = notificationSlice.actions;