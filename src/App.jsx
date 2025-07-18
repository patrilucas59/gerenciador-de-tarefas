import { useEffect, useState } from "react"
import AddTasks from "./components/AddTask"
import Tasks from "./components/Task"
import { ToastContainer } from "react-toastify";
import { v4 } from 'uuid'
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);

function onTaskClick(taskId) {
  const newTasks = tasks.map(task => {
    if (task.id === taskId) {
      return { ...task, isCompleted: !task.isCompleted };
    }
    
    return task
  });
  setTasks(newTasks);
}

function onDeleteTaskClick(taskId) {
  const newTasks = tasks.filter((task) => task.id !== taskId)
  setTasks(newTasks);
}

function onAddTaskSubmit (title, description) {
  const newTask = {
    id: v4(),
    title: title,
    description: description,
    isCompleted: false,
  }
  setTasks([...tasks, newTask])

}

  return (
    <div className='w-screen h-screen bg-slate-600 flex justify-center p-6'>
      <div className='w-[500px] space-y-4'>
        <Title>
          Gerenciador de Tarefas
        </Title>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />

        <Tasks 
          tasks={tasks} 
          onTaskClick={onTaskClick} 
          onDeleteTaskClick={onDeleteTaskClick} 
          />
        <ToastContainer />
      </div>
    </div>
  )
}

export default App