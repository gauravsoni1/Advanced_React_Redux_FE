import { createSlice } from "@reduxjs/toolkit/react";

export interface NavDataInteface {
    route: string | null;
}

const navInitialState: NavDataInteface = {
    route: null
}

const navSlice = createSlice({
    name: 'navData',
    initialState: navInitialState,
    reducers: {
        setRoute: (state, action) => {
            state.route = action?.payload;
        },
        clearRoute: () =>{
            return navInitialState;
        }
    }
})

export default navSlice.reducer;

export const {setRoute, clearRoute} = navSlice.actions;