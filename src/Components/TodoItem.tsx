import styled, { keyframes } from "styled-components";
import { TodoItemProps } from "../types";
import { useDispatch } from "react-redux";
import { removeTodo, toggleCompletedTodo } from "../Redux/Slices/todosSlice";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";

const slideOutAnimation = keyframes`
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(-100%);
        opacity: 0;
    }
`;

const ItemContainer = styled.li<{ completed: boolean; isRemoving: boolean }>`
    padding: 10px;
    background-color: ${({ completed }) => (completed ? "#c0ffc0" : "#f3f0f0")};
    margin: 5px 0;
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
    animation: ${({ isRemoving }) => (isRemoving ? slideOutAnimation : "none")} 0.3s ease-in both;
    & :hover {
        background-color:  "#a5a3a3";
    }
`;

const Item = styled.div`
    margin-left: 15px;
    border-left: 1px solid black;
    padding: 0 10px;
    overflow-wrap: anywhere;
    text-align: left;
`;

const CheckBox = styled.input<{ checked: boolean }>`
cursor: pointer;
`;

const Delete = styled.div`
    cursor: pointer;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TodoItem = (todo: TodoItemProps) => {
    const dispatch = useDispatch();
    const [isRemoving, setIsRemoving] = useState(false);

    const deleteTodo = (id: number) => {
        setIsRemoving(true);
        setTimeout(() => {
            dispatch(removeTodo(id));
        }, 500);
    };

    return (
        <ItemContainer completed={todo.done} isRemoving={isRemoving}>
            <CheckBox type="checkbox" checked={todo.done} onChange={() => dispatch(toggleCompletedTodo(todo.id))} />
            <Item>{todo.todo}</Item>
            <Delete onClick={() => deleteTodo(todo.id)}>
                <MdDeleteOutline size={17} />
            </Delete>
        </ItemContainer>
    );
};
