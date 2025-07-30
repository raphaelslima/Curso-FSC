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

const AddTaskDialog = ({ isOpen, handleClose, onSubmitSucess }) => {
  const nodeRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    const newErrors = [];

    if (!titleRef.current.value.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'Esse campo é obritório.',
      });
    }

    if (!timeRef.current.value.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'Esse campo é obritório.',
      });
    }

    if (!descriptionRef.current.value.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'Esse campo é obritório.',
      });
    }

    setErrors(newErrors);
    if (newErrors.length > 0) {
      return setIsLoading(true);
    }

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify({
        id: v4(),
        title: titleRef.current.value,
        time: timeRef.current.value,
        description: descriptionRef.current.value,
        status: 'not_started',
      }),
    });

    if (!response.ok) {
      setIsLoading(false);
      return toast.error('Erro ao adiconar tarefa! Por favor tente novamente.');
    }

    onSubmitSucess({
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    });
    setIsLoading(false);
    handleClose();
  };
  const errorTitle = errors.find((error) => error.inputName === 'title');
  const errorTime = errors.find((error) => error.inputName === 'time');
  const errorDescription = errors.find(
    (error) => error.inputName === 'description'
  );
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

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  placeholder="Insira o título da tarefa"
                  label={'Título'}
                  id="title"
                  error={errorTitle}
                  ref={titleRef}
                  disabled={isLoading}
                />

                <TimeSelect
                  error={errorTime}
                  ref={timeRef}
                  disabled={isLoading}
                />

                <Input
                  placeholder="Descreva a tarefa"
                  label={'Descrição'}
                  id="description"
                  ref={descriptionRef}
                  error={errorDescription}
                  disabled={isLoading}
                />

                <div className="flex gap-3">
                  <Button
                    color={'secondary'}
                    size="larger"
                    className="w-full text-center"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color={'primary'}
                    size="larger"
                    className="w-full text-center"
                    onClick={() => handleSubmit()}
                    disabled={isLoading}
                  >
                    {isLoading && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </div>
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
