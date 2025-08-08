import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time,
          description: data.description.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      return response.json();
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
