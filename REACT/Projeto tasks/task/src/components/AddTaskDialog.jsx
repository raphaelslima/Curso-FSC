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
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('morning');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setTime('morning');
      setDescription('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!time.trim() || !description.trim() || !time.trim()) {
      return alert('Preencha todos os campos da tarefa.');
    }
    const newTask = {
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    };
    handleAddNewTask(newTask);
    handleClose();
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
              <h2 className="text-[#35383e]">Nova Tarefa</h2>
              <p className="mb-4 mt-1 text-sm text-[#9a9c9f]">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  placeholder="Insira o título da tarefa"
                  label={'Título'}
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <TimeSelect
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <Input
                  placeholder="Descreva a tarefa"
                  label={'Descrição'}
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
