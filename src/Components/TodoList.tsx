import { TodoItem } from "./TodoItem"
import { Root, TodoListType } from "../types"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const List = styled.ul`
    margin: 10px;
    padding: 0;
`

export const TodoList = () => {
    const todos = useSelector((state: Root) => state.todoList) // TODO пофиксить проблему с типами
    const filter = useSelector((state: Root) => state.selectFilter)
    const [filteredTodos, setFilteredTodos] = useState<TodoListType>(todos)

    useEffect(() => {
        if (filter === 'all') {
            const doneTodos = todos.filter(todo => todo.done)
            const notDoneTodos = todos.filter(todo => !todo.done)
            setFilteredTodos([...notDoneTodos, ...doneTodos])
        }
        if (filter === 'done') {
            const t = todos.filter((todo) => todo.done)
            setFilteredTodos(t)
        }
        if (filter === 'not-done') {
            const t = todos.filter((todo) => !todo.done)
            setFilteredTodos(t)
        }
    }, [filter, todos])

    return (
        <List>
            {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} id={todo.id} todo={todo.todo} done={todo.done} />
            ))}
        </List>
    )
}