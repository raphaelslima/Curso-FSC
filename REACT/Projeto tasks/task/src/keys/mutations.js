export const TaskMutationsKeys = {
  create: () => ['addTask'],
  edit: (taskId) => ['editTask', taskId],
  delete: (taskId) => ['DeleteTask', taskId],
};
