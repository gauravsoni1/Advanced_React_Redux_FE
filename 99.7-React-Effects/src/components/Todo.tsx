import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    ListItem,
    styled,
    Container,
    Box,
} from "@mui/material";
import TaskList from "./TaskList";

export interface TodoItem {
    val: string;
    isDone: boolean;
    id: number;
}

function Todo() {
    const [inputVal, setInputVal] = useState<string>("");
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [editedId, setEditedId] = useState<number | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
    };

    const handleClick = () => {
        if (!isEdited) {
            setTodos([
                ...todos,
                { val: inputVal, isDone: false, id: new Date().getTime() },
            ]);
        } else {
            setTodos([
                ...todos.filter((todo) => todo.id !== editedId),
                { val: inputVal, isDone: false, id: editedId as number },
            ]);
        }
        setInputVal("");
        setIsEdited(false);
        setEditedId(null);
    };

    const onDelete = (id: number) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const handleDone = (t: TodoItem) => {
        const updated = todos.map((todo) => {
            if (todo.id === t.id) {
                todo.isDone = !todo.isDone;
            }
            return todo;
        });
        setTodos(updated);
    };

    const handleEdit = (t: TodoItem) => {
        const editVal = todos.find((todo) => todo.id === t.id);
        setEditedId(t.id);
        setInputVal(editVal?.val || "");
        setIsEdited(true);
    };

    return (
        <StyledContainer>
            <Box display={"flex"}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>Todo List</Typography>
            </Box>
            <StyledInput
                variant="outlined"
                onChange={onChange}
                label="type your task"
                value={inputVal}
            />
            <StyledAddButton
                size="large"
                variant={isEdited ? "outlined" : "contained"}
                color="primary"
                onClick={handleClick}
                disabled={!inputVal}
            >
                {isEdited ? "Edit Task" : "Add Task"}
            </StyledAddButton>
            <TaskList handleDone={handleDone} handleEdit={handleEdit} onDelete={onDelete} todoList={todos} />
        </StyledContainer >
    );
}

export const StyledInput = styled(TextField)({
    width: "70%",
    marginBottom: 30,
})

const StyledAddButton = styled(Button)({
    height: 55,
    marginBottom: 30,
})

const StyledContainer = styled(Container)({
    textAlign: "center",
    marginTop: 100,
})

export const StyledList = styled(ListItem)({
    width: "80%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
    border: "1px solid light-gray",
})

export const StyledListButton = styled(Button)({
    marginLeft: 10,
})

export const StyledText = styled(Typography)({
    width: "70%",
})

export default Todo;
