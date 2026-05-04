import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [metas, setMetas] = useState([]);

  // 🔹 OBTENER TAREAS
  const obtenerTareas = async () => {
    const res = await fetch("http://localhost:3000/getTasks", {
      headers: {
        Authorization: "123456"
      }
    });

    const data = await res.json();
    setTareas(data);
  };

  // 🔹 OBTENER METAS
  const obtenerMetas = async () => {
    const res = await fetch("http://localhost:3000/getGoals", {
      headers: {
        Authorization: "123456"
      }
    });

    const data = await res.json();
    setMetas(data);
  };

  // 🔹 AGREGAR TAREA
  const agregarTarea = async (tarea) => {
    await fetch("http://localhost:3000/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "123456"
      },
      body: JSON.stringify(tarea)
    });

    obtenerTareas();
  };

  // 🔹 AGREGAR META
  const agregarMeta = async (meta) => {
    await fetch("http://localhost:3000/addGoal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "123456"
      },
      body: JSON.stringify(meta)
    });

    obtenerMetas();
  };

  // 🔹 ELIMINAR TAREA
  const eliminarTarea = async (index) => {
    await fetch(`http://localhost:3000/removeTask/${index}`, {
      method: "DELETE",
      headers: {
        Authorization: "123456"
      }
    });

    obtenerTareas();
  };

  // 🔹 ELIMINAR META
  const eliminarMeta = async (index) => {
    await fetch(`http://localhost:3000/removeGoal/${index}`, {
      method: "DELETE",
      headers: {
        Authorization: "123456"
      }
    });

    obtenerMetas();
  };

  // 🔹 CARGAR AL INICIO
  useEffect(() => {
    obtenerTareas();
    obtenerMetas();
  }, []);

  return (
    <div className="main-bg">
      <div className="container py-4">
        <h2 className="title">Mis Metas y Tareas</h2>

        <div className="row">
          {/* FORMULARIO TAREAS */}
          <div className="col-md-4">
            <TaskForm agregarTarea={agregarTarea} />
          </div>

          {/* LISTA TAREAS */}
          <div className="col-md-8">
            <TaskList tareas={tareas} eliminarTarea={eliminarTarea} />

            {/* 🔥 METAS */}
            <h3 className="text-white mt-4">Metas</h3>

            {metas.map((meta, index) => (
              <div key={index} className="task-card-new">
                <div className="p-3">
                  <h5>{meta.nombre}</h5>
                  <p>{meta.descripcion}</p>

                  <button
                    className="btn-delete"
                    onClick={() => eliminarMeta(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}