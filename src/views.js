import {getFilters} from './filters'
import {getTodos, sortTodos, toggleTodo, removeTodo, saveTodos} from './todos'

const renderTodos = () => {
    const todoEl = document.querySelector('#todos')
    const todoElem = document.querySelector('#todos')
    const filters = getFilters()
    const filteredTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)
    todoElem.innerHTML=''
    document.querySelector('#h2').innerHTML=''
    document.querySelector('#h2').appendChild(generateSummaryDOM(incompleteTodos))
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoElem.appendChild(generateTodoDOM(todo))
        })
    } else {
        const noElem = document.createElement('span')
        noElem.textContent = 'All finished. Add some more todos!'
        todoElem.appendChild(noElem)
    }
}


const generateTodoDOM = (todo) => {
    const todoElem = document.createElement('div')
    const listElem = document.createElement('span')
    const checkElem = document.createElement('input')
    const labelElem = document.createElement('label')
    const deleteBtn = document.createElement('button')
    
    todoElem.setAttribute('class', 'todo-div')
    checkElem.setAttribute('type', 'checkbox')
    checkElem.checked = todo.completed
    checkElem.setAttribute('class', 'todo-chk')
    checkElem.setAttribute('value', 'todo'+todo.id)
    checkElem.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })
    labelElem.setAttribute('for', 'todo'+todo.id)
    listElem.setAttribute('id', 'todo'+todo.id)
    deleteBtn.setAttribute('class', 'delete-btn')
    deleteBtn.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })
    
    listElem.textContent = todo.text
    deleteBtn.textContent = 'x'
    
    todoElem.appendChild(checkElem)
    todoElem.appendChild(labelElem).appendChild(listElem)
    todoElem.appendChild(deleteBtn)

    return todoElem
}

const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todo(s) left`
    return summary
}

export {renderTodos, generateTodoDOM, generateSummaryDOM}