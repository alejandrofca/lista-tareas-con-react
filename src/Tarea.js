import React from 'react'

export default function Tarea({ tarea, toggleTarea, filtro }) {
  function handleTareaClick() {
    toggleTarea(tarea.id)
  }

  let checkbox, etiqueta, render
  if (filtro === "A") { // Activa
    if (!tarea.complete) {
      checkbox = <input type="checkbox" checked={tarea.complete} onChange={handleTareaClick} />;
      etiqueta = tarea.name;
    }
  } else if (filtro === "C") { // Completada
    if (tarea.complete) {
      etiqueta =
        <>
          <input type="checkbox" checked={tarea.complete} onChange={handleTareaClick} />
          &nbsp;&nbsp;
          <span className="green text-normal">
            <strike> {tarea.name}</strike>&nbsp;&nbsp;
            <span className="green text-14-normal">({tarea.hour})</span>
          </span>
        </>
    }
  }

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
