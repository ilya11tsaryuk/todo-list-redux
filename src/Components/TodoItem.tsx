import styled, { keyframes } from "styled-components";
import { TodoItemProps } from "../types";
import { useDispatch } from "react-redux";
import { removeTodo, toggleCompletedTodo, updateTodo } from "../Redux/Slices/todosSlice";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { MdExpandMore, MdExpandLess } from "react-icons/md";


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
`;

const Item = styled.input`
    text-align: left;
    background: transparent;
    border: none;
    width: 100%;
    text-overflow: ellipsis;   
    &:focus {
        outline: none;
    }
`;

const CheckBox = styled.input<{ checked: boolean }>`
cursor: pointer;
`;

const ButtonContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-left: auto;
gap: 3px;
`

const IconButton = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextContainer = styled.div`
    width: 100%;
   margin-left: 15px;
    border-left: 1px solid black;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
`
const Text = styled.div<{ isActive: boolean }>`
    text-align: left;
    font-size: medium;
    opacity: ${({ isActive }) => isActive ? 1 : 0};
    display: ${({ isActive }) => isActive ? 'inline' : 'none'};
`


export const TodoItem = (todo: TodoItemProps) => {
    const dispatch = useDispatch();
    const [isRemoving, setIsRemoving] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(true);
    const [value, setValue] = useState<string>(todo.todo);
    const [isActive, setIsActive] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null)

    const deleteTodo = (id: number) => {
        setIsRemoving(true);
        setTimeout(() => {
            dispatch(removeTodo(id));
        }, 500);
    };

    const editTodo = () => {
        dispatch(updateTodo({ id: todo.id, todo: value }))
        setDisable(true)
    }

    const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            editTodo()
        }
    }

    useEffect(() => {
        if (isActive) {
            setIsActive(false)
        }
    }, [todo.done])

    useEffect(() => {
        if (!disable && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
        }
    }, [disable]);

    return (
        <ItemContainer completed={todo.done} isRemoving={isRemoving}>
            <CheckBox type="checkbox" checked={todo.done} onChange={() => dispatch(toggleCompletedTodo(todo.id))} />
            <TextContainer>
                <Item
                    ref={inputRef}
                    onKeyDown={handleEnter}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={disable}
                    value={isActive ? value.split(' ').slice(0, 3).join(' ') : value} />
                <Text isActive={isActive}>{value.split(' ').slice(3, value.length).join(' ')}</Text>
            </TextContainer>
            <ButtonContainer>
                {disable ? (
                    <IconButton onClick={() => {
                        setDisable(false)
                        setIsActive(false)
                    }}>
                        <MdModeEditOutline size={17} />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => editTodo()}>
                        <MdOutlineBookmarkAdd size={17} />
                    </IconButton>
                )}

                <IconButton onClick={() => deleteTodo(todo.id)}>
                    <MdDeleteOutline size={17} />
                </IconButton>
                <IconButton onClick={() => {
                    if (disable) {
                        setIsActive(!isActive)
                    }
                }
                }>
                    {isActive ? <MdExpandLess size={17} /> : <MdExpandMore size={17} />}
                </IconButton>
            </ButtonContainer>
        </ItemContainer >
    );
};
