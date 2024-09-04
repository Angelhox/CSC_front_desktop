/* eslint-disable no-unused-vars */
import TaskCard from "./TaskCard";
import { ITask, UseTaskContext } from "./TaskContext";
export function TaskList() {
  const { tasks } = UseTaskContext();
  if (tasks.length === 0) {
    return <h1 className="text-white font-bold text-4xl">No hay tareas aún</h1>;
  }
  return (
    <div className="grid grid-cols-4 gap-2">
      {tasks.map((task: ITask) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
