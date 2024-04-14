import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Checkbox,
    List,
    ListItem,
    styled,
    Container,
    Box,
} from "@mui/material";
import { useCreateTodoMutation, useDeleteTodoMutation, useGetTodoQuery, useGetTodosQuery, useUpdateTodoMutation } from "../redux/api/todo.api";
import { Todo } from "../redux/api/types";

function TodoWithAPI() {
    const [isTaskVisible, setIsTaskVisible] = useState(false);
    const { data: todoList = [] } = useGetTodosQuery(null);
    const [createTodo] = useCreateTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const [inputVal, setInputVal] = useState<string>("");
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [editedId, setEditedId] = useState<number | null>(null);

    const { data: todoData } = useGetTodoQuery(editedId);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
    };

    const handleClick = () => {
        if (!isEdited) {
            createTodo({ val: inputVal })
        } else {
            updateTodo({ val: inputVal, isDone: false, id: editedId as number })
        }
        setInputVal("");
        setIsEdited(false);
        setEditedId(null);
    };

    const toggleTaskVisibility = () => {
        setIsTaskVisible(!isTaskVisible);
    }

    const onDelete = (id: number) => {
        deleteTodo(id);
    };

    const handleDone = (id: number) => {
        const todoToUpdate = todoList.filter((todo: Todo) => todo.id === id)[0];
        updateTodo({ ...todoToUpdate, isDone: !todoToUpdate?.isDone })
    };

    const handleEdit = (id: number) => {
        setEditedId(id);
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
            <StyledAddButton
                size="large"
                variant="text"
                color="secondary"
                onClick={toggleTaskVisibility}
            >
                {"Show/Hide"}
            </StyledAddButton>
            {isTaskVisible ?
                <TaskList todoList={todoList} handleDone={handleDone} handleEdit={handleEdit} onDelete={onDelete} /> : null
            }

        </StyledContainer >
    );
}

const TaskList = ({ todoList, handleDone, handleEdit, onDelete }: any) => {

    // useEffect(() => {
    //     console.log("component mounted");

    //     return () => console.log("Component unmounted");
    // }, [])

    return (
        <List>
            {todoList && todoList.map((todo: Todo) => (
                <StyledList divider key={todo.id}>
                    <Checkbox
                        onClick={() => handleDone(todo.id)}
                        checked={todo.isDone}
                    />
                    <StyledText
                        style={{ color: todo.isDone ? "green" : "" }}
                    >
                        {todo.val}
                    </StyledText>
                    <StyledListButton
                        onClick={() => handleEdit(todo.id)}
                        variant="contained"
                    >
                        Edit
                    </StyledListButton>
                    <StyledListButton
                        onClick={() => onDelete(todo.id)}
                        color="secondary"
                        variant="contained"
                    >
                        Delete
                    </StyledListButton>
                </StyledList>
            ))}
        </List>
    )
}

const StyledInput = styled(TextField)({
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

const StyledList = styled(ListItem)({
    width: "80%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
    border: "1px solid light-gray",
})

const StyledListButton = styled(Button)({
    marginLeft: 10,
})

const StyledText = styled(Typography)({
    width: "70%",
})

export default TodoWithAPI;
