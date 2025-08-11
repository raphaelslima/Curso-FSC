import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { taskQueryKeys } from '../../keys/queries';
import { TaskMutationsKeys } from '../../keys/mutations';

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: TaskMutationsKeys.create(),
    mutationFn: async (task) => {
      const { data: newTask } = await api.post('/tasks', task);
      return newTask;
    },
    onSuccess: async (newTask) => {
      await queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return [...oldTasks, newTask];
      });
    },
  });
};
