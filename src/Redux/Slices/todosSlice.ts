import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoItemProps, TodoListType } from "../../types";
import { changeSelectFilter } from "./selectFilterSlice";

const TODOS_KEY = 'todos'
export const todosSlice = createSlice({
    name: TODOS_KEY,
    initialState: JSON.parse(window.localStorage.getItem(TODOS_KEY) || '[]') as TodoListType,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: TodoItemProps = {
                id: Date.now(),
                todo: action.payload,
                done: false
            }
            const updatedState = [newTodo, ...state];
            window.localStorage.setItem(TODOS_KEY, JSON.stringify(updatedState));
            return updatedState
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            const updatedState = state.filter((todo) => todo.id !== action.payload);
            window.localStorage.setItem(TODOS_KEY, JSON.stringify(updatedState));
            return updatedState;
        },
        toggleCompletedTodo: (state, action: PayloadAction<number>) => {
            const updatedState = state.map(todo => {
                if (todo.id === action.payload) {
                    return { id: todo.id, done: !todo.done, todo: todo.todo };
                }
                return todo;
            });
            window.localStorage.setItem(TODOS_KEY, JSON.stringify(updatedState));
            return updatedState;
        },
        updateTodo: (state, action: PayloadAction<{ id: number, todo: string }>) => {
            const { id, todo: newTodo } = action.payload;
            const currentInd = state.findIndex(todo => todo.id === id);
            if (currentInd !== -1) {
                state[currentInd].todo = newTodo;
                window.localStorage.setItem(TODOS_KEY, JSON.stringify(state));
            }
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(changeSelectFilter, (state, { payload }) => {
    //         const filter = payload
    //         const temporaryState: TodoListType = JSON.parse(window.localStorage.getItem(TODOS_KEY) || '[]')
    //         if (filter === 'all') return temporaryState
    //         if (filter === 'done') return temporaryState.filter((todo) => todo.done)
    //         if (filter === 'not-done') return temporaryState.filter((todo) => !todo.done)
    //     })
    // }, // TODO возможно просто лучше внутри компонента использовать useState и при смене фильтра фильтровать массив

})

export const { addTodo, updateTodo, removeTodo, toggleCompletedTodo } = todosSlice.actions