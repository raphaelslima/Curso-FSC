import DashboardCards from '../components/DashboardCards';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskItem from '../components/TaskItem';
import { useGetTasks } from '../hooks/data/useGetTasks';

const HomePage = () => {
  const { data: tasks } = useGetTasks();
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header title={'Dashboard'} subtile={'Dashboard'} />
        <DashboardCards />
        <div className="grid grid-cols-[1.5fr,1fr] gap-6">
          <div className="space-y-3 rounded-[10px] bg-white p-6">
            <div>
              <h3 className="tx-lg font-semibold">Tarefas</h3>
              <span className="text-sm text-brand-dark-gray">
                Resumo das tarefas
              </span>
            </div>

            <div className="space-y-3">
              {tasks?.map((task) => {
                return <TaskItem key={task.id} task={task} />;
              })}
            </div>
          </div>
          <div className="flex items-center justify-center space-y-3 rounded-[10px] bg-white p-6">
            <p className="text-brand-dark-gray">
              Só quem perde e quem desiste! Nunca desista, assim você sempre
              será um vitórioso!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
