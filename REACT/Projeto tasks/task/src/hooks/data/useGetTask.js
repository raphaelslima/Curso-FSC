import { useQuery } from '@tanstack/react-query';

export const useGetTask = (taskId, onSucess) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        toast.error('Erro, tente novamanete!');
      }

      const dataTask = await response.json();
      onSucess(dataTask);
      return dataTask;
    },
  });
};
