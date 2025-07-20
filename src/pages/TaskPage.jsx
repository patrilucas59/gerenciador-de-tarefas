import { useNavigate, useParams } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Title from "../components/Title";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import Input from "../components/Input";
import TextArea from '../components/TextArea'

function TaskPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [originalTitle, setOriginalTitle] = useState("")
  const [originalDescription, setOriginalDescription] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem("tasks")
    const parsed = stored ? JSON.parse(stored) : []

    setTasks(parsed)

    const task = parsed.find((event) => event.id === id)
    if (!task) {
      alert("Tarefa não encontrada.")
      navigate("/")
      return
    }

    setTitle(task.title)
    setDescription(task.description)
    setOriginalTitle(task.title)
    setOriginalDescription(task.description)
  }, [id, navigate])

  const hasChanges = title !== originalTitle || description !== originalDescription

  function handleSave() {
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle || !trimmedDescription) return

    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, title: trimmedTitle, description: trimmedDescription }
        : task
    )

    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    setTasks(updatedTasks)

    setOriginalTitle(trimmedTitle)
    setOriginalDescription(trimmedDescription)
    setIsEditing(false)
  }

  function handleGoBack() {
    if (hasChanges) {
      const confirmLeave = window.confirm("Você tem alterações não salvas. Deseja sair?")
      if (!confirmLeave) return
    }
    navigate(-1)
  }

  return (
    <div className="h-screen w-screen bg-slate-600 p-6 flex justify-center">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative mb-6 text-slate-100">
          <button onClick={handleGoBack} className="absolute left-0 top-0 bottom-0" title="Voltar">
            <ArrowBackIcon />
          </button>
          <Title>Detalhes da Tarefa</Title>
        </div>

        <div className="bg-slate-200 p-4 rounded-md relative space-y-6">
          {isEditing ? (
            hasChanges ? (
              <button
                onClick={handleSave}
                className="absolute top-2 right-4 text-green-600 hover:text-green-800"
                title="Salvar alterações"
              >
                <CheckIcon />
              </button>
            ) : (
              <button
                className="absolute top-2 right-4 text-slate-400 cursor-default"
                title="Sem alterações"
              >
                <CheckIcon />
              </button>
            )
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-2 right-4 text-slate-500 hover:text-slate-700"
              title="Editar"
            >
              <EditIcon />
            </button>
          )}

          <div>
            {isEditing ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={1}
              />
            ) : (
              <h2 className="text-xl font-bold text-slate-600">{title}</h2>
            )}
          </div>

          <div>
            {isEditing ? (
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            ) : (
              <p className="text-slate-600">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskPage
