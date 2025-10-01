import { useState } from "react"
import { toast } from "react-toastify"
import Input from "./Input"

function AddTasks({ onAddTaskSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [timerMinutes, setTimerMinutes] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !timerMinutes) {
      toast.warning("Preencha todos os campos da tarefa")
      return
    }

    if (timerMinutes <= 0) {
      toast.warning("O tempo da tarefa deve ser estipulado")
    }

    onAddTaskSubmit(title, description, timerMinutes)
    setTitle('')
    setDescription('')
    setTimerMinutes()
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input 
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <Input 
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />


        <Input 
          type="number"
          placeholder="Tempo da tarefa (em minutos)"
          min={1}
          value={timerMinutes}
          onChange={(event) => setTimerMinutes(Number(event.target.value))}
        />

        <button 
          type="submit"
          className='bg-slate-500 text-white rounded-md px-4 py-2 font-medium hover:bg-slate-600 transition-colors duration-200'
        >
          Adicionar Tarefa
        </button>
    </div>
  </form>
  )
}

export default AddTasks