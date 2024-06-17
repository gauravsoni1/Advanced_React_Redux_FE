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
import axios from "axios";

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

    // SHORT POLLING 


    // const getTodoShortPoll = async () => {
    //     const response = await axios.get(
    //         "http://localhost:4000/todo/list"
    //     );
    //     return response.data;
    // }

    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //         const todoData = await getTodoShortPoll();
    //         setTodos(todoData?.data);
    //     }, 2000);

    //     return () => clearInterval(interval);
    // }, [])


    // LONG POLLING

    // const getTodoLongPoll = async () => {
    //     const response = await axios.get(
    //         "http://localhost:4000/todo/list/longpoll"
    //     );
    //     return response.data;
    // }

    // useEffect(() => {
    //     let getData = true;

    //     (async () => {
    //         while (true) {
    //             try {
    //                 const response = await getTodoLongPoll()
    //                 setTodos(response?.data);
    //             } catch (error) {
    //                 getData = false;
    //             }
    //         }
    //     })()
    // }, [])

    // SSE

    const getTodoSSE = async () => {
        const eventSource = new EventSource("http://localhost:4000/todo/list/sse");

        eventSource.onopen = (ev) => {
            console.log("event source opened", ev);
        }

        eventSource.onmessage = (ev: MessageEvent) => {
            console.log("Event message", ev);
            setTodos(JSON.parse(ev.data));
        }
    }

    useEffect(() => {
        try {
            getTodoSSE();
        } catch (error) {
            console.log(error);
        }
    }, [])

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
