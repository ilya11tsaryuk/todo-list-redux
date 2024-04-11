import { configureStore } from "@reduxjs/toolkit";
import { todosSlice } from "./Slices/todosSlice";
import { TodoListType } from "../types";
import { selectFilterSlice } from "./Slices/selectFilterSlice";



export const store = configureStore({
    reducer: {
        todoList: todosSlice.reducer,
        selectFilter: selectFilterSlice.reducer
    }
})