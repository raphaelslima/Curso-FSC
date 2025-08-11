import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import TaskDetailPage from './pages/task-details.jsx';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TasksPage from './pages/Tasks.jsx';
import HomePage from './pages/home.jsx';

const queryCliente = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/tasks',
    element: <TasksPage />,
  },
  {
    path: '/task/:taskId',
    element: <TaskDetailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryCliente}>
      <Toaster
        toastOptions={{
          style: {
            color: '#35383e',
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
