import Button from './Button';
import IconAdd from '../assets/icons/add.svg?react';
import IconTrash from '../assets/icons/trash.svg?react';

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00adB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant={'primary'}>
            Nova Tarefa <IconAdd />
          </Button>
          <Button variant={'secundary'}>
            Limpar Tarefas <IconTrash />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
