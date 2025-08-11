import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { TaskMutationsKeys } from '../../keys/mutations';

export const useEditTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: TaskMutationsKeys.edit(taskId),
    mutationFn: async (data) => {
      const { data: newTask } = await api.patch(`/tasks/${taskId}`, {
        title: data.title.trim(),
        time: data.time,
        description: data.description.trim(),
      });

      return newTask;
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
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
