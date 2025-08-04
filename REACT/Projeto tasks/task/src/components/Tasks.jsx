import Button from './Button';
import {
  IconAdd,
  IconTrash,
  SunIcon,
  CloudIcon,
  MoonIcon,
} from '../assets/icons';
import TasksSeparator from './TasksSeparator';
import AddTaskDialog from './AddTaskDialog';
import { useState } from 'react';
import TaskItem from './TaskItem';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Tasks = () => {
  const queryClient = useQueryClient();
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      });
      const tasks = await response.json();
      return tasks;
    },
  });

  const [addTaskDialogisOpen, setaddTaskDialogisOpen] = useState(false);

  const morningTasks = tasks?.filter((task) => task.time === 'morning');
  const afternonTasks = tasks?.filter((task) => task.time === 'afternoon');
  const nightTasks = tasks?.filter((task) => task.time === 'night');

  const handleCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso!');
        return { ...task, status: 'in_progress' };
      }

      if (task.status === 'in_progress') {
        toast.success('Tarefa finalizada com sucesso!');
        return { ...task, status: 'done' };
      }

      if (task.status === 'done') {
        toast.success('Tarefa reiniciada com sucesso!');
        return { ...task, status: 'not_started' };
      }

      return task;
    });
    queryClient.setQueryData('tasks', () => {
      return newTasks;
    });
  };

  const handleAddTaskDialogClose = () => {
    setaddTaskDialogisOpen(false);
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            color={'primary'}
            onClick={() => setaddTaskDialogisOpen(true)}
          >
            Nova Tarefa <IconAdd />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogisOpen}
            handleClose={handleAddTaskDialogClose}
          />

          <Button color={'secondary'}>
            Limpar Tarefas <IconTrash />
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} title={'Manhã'} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa adicionada para o período da manhã.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxClick}
            />
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
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxClick}
            />
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
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
