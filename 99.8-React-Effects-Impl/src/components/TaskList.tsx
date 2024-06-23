import {
    Checkbox,
    List,
} from "@mui/material";
import { TodoItem, StyledList, StyledText, StyledListButton } from "./Todo";
import React from "react";

const TaskList = ({ handleDone, todoList = [], handleEdit, onDelete }: any) => {

    const onDone = (id: number) => {
        const todoToUpdate = todoList.filter((todo: TodoItem) => todo.id === id)[0];
        handleDone({ ...todoToUpdate, isDone: !todoToUpdate?.isDone })
    };

    const onEdit = (id: number) => {
        const todoToUpdate = todoList.filter((todo: TodoItem) => todo.id === id)[0];
        handleEdit(todoToUpdate);
    }

    return (
        <List>
            {console.log("Task List rendered")}
            {todoList && todoList.map((todo: TodoItem) => (
                <StyledList divider key={todo.id}>
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

export default React.memo(TaskList);

