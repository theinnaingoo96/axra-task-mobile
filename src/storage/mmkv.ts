import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'axra-task-app-storage',
});

export const mmkvStorageWrapper = {
  setItem: (key: string, value: string): Promise<void> => {
    storage.set(key, value);
    return Promise.resolve();
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: (key: string): Promise<void> => {
    storage.remove(key);
    return Promise.resolve();
  },
};