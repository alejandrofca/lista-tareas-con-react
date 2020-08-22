import React from 'react'
import Tarea from './Tarea'

export default function TareaList({ tareas, toggleTarea, filtro }) {
  return (
    tareas.map(tarea => {
      return <Tarea key={tarea.id} toggleTarea={toggleTarea} tarea={tarea} filtro={filtro} />
    })
  )
}
