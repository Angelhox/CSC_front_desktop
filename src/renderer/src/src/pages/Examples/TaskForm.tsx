/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import {  useState } from "react";
import { UseTaskContext } from "./TaskContext";
function TaskForm() {
  const { createTask } =UseTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const newTask = {
      title: title,
      description: description,
    };
    createTask(newTask);
    console.log(newTask);
    setTitle("");
    setDescription("");
  };
  return (
    <div className="rounded-md max-w-md mx-auto bg-slate-800 p-10 mb-4">
      <h1 className="text-2xl font-bold text-white mb-3">Crea tus tareas</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="bg-slate-300 p-3 w-full mb-2 rounded-md"
          autoFocus
          placeholder="Escribe tu tarea "
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          className="bg-slate-300 p-3 w-full mb-2 rounded-md"
          placeholder="Escribe una descripcion "
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button className="bg-indigo-500 px-3 py-1 rounded-md text-white">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
