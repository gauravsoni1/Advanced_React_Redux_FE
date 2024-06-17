import React, { useCallback, useEffect, useState } from "react";
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
import { socket } from "../utils/socket";

interface TodoItem {
    val: string;
    isDone: boolean;
    id: number;
}

function Todo() {
    const [inputVal, setInputVal] = useState<string>("");
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [editedId, setEditedId] = useState<number | null>(null);

    useEffect(() => {
        socket.connect();

        return () => {
            if (socket) {
                socket.disconnect();
            }
        }
    }, [])

    const handleTodoCreated = useCallback((data: any) => {
        console.log("Todo created event recevied", data);
        try {
            const todo = { ...data };
            setTodos(prevState => [{ ...todo }, ...prevState])
        } catch (error) {
            console.error("wrong event message", error);
        }
    }, [])

    useEffect(() => {
        socket.on("todo-created", handleTodoCreated);

        return () => {
            socket.off("todo-created", handleTodoCreated)
        }

    }, [handleTodoCreated])

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

    const handleDone = (id: number) => {
        const updated = todos.map((todo) => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone;
            }
            return todo;
        });
        setTodos(updated);
    };

    const handleEdit = (id: number) => {
        const editVal = todos.find((todo) => todo.id === id);
        setEditedId(id);
        setInputVal(editVal?.val || "");
        setIsEdited(true);
    };

    const onConnect = () => {
        console.log(`connected with socket connection ID = ${socket.id}`);
    }

    const onDisconnect = () => {
        console.log("Client disconnected");
    }



    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);


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
                {todos.map((todo) => (
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
