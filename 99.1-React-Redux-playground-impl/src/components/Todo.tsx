import React, { useState } from "react";
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
import { addTodo, editTodo, removeTodo, toggleCompletion } from "../redux/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectTodos } from "../redux/selectors/todoSelector";

interface TodoItem {
    val: string;
    isDone: boolean;
    id: number;
}

function Todo() {
    const dispatch = useDispatch();
    const { todos: todoList } = useSelector(selectTodos)
    const [inputVal, setInputVal] = useState<string>("");
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [editedId, setEditedId] = useState<number | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
    };

    const handleClick = () => {
        if (!isEdited) {
            dispatch(addTodo({ val: inputVal, isDone: false, id: new Date().getTime() }));
        } else {
            dispatch(editTodo({ val: inputVal, isDone: false, id: editedId as number }));
        }
        setInputVal("");
        setIsEdited(false);
        setEditedId(null);
    };

    const onDelete = (id: number) => {
        dispatch(removeTodo(id));
    };

    const handleDone = (id: number) => {
        dispatch(toggleCompletion(id));
    };

    const handleEdit = (id: number) => {
        const editVal = todoList.find((todo) => todo.id === id);
        setEditedId(id);
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
            <List>
                {todoList.map((todo) => (
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
        </StyledContainer >
    );
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

export default Todo;
