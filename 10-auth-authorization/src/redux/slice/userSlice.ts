import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface userInitialStateInterface {
    lang?: string;
    usr_id: string;
    access_token: string;
    refresh_token: string;
}

const userInitialState: userInitialStateInterface = {
    lang: 'en',
    usr_id: '',
    access_token: '',
    refresh_token: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        updateLanguage: (state, action: PayloadAction<string>) => {
            state.lang = action.payload;
        },
        updateUserData: (state, action: PayloadAction<userInitialStateInterface>) => {
            // const { usr_id, lang, access_token, refresh_token} = action.payload;

            // state.access_token = access_token;
            // state.refresh_token = refresh_token;

            return action.payload
        }
    }
})

export default userSlice.reducer;

export const { updateLanguage, updateUserData } = userSlice.actions;