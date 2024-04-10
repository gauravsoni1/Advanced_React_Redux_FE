import { RootState } from "../store";

export const userState = (rootState: RootState) => rootState.user;

export const selectUserLanguage = (rootState: RootState) => rootState.user.lang;