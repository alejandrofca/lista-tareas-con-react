import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  var [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  const buttonNameRef = useRef()
  const fecha = new Date().toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', year: 'numeric', month: 'long' })

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    if (todo.complete) { // Actualiza la hora
      var d = new Date();
      var h = ('0'+d.getHours()).substr(-2);
      var m = ('0'+d.getMinutes()).substr(-2);
      todo.hour = h+":"+m
    }
    setTodos([...todos])
    todoNameRef.current.focus()
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: v4(), name: name, complete: false, hour: "" }]
    })
    todoNameRef.current.value = null
    todoNameRef.current.focus()
  }

  function handleClearTodos() {
    const todo = todos.filter(todo => !todo.complete)
    setTodos(todo)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <div className="p-1 container">
      <h3>
        <div className="float-right text-14-normal">{fecha}</div>
        Lista de tareas del d&iacute;a
      </h3>
      <hr />
      <div className="row">
        <div className="col-6 align-top">
          <div className="alert alert-primary padding-left-15 padding-5 font-18 bold">Por hacer</div>
          <TodoList todos={todos} toggleTodo={toggleTodo} filtro="A" className="mb-3" />
        </div>
        <div className="col-6 align-top">
          <div className="alert alert-success padding-left-15 padding-5 font-18 bold">Completadas</div>
          <TodoList todos={todos} toggleTodo={toggleTodo} filtro="C" className="mb-3" />
        </div>
      </div>
      <input ref={todoNameRef} type="text" className="form-control w-1 mb-3 mt-3" onKeyDown={handleKeyDown} autoFocus />
      <button onClick={handleAddTodo} className="btn btn-primary">Agregar Tarea</button>
      &nbsp;&nbsp;&nbsp;
      <button ref={buttonNameRef} onClick={handleClearTodos} className="btn btn-success">Limpia tareas terminadas</button>
      <div className="mt-3 h5">{todos.filter(todo => !todo.complete).length} tareas pendientes</div>
    </div>
  )
}

export default App;
