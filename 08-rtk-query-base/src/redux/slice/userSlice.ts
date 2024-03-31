import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface userInitialStateInterface {
    lang: string;
}

const userInitialState: userInitialStateInterface = {
    lang: 'en'
}

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        updateLanguage: (state, action: PayloadAction<string>) => {
            state.lang = action.payload;
        }
    }
})

export default userSlice.reducer;

export const { updateLanguage } = userSlice.actions;