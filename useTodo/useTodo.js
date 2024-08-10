import { useEffect, useReducer } from "react"




const todoReducer = (initialState = [],action) =>{
    
    switch (action.type) {
        case 'Add Todo':
            return [...initialState, action.payload]
        case 'Remove Todo':
            return initialState.filter(todo => todo.id !== action.payload)
        case 'Toggle Todo':
            return initialState.map((todo)=>{
                
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                
                return todo
            })
        default:
            return initialState
    }
}


const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || []
}


export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])


    const handleNewTodo = (todo) => {
        const action = {
            type: 'Add Todo',
            payload: todo
        }

        dispatch(action)

    }

    const handleDeleteTodo = (id) => {
        const action = {
            type: 'Remove Todo',
            payload: id
        }

        dispatch(action)

    }

    const handleToggleTodo = (id) => {

        const action = {
            type: 'Toggle Todo',
            payload: id
        }

        dispatch(action)
    }

    const todosCount = todos.length
    const pendingTodosCount = todos.filter(todo => !todo.done).length
  
    return {

        todos,
        todosCount,
        pendingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
  

    }
       
}
