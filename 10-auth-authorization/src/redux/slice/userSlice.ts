import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Permissions } from "../../const/permissions";

interface userInitialStateInterface {
    lang?: string;
    usr_id: string;
    access_token: string;
    refresh_token: string;
    usr_role: string;
    usr_permissions: Permissions[] | "*";
}

const userInitialState: userInitialStateInterface = {
    lang: 'en',
    usr_id: '',
    access_token: '',
    refresh_token: '',
    usr_role: '',
    usr_permissions: []
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
        },
        clearUserData: () => {
            return userInitialState;
        }
    }
})

export default userSlice.reducer;

export const { updateLanguage, updateUserData, clearUserData } = userSlice.actions;