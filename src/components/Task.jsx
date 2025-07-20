import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { ControlledCheckbox } from './CheckBox';

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    navigate(`/task/${task.id}`);
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
              className="flex items-center bg-slate-400 text-white p-2 rounded-md w-full"
            >
              <ControlledCheckbox checked={task.isCompleted} />
              <span>
                {task.title}
              </span>
            </div>

            <Button title="Detalhes" onClick={() => onSeeDetailsClick(task)}>
              <ArrowRightIcon />
            </Button>

            <Button title="Deletar" onClick={() => onDeleteTaskClick(task.id)}>
              <DeleteOutlineIcon />
            </Button>
          </li>
        ))
      )}
    </ul>
  );
}

export default Tasks;
