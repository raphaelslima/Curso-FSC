import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { taskQueryKeys } from '../../keys/queries';
import { TaskMutationsKeys } from '../../keys/mutations';

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: TaskMutationsKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`);

      return deletedTask;
    },
    onSuccess: async (deletedTask) => {
      await queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id);
      });
    },
  });
};
