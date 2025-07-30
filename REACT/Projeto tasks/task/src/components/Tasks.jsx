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
import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { toast } from 'sonner';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [addTaskDialogisOpen, setaddTaskDialogisOpen] = useState(false);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'GET',
    });
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const morningTasks = tasks.filter((task) => task.time === 'morning');
  const afternonTasks = tasks.filter((task) => task.time === 'afternoon');
  const nightTasks = tasks.filter((task) => task.time === 'night');

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

    setTasks(newTasks);
  };

  const onDeleteSucess = async (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const handleAddTaskDialogClose = () => {
    setaddTaskDialogisOpen(false);
  };

  const onSubmitSucess = async (newTask) => {
    setTasks([...tasks, newTask]);
    fetchTasks();
    toast.success('Tarefa adIcionada com sucesso');
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
            onSubmitSucess={onSubmitSucess}
          />

          <Button color={'secondary'}>
            Limpar Tarefas <IconTrash />
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator icon={<SunIcon />} title={'Manhã'} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxClick}
              onDeleteSucess={onDeleteSucess}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksSeparator icon={<CloudIcon />} title={'Tarde'} />
          {afternonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxClick}
              onDeleteSucess={onDeleteSucess}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TasksSeparator icon={<MoonIcon />} title={'Noite'} />
          {nightTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxClick}
              onDeleteSucess={onDeleteSucess}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
