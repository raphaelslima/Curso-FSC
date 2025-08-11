import DashBoardCard from '../components/DashboardCards';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from '../assets/icons';
import { useGetTasks } from '../hooks/data/useGetTasks';

const HomePage = () => {
  const { data: tasks } = useGetTasks();

  const inProgressTasks = tasks?.filter(
    (task) => task.status == 'in_progress'
  ).length;
  const completedTasks = tasks?.filter((task) => task.status == 'done').length;

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header title={'Dashboard'} subtile={'Dashboard'} />
        <div className="grid grid-cols-4 gap-9">
          <DashBoardCard
            icon={<Tasks2Icon />}
            mainText={tasks?.length}
            secondaryText={'Tarefas disponíveis.'}
          />
          <DashBoardCard
            icon={<TasksIcon />}
            mainText={completedTasks}
            secondaryText={'Tarefas concluídas'}
          />
          <DashBoardCard
            icon={<LoaderIcon />}
            mainText={inProgressTasks}
            secondaryText={'Tarefas em andamento'}
          />
          <DashBoardCard
            icon={<GlassWaterIcon />}
            mainText={5}
            secondaryText={'Água'}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
