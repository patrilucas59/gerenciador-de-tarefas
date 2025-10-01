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

function onAddTaskSubmit (title, description, timerMinutes) {
  const newTask = {
    id: v4(),
    title: title,
    description: description,
    isCompleted: false,
    timerMinutes,
  }
  setTasks([...tasks, newTask])

}

const handleToggleTask = (taskId) => {
  setTasks(prevTasks => 
    prevTasks.map(task => 
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    )
  )
}

  return (
    <div className='w-screen h-screen dark:bg-gray-700 white: bg-slate-600 flex justify-center p-6'>
      <div className='w-[500px] space-y-4'>
        <Title>
          NoteMe - To Do List
        </Title>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />

        <Tasks 
          tasks={tasks} 
          onTaskClick={onTaskClick} 
          onDeleteTaskClick={onDeleteTaskClick} 
          onToggleTask={handleToggleTask}
        />
        <ToastContainer />
      </div>
    </div>
  )
}

export default App