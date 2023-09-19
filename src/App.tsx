import "./App.css";
import { TaskFormModal } from "./components/TaskFormModal";
import { Header } from "./components/Header";
import TasksList from "./components/TasksList";
import { useEffect, useState } from "react";
import { data } from "./data/tasks";
import TaskType from "./models/Task";

function loadInitialTask(): TaskType[] {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    return (JSON.parse(storedTasks));
  }
  return data

}
const App = () => {
  const title = "";
  const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>(loadInitialTask);
  const updateTaskState = (taskId: any) => {
    console.error("I need to be implemented");
  };
  
  const [nextTaskId, setNextTaskId] = useState(1);
  // useEffect(() => {
  //   const storedTasks = localStorage.getItem("tasks");
  //   if (storedTasks) {
  //     setTasks(JSON.parse(storedTasks));
  //   }
  // },[]);
  useEffect(()=>{
    updateLocalStorage(tasks);
    
  },[tasks]);


  
  const updateLocalStorage = (updatedTasks: TaskType[]) =>{
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false)
  };
  const addOrEditTask = (event: { preventDefault: () => void; target: any; }, taskToEditId: any) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const newTask: TaskType = {
      id: nextTaskId,
      title, // title: title
      description,
      done: false,
    };
    if (taskToEditId !== undefined) {
      // Editing an existing task
      const updatedTasks = tasks.map((task) =>
        task.id === taskToEditId ? {...task,title,description} : task
      );
      setTasks(updatedTasks);
      setTaskToEdit(null);
    } else {

      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setNextTaskId(nextTaskId + 1);
    closeModal();
  };

  const editTask = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setTaskToEdit(taskToEdit);
      openModal();
    }

  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id != taskId);
    setTasks(updatedTasks);

    updateLocalStorage(updatedTasks);
  };
  // console.log(tasks)
  return (
    <div className="main">
      <div className="header">
        <h1>{title}</h1>
      </div>
      <Header />
      <TasksList tasksList={tasks} deleteTask={deleteTask} editTask={editTask} />



      <button
        className="add-task-btn"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>
      <TaskFormModal
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        addOrEditTask={addOrEditTask}
        initialValues={
          taskToEdit != null
            ? {
              id: taskToEdit.id,
              title: taskToEdit.title,
              description: taskToEdit.description,
            }
            : undefined
        }
      />
    </div>
  );
};

export default App;
function setTitle(title: FormDataEntryValue | null) {
  throw new Error("Function not implemented.");
}

