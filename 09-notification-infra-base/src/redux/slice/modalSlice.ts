import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum Modal_Types {
    SUCCESS = 'SUCCESS',
    ADD_PROPERTIES = "ADD_PROPERTIES"
}


interface modalInitialStateInterface {
    type: string;
    open: boolean;
}

const modalInitialState: modalInitialStateInterface = {
    type: Modal_Types.SUCCESS,
    open: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: modalInitialState,
    reducers: {
        openModal: (state, action: PayloadAction<Modal_Types>) => {
            state.type = action.payload
            state.open = true
        },
        closeModal: (state) => {
            state.open = false
        }
    }
})

export default modalSlice.reducer;

export const { openModal, closeModal } = modalSlice.actions;