import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['addTask'],
    mutationFn: async (task) => {
      const { data: newTask } = await api.post('/tasks', task);
      return newTask;
    },
    onSuccess: async (newTask) => {
      await queryClient.setQueryData(['tasks'], (oldTasks) => {
        return [...oldTasks, newTask];
      });
    },
  });
};
