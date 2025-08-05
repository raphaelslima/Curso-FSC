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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const queryClient = useQueryClient();
  const { data: task, isPending: updateTaskIsLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        toast.error('Erro, tente novamanete!');
      }

      const dataTask = await response.json();

      reset({
        title: dataTask.title,
        time: dataTask.time,
        description: dataTask.description,
      });
    },
  });

  const { mutate: editMutate } = useMutation({
    queryKey: ['editTask', taskId],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time,
          description: data.description.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const newTask = await response.json();
      queryClient.setQueryData(['editTask'], (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return newTask;
          }
          return oldTask;
        });
      });
    },
  });

  const handleSaveClick = async (data) => {
    editMutate(data, {
      onSuccess: () => {
        toast.success('Tarefa alterada com sucesso');
        navigate(-1);
      },
      onError: () => {
        toast.error('Erro ao alterar tarefa!');
      },
    });
  };

  const { mutate: deleteMutate, isPending: deleteTaskIsLoading } = useMutation({
    queryKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        return toast.error('Erro ao deletar tarefa');
      }

      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== taskId);
      });
    },
  });

  const handleDeleteClick = async () => {
    deleteMutate(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso');
        navigate(-1);
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa!');
      },
    });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

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
              disabled={updateTaskIsLoading}
            >
              {updateTaskIsLoading && <LoaderIcon className={'animate-spin'} />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailPage;
