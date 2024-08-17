import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TodoType = {
    val: string,
    isDone: boolean,
    id: number
}

interface InitialTodoState {
    todos: TodoType[]
}

const initialState: InitialTodoState = {
    todos: [{ val: "123", isDone: true, id: 1 }]
}

export const todoSlice = createSlice({
    name: "todo",
    initialState: initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TodoType>) => {
            const newTodo = action.payload;
            state.todos = [...state.todos, newTodo];
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            const todoIdToRemove = action.payload;
            state.todos = state.todos.filter((todo) => todo.id !== todoIdToRemove);
        },
        toggleCompletion: (state, action: PayloadAction<number>) => {
            const todoIdToToggle = action.payload;

            state.todos = state.todos.map((todo) => {
                if (todo.id === todoIdToToggle) {
                    todo.isDone = !todo.isDone;
                }
                return todo;
            });
        },
        editTodo: (state, action: PayloadAction<TodoType>) => {
            const editedTodo = action?.payload;
            state.todos = [...state.todos.filter((todo) => todo.id !== editedTodo.id), editedTodo];
        }
    }
})

export default todoSlice.reducer;

export const { addTodo, removeTodo, toggleCompletion, editTodo } = todoSlice.actions;