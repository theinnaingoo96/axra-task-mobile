import { useQuery, useMutation, ApolloCache } from '@apollo/client';
import { CREATE_TASK, UPDATE_TASK_STATUS, UPDATE_TASK, DELETE_TASK } from '../api/mutations';
import { Task, TaskStatus } from '../types';
import { GET_TASKS } from '../api/queries';

export const useTasks = () => {
  const { data, loading, error, refetch } = useQuery<{ tasks: Task[] }>(GET_TASKS, {
    fetchPolicy: 'cache-and-network',
  });

  const [createTaskMutation] = useMutation(CREATE_TASK, {
    update(cache: ApolloCache<any>, { data: { createTask } }: any) {
      const existingTasks = cache.readQuery<{ tasks: Task[] }>({ query: GET_TASKS });
      if (existingTasks) {
        cache.writeQuery({
          query: GET_TASKS,
          data: { tasks: [...existingTasks.tasks, createTask] },
        });
      }
    }
  });

  const [updateTaskStatusMutation] = useMutation(UPDATE_TASK_STATUS, {
    update(cache: ApolloCache<any>, { data: { updateTaskStatus } }: any) {
      const existingTasks = cache.readQuery<{ tasks: Task[] }>({ query: GET_TASKS });
      if (existingTasks) {
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasks: existingTasks.tasks.map((task: Task) =>
              task.id === updateTaskStatus.id ? { ...task, status: updateTaskStatus.status, updatedAt: updateTaskStatus.updatedAt } : task,
            ),
          },
        });
      }
    },
  });

  const [updateTaskMutation] = useMutation(UPDATE_TASK);
  
  const [deleteTaskMutation] = useMutation(DELETE_TASK, {
    update(cache: ApolloCache<any>, { data: { deleteTask } }: any) {
      const existingTasks = cache.readQuery<{ tasks: Task[] }>({ query: GET_TASKS });
      if (existingTasks) {
        cache.writeQuery({
          query: GET_TASKS,
          data: { tasks: existingTasks.tasks.filter((t: Task) => t.id !== deleteTask) },
        });
      }
    }
  });

  const createTask = (title: string, description: string) => {
    return createTaskMutation({ variables: { title, description } });
  };

  const updateStatus = (id: string, status: TaskStatus) => {
    return updateTaskStatusMutation({
      variables: { id, status },
      optimisticResponse: {
        updateTaskStatus: {
          __typename: 'Task',
          id,
          status,
          updatedAt: new Date().toISOString(),
        },
      },
    });
  };

  const updateTaskDetails = (id: string, title: string, description: string) => {
    return updateTaskMutation({ variables: { id, title, description } });
  };

  const deleteTask = (id: string) => {
    return deleteTaskMutation({ variables: { id } });
  };

  return {
    tasks: data?.tasks || [],
    loading,
    error,
    createTask,
    updateStatus,
    updateTaskDetails,
    deleteTask,
    refetch,
  };
};
