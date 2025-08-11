import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useEditTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const { data: newTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        {
          title: data.title.trim(),
          time: data.time,
          description: data.description.trim(),
        }
      );

      return newTask;
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        oldTasks.map((oldTask) => {
          if (oldTask.id === newTask.id) {
            return newTask;
          } else {
            return oldTask;
          }
        });
      });
    },
  });
};
