import Button from './Button';
import IconAdd from '../assets/icons/add.svg?react';
import IconTrash from '../assets/icons/trash.svg?react';
import SunIcon from '../assets/icons/sun.svg?react';
import CloudIcon from '../assets/icons/cloud-sun.svg?react';
import MoonIcon from '../assets/icons/moon.svg?react';
import TasksSeparator from './TasksSeparator';
import { useState } from 'react';
import data from '../constants/tasks';
import TaskItem from './TaskItem';

const Tasks = () => {
  const [tasks, setTasks] = useState(data);

  const morningTasks = tasks.filter((task) => task.time === 'morning');
  const afternonTasks = tasks.filter((task) => task.time === 'afternoon');
  const nightTasks = tasks.filter((task) => task.time === 'night');

  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00adB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant={'primary'}>
            Nova Tarefa <IconAdd />
          </Button>
          <Button variant={'secundary'}>
            Limpar Tarefas <IconTrash />
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} title={'Manhã'} />
          {morningTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksSeparator icon={<CloudIcon />} title={'Tarde'} />
          {afternonTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <div className="space-y-3">
          <TasksSeparator icon={<MoonIcon />} title={'Noite'} />
          {nightTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
