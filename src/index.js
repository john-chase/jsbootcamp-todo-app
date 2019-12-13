import uuidv4 from 'uuid/v4'
import {createTodo, loadTodos} from './todos'
import {renderTodos} from './views'
import {setFilters} from './filters'

//Object template
// const todos = [{
//     id: uuidv4(),
//     text: 'Clean house',
//     completed: false 
//     createdAt: timestamp,
//     updatedAt: timestamp 
// }]

renderTodos() 

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#hideCompleted').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.value
    })
    renderTodos()    
})

document.querySelector('#new-todos').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.addTodo.value.trim()
    
    if(text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.addTodo.value = ''
    }
})

window.addEventListener('storage', (e)=> {
    if(e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})