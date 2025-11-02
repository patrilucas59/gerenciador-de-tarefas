import { useState } from "react"
import { toast } from "react-toastify"
import Input from "./Input"

function AddTasks({ onAddTaskSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [timerMinutes, setTimerMinutes] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !timerMinutes) {
      toast.warning("Preencha todos os campos da tarefa")
      return
    }

  const minutes = Number(timerMinutes);

  if (isNaN(minutes) || minutes <= 0) {
    toast.warning("Por favor, insira um número válido de minutos maior que zero.");
    return;
  }

  if (minutes > 40) {
    toast.error("O tempo máximo permitido é de 40 minutos.");
    return;
  }

    onAddTaskSubmit(title, description, timerMinutes)
    setTitle('')
    setDescription('')
    setTimerMinutes('')
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
          onChange={(e) => setTimerMinutes((e.target.value))}
          onKeyDown={(e) => {
            if (['e', 'E', '+', '-'].includes(e.key)) {
              e.preventDefault();
            }
          }}
          onInput={(e) => {
            e.target.value = e.targe.value.replace(/[^0-9]/g, '');
            setTimerMinutes(e.target.value)
          }}
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