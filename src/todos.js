import moment from 'moment'
import uuidv4 from 'uuid/v4'

let todos = []

const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch(err) {
        return []
    }
}

const saveTodos = () => localStorage.setItem('todos', JSON.stringify(todos))

const getTodos = () => todos

const createTodo = (text) => {
    const id = uuidv4()
    const timestamp = moment().valueOf()  
    todos.push({
        id,
        text,
        completed: false,  
        createdAt: timestamp,
        updatedAt: timestamp
    })    
    saveTodos()
}

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

const toggleTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if(todoIndex > -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed
        saveTodos()
    }   
}

todos = loadTodos()

export {getTodos, createTodo, removeTodo, toggleTodo, loadTodos}