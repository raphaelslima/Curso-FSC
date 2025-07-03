import { createPortal } from 'react-dom';
import Input from './Input';
import Button from './Button';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useRef, useState } from 'react';
import './addTaskDialog.css';
import TimeSelect from './TimeSelect';
import { v4 } from 'uuid';

const AddTaskDialog = ({ isOpen, handleClose, handleAddNewTask }) => {
  const nodeRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!isOpen) {
    }
  }, [isOpen]);

  const handleSubmit = () => {
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
      return;
    }

    const newTask = {
      id: v4(),
      title: titleRef.current.value,
      time: timeRef.current.value,
      description: descriptionRef.current.value,
      status: 'not_started',
    };
    handleAddNewTask(newTask);
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
              <h2 className="text-[#35383e]">Nova Tarefa</h2>
              <p className="mb-4 mt-1 text-sm text-[#9a9c9f]">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  placeholder="Insira o título da tarefa"
                  label={'Título'}
                  id="title"
                  error={errorTitle}
                  ref={titleRef}
                />

                <TimeSelect error={errorTime} ref={timeRef} />

                <Input
                  placeholder="Descreva a tarefa"
                  label={'Descrição'}
                  id="description"
                  ref={descriptionRef}
                  error={errorDescription}
                />

                <div className="flex gap-3">
                  <Button
                    variant={'secundary'}
                    size="larger"
                    className="w-full text-center"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant={'primary'}
                    size="larger"
                    className="w-full text-center"
                    onClick={() => handleSubmit()}
                  >
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

export default AddTaskDialog;
