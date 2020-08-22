// Crédito: Canal YouTube Web Dev https://www.youtube.com/watch?v=hQAHSlTtcmY

import React, { useState, useRef, useEffect } from 'react';
import ListaTareas from './ListaTareas'
import { v4 } from 'uuid'
import styles from './css/style.css';

const LOCAL_STORAGE_KEY = 'appTareas.tareas'

function App() {
  var [tareas, setTodos] = useState([])
    // Descomentar para arrancar componente con tareas de ejemplo 
    // ([
    //   { id: v4(), name: "Llamar a la contadora", complete: false, hour: ""},
    //   { id: v4(), name: "Recoger ropa de tintorería", complete: false, hour: ""},
    //   { id: v4(), name: "Enviar correo a mi jefe", complete: false, hour: ""},
    // ])
  const tareaNameRef = useRef()
  const buttonNameRef = useRef()
  const alertNameRef = useRef()
  const fecha = new Date().toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'long' })

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tareas))
  }, [tareas])

  function toggleTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id)
    tarea.complete = !tarea.complete
    if (tarea.complete) { // Actualiza la hora
      var d = new Date();
      var h = ('0' + d.getHours()).substr(-2);
      var m = ('0' + d.getMinutes()).substr(-2);
      tarea.hour = h + ":" + m
    }
    setTodos([...tareas])
  }

  function handleAddTodo() {
    if (!tareaNameRef.current.value) {
      alertNameRef.current.innerHTML = creaAlertaTareaVacia().__html
      tareaNameRef.current.focus()
    } else alertNameRef.current.innerHTML = ""

    const name = tareaNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: v4(), name: name, complete: false, hour: "" }]
    })
    tareaNameRef.current.value = null
    tareaNameRef.current.focus()
  }

  function handleClearTodos() {
    const tarea = tareas.filter(tarea => !tarea.complete)
    setTodos(tarea)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleAddTodo()
    }
  }

  function creaAlertaTareaVacia() {
    return { __html: '<div className="alert alert-danger green"><code>Escriba la tarea :)</code></div>' };
  }

  function handleClearLocal() {
    console.log(tareas)
    setTodos([])
    localStorage.setItem(LOCAL_STORAGE_KEY, "{}")
    tareaNameRef.current.focus()
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h3>
          Lista de tareas del d&iacute;a
          <div className="text-16-normal padding-top-10">(No olvides tus tareas durante el d&iacute;a)</div>
        </h3>
      </div>
      <hr />
      <div className="float-right text-14-normal">{fecha}</div>
      <div className="mt-3 h5">{tareas.filter(tarea => !tarea.complete).length} tareas pendientes</div>
      <hr />
      <div className="row">
        <div className="col-md-6 align-top">
          <div className="alert alert-primary padding-left-15 padding-5 font-18 bold">Por hacer</div>
          <ListaTareas tareas={tareas} toggleTarea={toggleTarea} filtro="A" className="mb-3" />
        </div>
        <div className="col-md-6 align-top">
          <div className="alert alert-success padding-left-15 padding-5 font-18 bold">Completadas</div>
          <ListaTareas tareas={tareas} toggleTarea={toggleTarea} filtro="C" className="mb-3" />
        </div>
      </div>
      <input placeholder="Escriba su tarea" ref={tareaNameRef} type="text" className="form-control w-1 mb-3 mt-3" onKeyDown={handleKeyDown} autoFocus />
      <div ref={alertNameRef}></div>
      <div className="row">
        <div className="col align-top">
          <button onClick={handleAddTodo} className="btn btn-primary">Agregar tarea</button>
        </div>
        <div className="col align-top">
          <button ref={buttonNameRef} onClick={handleClearTodos} className="btn btn-success">Limpiar terminadas</button>
        </div>
        <div className="col align-top">
          <button onClick={handleClearLocal} className="btn btn-warning">Reiniciar todo</button>
        </div>
      </div>
    </div>
  )
}

export default App;
