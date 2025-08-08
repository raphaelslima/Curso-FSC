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
import { useGetTask } from '../hooks/data/useGettask';
import { useEditTask } from '../hooks/data/useEditTask';
import { useDeleteTask } from '../hooks/data/useDeleteTask';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: task, isPending: updateTaskIsLoading } = useGetTask(
    taskId,
    (task) => reset(task)
  );

  const { mutate: editMutate } = useEditTask(taskId);

  const handleSaveClick = (data) => {
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

  const { mutate: deleteMutate } = useDeleteTask(taskId);

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
