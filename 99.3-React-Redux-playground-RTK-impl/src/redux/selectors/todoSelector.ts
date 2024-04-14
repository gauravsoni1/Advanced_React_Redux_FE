import { RootState } from "../store";

export const selectTodos = (rootState: RootState) => rootState?.todo;