//check for existing todos in local storage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    if(todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

//save the todos to LS
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//remove todo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

//render todos
const renderTodos = function(todos, filters) {
    //filter based on search text
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })    
    //below refactored
    // const toggleTodos = filteredTodos.filter(function(todo) {
    //     return !filters.hideCompleted || !todo.completed
    //     // if(filters.hideCompleted) { 
    //     //     return !todo.completed 
    //     // } else { 
    //     //     return true 
    //     // }
    // })
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed) 
    //clear div
    document.querySelector('#todos').innerHTML=''
    document.querySelector('#h2').innerHTML=''
    document.querySelector('#h2').appendChild(generateSummaryDOM(incompleteTodos))
    if(todos.length>0){ 
        filteredTodos.forEach((todo) => {
            document.querySelector('#todos').appendChild(generateTodoDOM(todo))
        })
    } else {
        const noElem = document.createElement('span')
        noElem.textContent = 'All finished. Add some more todos!'
        document.querySelector('#todos').appendChild(noElem)
    }
}

//toggle checkbox
const toggleTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if(todoIndex > -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed
    }   
}

//generate todo DOM
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
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    labelElem.setAttribute('for', 'todo'+todo.id)
    listElem.setAttribute('id', 'todo'+todo.id)
    deleteBtn.setAttribute('class', 'delete-btn')
    deleteBtn.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    listElem.textContent = todo.text
    deleteBtn.textContent = 'x'
    
    todoElem.appendChild(checkElem)
    todoElem.appendChild(labelElem).appendChild(listElem)
    todoElem.appendChild(deleteBtn)

    return todoElem
}

//generate summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todo(s) left`
    return summary
}