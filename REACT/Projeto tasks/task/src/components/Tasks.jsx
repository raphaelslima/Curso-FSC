import { SunIcon, CloudIcon, MoonIcon } from '../assets/icons';
import TasksSeparator from './TasksSeparator';

import TaskItem from './TaskItem';

import { useGetTasks } from '../hooks/data/useGetTasks';
import Header from './Header';

const Tasks = () => {
  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task) => task.time === 'morning');
  const afternonTasks = tasks?.filter((task) => task.time === 'afternoon');
  const nightTasks = tasks?.filter((task) => task.time === 'night');

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header title={'Minhas Tarefas'} subtile={'Minhas Tarefas'} />

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} title={'Manhã'} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa adicionada para o período da manhã.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksSeparator icon={<CloudIcon />} title={'Tarde'} />
          {afternonTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa adicionada para o período da tarde.
            </p>
          )}
          {afternonTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <div className="space-y-3">
          <TasksSeparator icon={<MoonIcon />} title={'Noite'} />
          {nightTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa adicionada para o período da noite.
            </p>
          )}
          {nightTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
