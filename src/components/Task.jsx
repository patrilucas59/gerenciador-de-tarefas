import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { ControlledCheckbox } from './CheckBox';

function Tasks({ tasks, onTaskClick, onDeleteTaskClick, onToggleTask }) {
  const navigate = useNavigate();

  const handleSeeDetails = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const listContainerClasses = `
    space-y-4 p-4 bg-slate-200 rounded-md shadow
    overflow-y-auto max-h-96
    scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-transparent
    hover:scrollbar-thumb-slate-600 scrollbar-thumb-rounded-lg transition-all
  `;

  const taskItemClasses = `
    flex items-center bg-slate-400 text-white p-2 rounded-md w-full cursor-pointer
    w-[330px] h-[58px] overflow-hidden text-ellipsis whitespace-nowrap
  `;

  return (
    <ul className={listContainerClasses}>
      {tasks.length === 0 ? (
        <p className="text-slate-500 text-center">
          Organize seu dia. Comece criando novas <b>tarefas!</b>
        </p>
      ) : (
        tasks.map((task) => (
          <li key={task.id} className="flex gap-2">
            <div
              onClick={() => onTaskClick(task.id)}
              className={taskItemClasses}
              >
              <ControlledCheckbox 
                checked={task.isCompleted} 
                onChange={() => onToggleTask(task.id)}    
              />
              <span>
                {task.title}
              </span>
            </div>

            <Button title="Detalhes" onClick={() => handleSeeDetails(task.id)}>
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
