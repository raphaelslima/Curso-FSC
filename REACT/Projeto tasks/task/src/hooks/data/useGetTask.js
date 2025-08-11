import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';

export const useGetTask = (taskId, onSucess) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const { data: dataTask } = await pai.get(`/tasks/${taskId}`);

      onSucess(dataTask);
      return dataTask;
    },
  });
};
