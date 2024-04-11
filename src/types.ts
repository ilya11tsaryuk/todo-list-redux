export type TodoItemProps = {
    id: number
    todo: string
    done: boolean
}

export type TodoListType = TodoItemProps[]

export type Root = {
    todoList: TodoListType
    selectFilter: string
}