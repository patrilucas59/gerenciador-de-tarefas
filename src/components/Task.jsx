import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { ControlledCheckbox } from './CheckBox';
import TaskTimer from './TaskTimer';

function Tasks({ tasks, onTaskClick, onDeleteTaskClick, onToggleTask }) {
  const navigate = useNavigate();

  const handleSeeDetails = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const listContainerClasses = `
    space-y-3 sm:space-y-4
    p-2 sm:p-4 bg-slate-200 rounded-md shadow
    overflow-y-auto max-h-[600px] sm:max-h-96
    scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent
    hover:scrollbar-thumb-slate-600 scrollbar-thumb-rounded-lg transition-all
  `;

  return (
    <ul className={listContainerClasses}>
      {tasks.length === 0 ? (
        <p className="text-slate-500 text-center">
          Organize seu dia. Comece criando novas <b>tarefas!</b>
        </p>
      ) : (
        tasks.map((task) => (
          <li key={task.id} className="w-full">
            <div
              onClick={() => onTaskClick(task.id)}
              className="flex items-center gap-2 bg-slate-400 text-white p-2 rounded-md w-full min-h-[58px] cursor-pointer"
            >
              <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
                <ControlledCheckbox 
                  checked={task.isCompleted} 
                  onChange={(e) => {
                    e.stopPropagation();
                    if (!task.isDisabled) onToggleTask(task.id)
                  }}
                  disabled={task.isDisabled}
                />

                <span className="truncate">
                  {task.title}
                </span>
              </div>

              <TaskTimer 
                minutes={task.timerMinutes} 
                startTime={task.startTime} 
                isPaused={task.isDisabled}
              />

              <div className="flex gap-1 ml-1">
                <Button 
                  title="Detalhes" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeeDetails(task.id);
                  }}
                >
                  <ArrowRightIcon fontSize="small" />
                </Button>

                <Button 
                  title="Deletar" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTaskClick(task.id);
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </Button>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

export default Tasks;
