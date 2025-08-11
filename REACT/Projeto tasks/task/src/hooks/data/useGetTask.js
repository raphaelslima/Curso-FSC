import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { taskQueryKeys } from '../../keys/queries';

export const useGetTask = (taskId, onSucess) => {
  return useQuery({
    queryKey: taskQueryKeys.getOne(taskId),
    queryFn: async () => {
      const { data: dataTask } = await pai.get(`/tasks/${taskId}`);

      onSucess(dataTask);
      return dataTask;
    },
  });
};
