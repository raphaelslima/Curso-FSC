import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  IconTrash,
  LoaderIcon,
} from '../assets/icons';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Input from '../components/Input';
import TimeSelect from '../components/TimeSelect';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({});
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        id: v4(),
        title: data.title.trim(),
        time: data.time,
        description: data.description.trim(),
      }),
    });

    if (!response.ok) {
      return toast.error('Erro ao adiconar tarefa! Por favor tente novamente.');
    }

    const newTask = await response.json();
    setTask(newTask);
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return toast.error('Erro ao deletar tarefa');
    }

    toast.success('Tarefa deletada com sucesso');
    navigate(-1);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setTask(data);
      reset({
        title: data.title,
        time: data.time,
        description: data.description,
      });
    };

    fetchTask();
  }, [taskId, reset]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
              onClick={handleBackClick}
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link to="/" className="cursor-pointer text-brand-text-gray">
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            <IconTrash /> Deletar tarefa
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register('title', {
                  required: 'Campo é obrigatório',
                  validate: (value) => {
                    if (value.trim()) {
                      return true;
                    } else {
                      return 'Campo não pode estar vazio.';
                    }
                  },
                })}
                error={errors?.title?.message}
              />
            </div>
            <div>
              <TimeSelect
                id="time"
                label="time"
                {...register('time', {
                  required: 'Campo é obrigatório',
                })}
                error={errors?.time?.message}
              />
            </div>
            <div>
              <Input
                id="description"
                label="description"
                {...register('description', {
                  required: 'Campo é obrigatório',
                  validate: (value) => {
                    if (value.trim()) {
                      return true;
                    } else {
                      return 'Campo não pode ser vazio';
                    }
                  },
                })}
                error={errors?.description?.message}
              />
            </div>
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button
              size="larger"
              color="primary"
              type={'submit'}
              disabled={isSubmitting}
            >
              {isSubmitting && <LoaderIcon className={'animate-spin'} />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailPage;
