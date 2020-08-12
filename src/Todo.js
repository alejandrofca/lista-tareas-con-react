import React from 'react'

export default function Todo({ todo, toggleTodo, filtro }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  let checkbox, etiqueta, render
  if (filtro === "A") { // Activa
    if (!todo.complete) {
      checkbox = <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />;
      etiqueta = todo.name;
    }
  } else if (filtro === "C") { // Completada
    if (todo.complete) {
      etiqueta =
        <>
          <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        &nbsp;&nbsp;
          <span className="green text-normal">
            <strike> {todo.name}&nbsp;</strike>
            <span className="green text-14-normal">({todo.hour})</span>
          </span>
        </>
    }
  }

  if (checkbox) console.log(">>>>" + checkbox)
  if (etiqueta) console.log(">>>>" + etiqueta)

  if (checkbox || etiqueta) {
    render =
      <div>
        <label className="mb-2 mt-2 h5">
          {checkbox}
      &nbsp;&nbsp;
      {etiqueta}
        </label>
      </div>
  } else {
    render = <></>
  }

  return (
    render
  )
}
