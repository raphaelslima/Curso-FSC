import { useState } from 'react';
import { IconAdd, IconTrash } from '../assets/icons';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';

const Header = ({ title, subtile }) => {
  const [addTaskDialogisOpen, setaddTaskDialogisOpen] = useState(false);
  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {title}
        </span>
        <h2 className="text-xl font-semibold">{subtile}</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button color={'primary'} onClick={() => setaddTaskDialogisOpen(true)}>
          Nova Tarefa <IconAdd />
        </Button>

        <AddTaskDialog
          isOpen={addTaskDialogisOpen}
          handleClose={() => setaddTaskDialogisOpen(false)}
        />

        <Button color={'secondary'}>
          Limpar Tarefas <IconTrash />
        </Button>
      </div>
    </div>
  );
};

export default Header;
