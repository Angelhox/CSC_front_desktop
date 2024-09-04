/* eslint-disable no-unused-vars */
import { ITask, UseTaskContext } from "./TaskContext";
interface Props {
  task: ITask;
}
function TaskCard({ task }: Props) {
  const { deleteTask } = UseTaskContext();

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md">
      <h1 className="text-xl font-bold capitalize">{task.title}</h1>
      <p className="text-gray-500 text-sm">{task.description}</p>
      <button
        className="bg-red-500 px-2 py-1 rounded-md mt-4 hover:bg-red-400"
        onClick={() => {
          if (typeof task.id === "number") {
            deleteTask(task.id);
          }
        }}
      >
        Eliminar
      </button>
    </div>
  );
}

export default TaskCard;
