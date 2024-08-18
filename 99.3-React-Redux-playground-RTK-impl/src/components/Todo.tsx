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
import { useCreateTodoMutation, useDeleteTodoMutation, useGetTodoQuery, useGetTodosQuery, usePrefetch, useUpdateTodoMutation } from "../redux/api/todo.api";
import { Todo } from "../redux/api/types";

function TodoWithAPI() {
    const prefetchTodo = usePrefetch('getTodo');
    const [isTaskVisible, setIsTaskVisible] = useState(false);
    const [createTodo] = useCreateTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const [inputVal, setInputVal] = useState<string>("");
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [editedId, setEditedId] = useState<number | null>(null);
    const [editedTodo, setEditiedTodo] = useState<Todo | null>(null);

    const { data: todoData } = useGetTodoQuery(editedId, { skip: !editedId });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
    };

    useEffect(() => {
        if (isEdited) {
            setInputVal(todoData?.val);
        }
    }, [todoData])

    const handleClick = () => {
        if (!isEdited) {
            createTodo({ val: inputVal })
        } else {
            updateTodo({ val: inputVal, isDone: editedTodo?.isDone, id: editedId as number })
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

    const handleDone = (task: Todo) => {
        updateTodo(task)
    };

    const handleEdit = (todo: Todo) => {
        setEditedId(todo.id);
        setEditiedTodo(todo);
        setIsEdited(true);
    };

    const handleEditHover = (id: number) => {
        console.log(id);
        prefetchTodo(id, { force: true });
    }

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
                <TaskList handleOnEditHover={handleEditHover} handleDone={handleDone} handleEdit={handleEdit} onDelete={onDelete} /> : null
            }

        </StyledContainer >
    );
}

const TaskList = ({ handleDone, handleEdit, onDelete, handleOnEditHover }: any) => {

    const { data: todoList = [] } = useGetTodosQuery(null, { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true });

    useEffect(() => {
        console.log("component mounted");

        return () => console.log("Component unmounted");
    }, [])

    const onDone = (id: number) => {
        const todoToUpdate = todoList.filter((todo: Todo) => todo.id === id)[0];
        handleDone({ ...todoToUpdate, isDone: !todoToUpdate?.isDone })
    };

    const onEdit = (id: number) => {
        const todoToUpdate = todoList.filter((todo: Todo) => todo.id === id)[0];
        handleEdit(todoToUpdate);
    }

    const onEditHover = (id: number) => {
        handleOnEditHover(id);
    }

    return (
        <List>
            {todoList && todoList.map((todo: Todo) => (
                <StyledList divider key={todo.id} id={todo.id.toString()}>
                    <Checkbox
                        onClick={() => onDone(todo.id)}
                        checked={todo.isDone}
                    />
                    <StyledText
                        style={{ color: todo.isDone ? "green" : "" }}
                    >
                        {todo.val}
                    </StyledText>
                    <StyledListButton
                        onMouseOver={() => onEditHover(todo.id)}
                        onClick={() => onEdit(todo.id)}
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
