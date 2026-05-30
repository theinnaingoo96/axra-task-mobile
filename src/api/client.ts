import { ApolloClient, InMemoryCache, ApolloLink, Observable } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import { mmkvStorageWrapper, storage } from '../storage/mmkv';
import { Task } from '../types';

const cache = new InMemoryCache();

export const setupApollo = async () => {
  await persistCache({
    cache,
    storage: mmkvStorageWrapper,
  });

  return new ApolloClient({
    cache,
    link: mockLink,
  });
};

const TASKS_STORAGE_KEY = 'mock_tasks_db';

const loadTasks = (): Task[] => {
  const data = storage.getString(TASKS_STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
};

const saveTasks = (tasks: Task[]) => {
  storage.set(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

let mockTasks: Task[] = loadTasks();

const mockLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    setTimeout(() => {
      const { operationName, variables } = operation;
      
      switch (operationName) {
        case 'GetTasks':
          observer.next({
            data: {
              tasks: mockTasks.map(t => ({ ...t, __typename: 'Task' }))
            }
          });
          break;
        case 'CreateTask': {
          const newTask: Task = {
            id: Date.now().toString(),
            title: variables.title,
            description: variables.description,
            status: 'Todo',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          mockTasks.push(newTask);
          saveTasks(mockTasks);
          observer.next({
            data: {
              createTask: { ...newTask, __typename: 'Task' }
            }
          });
          break;
        }
        case 'UpdateTaskStatus': {
          const taskIndex = mockTasks.findIndex(t => t.id === variables.id);
          if (taskIndex > -1) {
            mockTasks[taskIndex] = {
              ...mockTasks[taskIndex],
              status: variables.status,
              updatedAt: new Date().toISOString()
            };
            saveTasks(mockTasks);
            observer.next({
              data: {
                updateTaskStatus: { ...mockTasks[taskIndex], __typename: 'Task' }
              }
            });
          } else {
            observer.error(new Error('Task not found'));
          }
          break;
        }
        case 'UpdateTask': {
          const taskIndex = mockTasks.findIndex(t => t.id === variables.id);
          if (taskIndex > -1) {
            mockTasks[taskIndex] = {
              ...mockTasks[taskIndex],
              title: variables.title,
              description: variables.description,
              updatedAt: new Date().toISOString()
            };
            saveTasks(mockTasks);
            observer.next({
              data: {
                updateTask: { ...mockTasks[taskIndex], __typename: 'Task' }
              }
            });
          } else {
            observer.error(new Error('Task not found'));
          }
          break;
        }
        case 'DeleteTask': {
          mockTasks = mockTasks.filter(t => t.id !== variables.id);
          saveTasks(mockTasks);
          observer.next({ data: { deleteTask: variables.id } });
          break;
        }
        default:
          observer.next({ data: null });
      }
      observer.complete();
    }, 500);
  });
});
