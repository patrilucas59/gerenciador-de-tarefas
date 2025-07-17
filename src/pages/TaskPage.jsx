import { useNavigate, useSearchParams } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Title from "../components/Title";
import TextArea from "../components/TextArea";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";

function TaskPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [originalTitle, setOriginalTitle] = useState("")
  const [originalDescription, setOriginalDescription] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const initialTitle = searchParams.get("title") || localStorage.getItem("taskTitle") || ""
    const initialDescription = searchParams.get("description") || localStorage.getItem("taskDescription") || ""

    setTitle(initialTitle)
    setDescription(initialDescription)
    setOriginalTitle(initialTitle)
    setOriginalDescription(initialDescription)
  }, [searchParams])

  const hasChanges = title !== originalTitle || description !== originalDescription

  function handleSave() {
    localStorage.setItem("taskTitle", title)
    localStorage.setItem("taskDescription", description)
    setOriginalTitle(title)
    setOriginalDescription(description)
    setIsEditing(false)
  }

  return (
    <div className="h-screen w-screen bg-slate-600 p-6 flex justify-center">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative mb-6 text-slate-100">
          <button onClick={() => navigate(-1)} className="absolute left-0 top-0 bottom-0">
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
              <TextArea
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
