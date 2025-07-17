import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import ControlledCheckbox from './CheckBox';

function Tasks({tasks, onTaskClick, onDeleteTaskClick}) {
  const navigate = useNavigate()

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams()
    query.set("id", task.id)
    query.set("title", task.title)
    query.set("description", task.description)
    navigate(`/task?${query.toString()}`)
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.length === 0 ? (
        <p className="text-slate-500 text-center">
          Organize seu dia. Comece criando novas <b>tarefas!</b>
        </p>
      ) : (
        tasks.map((task) => (
          <li key={task.id} className="flex gap-2">
            <div
              onClick={() => onTaskClick(task.id)}
              className="flex items-center bg-slate-400 text-white p-2 rounded-md w-full cursor-pointer hover:bg-slate-500"
            >
              <ControlledCheckbox />
            <span>
              {task.title}
            </span>
            </div>

            <Button onClick={() => {onSeeDetailsClick(task)}}>
              <ArrowRightIcon />
            </Button>

            <Button onClick={() => onDeleteTaskClick(task.id)}>
              <DeleteOutlineIcon />
            </Button>
          </li>
         ))
       )}
     </ul>
   )
}

export default Tasks