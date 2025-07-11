import { useState } from 'react';
import { CheckIcon, LoaderIcon, DetailsIcon, IconTrash } from '../assets/icons';
import Button from './Button';
import PropTypes from 'prop-types';
import { toast } from 'sonner';

const TaskItem = ({ task, handleCheckboxClick, onDeleteSucess }) => {
  const [deleteTaskIsLoading, setDeleteTaskIsLoading] = useState(false);

  const handleDeleteClick = async (id) => {
    setDeleteTaskIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      setDeleteTaskIsLoading(false);
      return toast.error('Erro ao deletar tarefa, por favor tente novamente!');
    }

    onDeleteSucess(id);
    toast.success('Tarefa deletada com sucesso!');
    setDeleteTaskIsLoading(false);
  };
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-brand-primary  text-brand-primary]';
    }
    if (task.status === 'in_progress') {
      return 'bg-brand-process  text-brand-process]';
    }
    if (task.status === 'not_started') {
      return 'bg-[#35383e] bg-opacity-10 text-brand-dark-blue';
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 transition ${getStatusClasses()} text-sm`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button
          color={'ghost'}
          onClick={() => handleDeleteClick(task.id)}
          disabled={deleteTaskIsLoading}
        >
          {deleteTaskIsLoading ? (
            <LoaderIcon className="animate-spin text-brand-white" />
          ) : (
            <IconTrash className={'text-brand-text-gray'} />
          )}
        </Button>

        <a href="#" className="hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'night']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
};

export default TaskItem;
