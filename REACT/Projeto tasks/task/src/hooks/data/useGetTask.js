import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetTask = (taskId, onSucess) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const { data: dataTask } = await axios.get(
        `http://localhost:3000/tasks/${taskId}`
      );

      onSucess(dataTask);
      return dataTask;
    },
  });
};
