import { useEffect, useState } from "react"; import "./TasksList.css";  // Importez le CSS pour le composant Task ici
import TaskType from "../models/Task";
import { data } from "../data/tasks";
import { Task } from "./Task";


type TasksListProps = {
    tasksList: TaskType[];
    deleteTask: (id: number) => void;
    editTask: (id: number) => void;
};

function TasksList({ tasksList, deleteTask, editTask }: TasksListProps) {
    const [updatedTasksList, setUpdatedTasksList] = useState<TaskType[]>(tasksList);
    useEffect(() => {
        setUpdatedTasksList(tasksList);
    }, [tasksList]);

    return (
        <>
            {tasksList.map((task) => (
                <Task task={task} deleteTask={deleteTask} editTask={editTask} />
            ))}
        </>
    );
};

export default TasksList;


