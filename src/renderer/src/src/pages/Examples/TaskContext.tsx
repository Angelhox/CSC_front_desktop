/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// import { tasks as data } from "../data/tasks/tasks";
// eslint-disable-next-line no-unused-vars
export interface ITask {
  id?: number | undefined;
  title: string;
  description: string;
}
interface providerProps {
  children: ReactNode;
}
interface taskProviderType {
  tasks: ITask[];
  deleteTask: (id: number) => void;
  createTask: (task: ITask) => void;
}
export const data: ITask[] = [
  {
    id: 0,
    title: "Tarea 1",
    description: "Mi primer tarea",
  },
  {
    id: 1,
    title: "Tarea 2",
    description: "Mi segunda tarea",
  },
  {
    id: 2,
    title: "Tarea 3",
    description: "Mi tercera tarea",
  },
];

//Nombre del contexto
export const TaskContext = createContext<taskProviderType | undefined>(
  undefined
);
// Nombre del componente
export function TaskContextProvider({ children }: providerProps) {
  // Variable compartida
  //   let x = 10;
  const [tasks, setTasks] = useState<any>([]);
  useEffect(() => {
    setTasks(data);
  }, []);
  function createTask(task: ITask) {
    setTasks([
      ...tasks,
      { title: task.title, id: tasks.length, description: task.description },
    ]);
  }
  function deleteTask(id: number) {
    setTasks(tasks.filter((task: ITask) => task.id !== id));
    console.log("Eliminar: ", id);
  }
  return (
    <TaskContext.Provider
      value={{
        tasks: tasks,
        deleteTask: deleteTask,
        createTask: createTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
export const UseTaskContext = (): taskProviderType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("UseTaskContext debe usarse dentro de un SociosProvider");
  }
  return context;
};
