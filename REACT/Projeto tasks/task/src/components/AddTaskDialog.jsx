import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useRef, useState } from 'react';
import './addTaskDialog.css';
import TimeSelect from './TimeSelect';
import { v4 } from 'uuid';
import { LoaderIcon } from '../assets/icons';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useAddTask } from '../hooks/data/useAddTask';

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const { mutate } = useAddTask();

  const nodeRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isOpen) {
    }
  }, [isOpen]);

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title,
      time: data.time,
      description: data.description,
      status: 'not_started',
    };

    mutate(task, {
      onSuccess: () => {
        handleClose();
        reset({
          title: '',
          time: 'morning',
          description: '',
        });

        toast.success('Criado com sucesso!');
      },

      onError: () => {
        throw new Error('Erro ao adicionar tarefa.');
      },
    });
  };

  const handleCancelForm = () => {
    handleClose();
    reset({
      title: '',
      time: 'morning',
      description: '',
    });
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames={'add-task-dialog'}
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-brand-dark-blue">Nova Tarefa</h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <form onSubmit={handleSubmit(handleSaveClick)}>
                <div className="flex w-[336px] flex-col space-y-4">
                  <Input
                    placeholder="Insira o título da tarefa"
                    label={'Título'}
                    id="title"
                    error={errors?.title?.message}
                    {...register('title', {
                      required: 'Campo Obrigatório',
                      validate: (value) => {
                        if (value.trim()) {
                          return true;
                        } else {
                          return 'O campo não pode estar vazio';
                        }
                      },
                    })}
                    disabled={isSubmitting}
                  />

                  <TimeSelect
                    error={errors?.time?.message}
                    {...register('time', {
                      required: 'Campo Obrigatório',
                      validate: (value) => {
                        if (value.trim()) {
                          return true;
                        } else {
                          return 'O campo não pode estar vazio';
                        }
                      },
                    })}
                    disabled={isSubmitting}
                  />

                  <Input
                    placeholder="Descreva a tarefa"
                    label={'Descrição'}
                    id="description"
                    {...register('description', {
                      required: 'Campo Obrigatório',
                      validate: (value) => {
                        if (value.trim()) {
                          return true;
                        } else {
                          return 'O campo não pode estar vazio';
                        }
                      },
                    })}
                    error={errors?.description?.message}
                    disabled={isSubmitting}
                  />

                  <div className="flex gap-3">
                    <Button
                      color={'secondary'}
                      size="larger"
                      className="w-full text-center"
                      onClick={handleCancelForm}
                      type="button"
                    >
                      Cancelar
                    </Button>
                    <Button
                      color={'primary'}
                      size="larger"
                      className="w-full text-center"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && <LoaderIcon className="animate-spin" />}
                      Salvar
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default AddTaskDialog;
