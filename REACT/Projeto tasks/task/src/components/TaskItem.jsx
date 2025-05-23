import { CheckIcon, LoaderIcon, DetailsIcon, TrashIcon } from '../assets/icons';
import Button from './Button';

const TaskItem = ({ task, handleCheckboxClick, handleTaskDelete }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00adb5]  text-[#00adb5]]';
    }
    if (task.status === 'in_progress') {
      return 'bg-[#ffaa04]  text-[#ffaa04]]';
    }
    if (task.status === 'not_started') {
      return 'bg-[#35383e] bg-opacity-10 text-[#35383e]]';
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
            <LoaderIcon className="text-brand-white animate-spin" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button variant={'ghost'} onClick={() => handleTaskDelete(task.id)}>
          <TrashIcon className={'text-[#9a9c9f]'} />
        </Button>

        <a href="#" className="hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
