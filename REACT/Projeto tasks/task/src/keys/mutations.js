import { create } from 'json-server';

export const TaskMutationsKeys = {
  create: () => ['addTask'],
  edit: (taskId) => ['editTask', taskId],
  delete: (taskId) => ['DeleteTask', taskId],
};
