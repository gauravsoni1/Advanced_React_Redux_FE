import { BaseQueryFn, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../../redux/store";
import { clearUserData, updateUserData } from "../../redux/slice/userSlice";
import { setRoute } from "../../redux/slice/navSlice";
import { Mutex } from 'async-mutex';
import { createApi } from "@reduxjs/toolkit/query/react";

const mutex = new Mutex();

export const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    prepareHeaders: (headers, { getState }) => {
        const globalState = getState() as RootState;
        // console.log(globalState);
        const token = globalState?.user?.access_token;

        if (token) {
            headers.set("token", token);
        }
    }
})

export const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:4000/" });

export const baseQueryWithReauth = async (args, api, options) => {
    await mutex.waitForUnlock();

    let result = await baseQueryWithAuth(args, api, options);

    // console.log({ error: result.error, status: result?.error?.status })
    if (result.error && result.error.status === 403) {
        if (!mutex.isLocked()) {

            const release = await mutex.acquire();

            const rootState = api.getState() as RootState;
            const refreshToken = rootState?.user.refresh_token;

            try {
                const refreshResult = await baseQuery(`/user/token/refresh/${refreshToken}`, api, options);

                // console.log("Refresh result ", refreshResult);

                api.dispatch(updateUserData({
                    access_token: refreshResult?.data?.data?.access_token,
                    refresh_token: refreshResult?.data?.data?.refresh_token,
                    usr_id: refreshResult?.data?.data?.usr_id
                }))

                result = await baseQueryWithAuth(args, api, options);

            } catch (error) {
                // console.log("Log out the user and crear the state");
                // console.log("Refresh result failed ", error);
                api.dispatch(clearUserData());
                api.dispatch(setRoute('/auth'));
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
        }


    }

    return result;
}

export const publicApiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: () => ({}),
    reducerPath: 'publicApi'
})