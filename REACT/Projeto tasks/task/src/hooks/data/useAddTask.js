import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['addTask'],
    mutationFn: async (task) => {
      const { data: newTask } = await axios.post(
        'http://localhost:3000/tasks',
        task
      );
      return newTask;
    },
    onSuccess: async (newTask) => {
      await queryClient.setQueryData(['tasks'], (oldTasks) => {
        return [...oldTasks, newTask];
      });
    },
  });
};
