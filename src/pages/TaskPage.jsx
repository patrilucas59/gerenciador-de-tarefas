import { useNavigate, useParams } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Title from "../components/Title";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import Input from "../components/Input";
import TextArea from '../components/TextArea'
import { toast, ToastContainer } from "react-toastify";

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

    const task = parsed.find((task) => task.id === id)
    if (!task) {
      throw new Response("Not Found", { status: 404 })
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
      toast.warning("Você tem alterações não salvas!")
      return
    }
    navigate(-1)
  }

  return (
    <div className="h-screen w-screen dark:bg-gray-700 bg-slate-600 p-6 flex justify-center overflow-hidden">
      <div className="w-[600px] space-y-4">
        <div className="flex justify-center relative mb-6 text-slate-100">
          <button onClick={handleGoBack} className="absolute left-0 top-0 bottom-0" title="Voltar">
            <ArrowBackIcon />
          </button>
          <Title>Detalhes da Tarefa</Title>
        </div>

        <div 
          className="
            bg-slate-200 p-4 rounded-md relative 
            space-y-6 
            min-h-[100px] max-h-[600px] 
            overflow-y-auto 
            scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-transparent 
            hover:scrollbar-thumb-slate-600 scrollbar-thumb-rounded-lg 
            transition-all
          "
        >
          <div className="flex justify-between top-2 right-4 text-slate-400 cursor-default">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={!hasChanges || !title.trim() || !description.trim()}
                className={`static top-2 right-4 transition-colors 
                  ${!hasChanges || !title.trim() || !description.trim()
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-green-600 hover:text-green-800"
                  }`}
                title={
                  !title.trim() || !description.trim()
                    ? "Preencha todos os campos"
                    : !hasChanges
                    ? "Sem alterações"
                    : "Salvar alterações"
                }
              >
                <CheckIcon />
              </button>

              <button
                onClick={() => {
                  setTitle(originalTitle)
                  setDescription(originalDescription)
                  setIsEditing(false)
                }}
                className="text-red-500 hover:text-red-700"
                title="Cancelar"
              >
                <CloseIcon />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-2 right-4 text-slate-500 hover:text-slate-700"
              title="Editar"
            >
              <EditIcon />
            </button>
          )}
          </div>

          <div>
            {isEditing ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={1}
              />
            ) : (
              <h2 className="text-xl font-bold text-slate-600 min-h-[50px] max-h-[500px] overflow-hidden text-ellipsis whitespace-pre-wrap">
                {title}
              </h2>
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
              <p className="text-slate-600 overflow-y-auto whitespace-pre-wrap min-h-[100px] max-h-[500px] overflow-hidden text-ellipsis">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default TaskPage
