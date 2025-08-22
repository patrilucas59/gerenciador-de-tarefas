import { useState } from "react"
import { toast } from "react-toastify"
import Input from "./Input"

function AddTasks({ onAddTaskSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      toast.warning("Preencha o título e a descrição da tarefa")
      return
    }

    onAddTaskSubmit(title, description)
    setTitle('')
    setDescription('')
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