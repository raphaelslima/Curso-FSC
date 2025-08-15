import DashBoardCard from './DashboardCard';
import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from '../assets/icons';
import { useGetTasks } from '../hooks/data/useGetTasks';

const DashboardCards = () => {
  const { data: tasks } = useGetTasks();

  const notStartedTasks = tasks?.filter(
    (task) => task.status == 'not_started'
  ).length;
  const inProgressTasks = tasks?.filter(
    (task) => task.status == 'in_progress'
  ).length;
  const completedTasks = tasks?.filter((task) => task.status == 'done').length;

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashBoardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        secondaryText={'Tarefas Totais.'}
      />
      <DashBoardCard
        icon={<Tasks2Icon />}
        mainText={notStartedTasks}
        secondaryText={'Não iniciadas'}
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
    </div>
  );
};

export default DashboardCards;
