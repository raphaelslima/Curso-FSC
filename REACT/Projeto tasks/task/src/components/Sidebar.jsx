import SidebarButton from './SidebarButton';
import HomeIcon from '../assets/icons/home.svg?react';
import TextItem from '../assets/icons/tasks.svg?react';

const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-[#00ad85]">Task Manager</h1>
        <p>
          Um simples{' '}
          <span className="text-[#00ad85]">organizador de tarefas</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton variant="unselected">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton variant="selected">
          <TextItem />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
