'use strict'

const todos = getSavedTodos()
//Object template
// const todos = [{
//     id: uuidv4(),
//     text: 'Clean house',
//     completed: false  
// }]
const filters = {
    searchText: '',
    hideCompleted: false
}

//Read - initial render
renderTodos(todos, filters) 

//hide completed
document.querySelector('#hideCompleted').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})

//Read - Initial Todo render
renderTodos(todos, filters)
//Read - filter applied
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos,filters)
})

//Create
document.querySelector('#new-todos').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.addTodo.value
    todos.push({
        id: uuidv4(),
        text,
        completed: false
    })
    saveTodos(todos)
    renderTodos(todos,filters)
    e.target.elements.addTodo.value = ''
})
