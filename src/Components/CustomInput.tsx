import { KeyboardEventHandler, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { addTodo } from "../Redux/Slices/todosSlice"
import { MdOutlineBookmarkAdd } from "react-icons/md";

const InputContainer = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 2px;
    position: relative;
`
const SaveButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    height: 100%;
    border: none;
    position: absolute;
    right: 0;
    border-radius:  0 5px 5px 0;
`

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 7px 25px 7px 10px;
    border: none;
    border-radius: 5px;
    &:focus {
        outline: none;
    }
`

export const CustomInput = () => {
    const [value, setValue] = useState<string>('')
    const dispatch = useDispatch()
    const saveTodo = () => {
        if (value.trim()) {
            dispatch(addTodo(value))
            setValue('')
        } else {
            alert('empty input')
        }
    }

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            saveTodo();
        }
    };
    return (
        <InputContainer>
            <Input onChange={(e) => setValue(e.target.value)} value={value} onKeyDown={handleKeyDown} />
            <SaveButton onClick={saveTodo}>
                <MdOutlineBookmarkAdd />
            </SaveButton>
        </InputContainer>
    )
}