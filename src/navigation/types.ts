import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Dashboard: undefined;
  TaskForm: { taskId?: string };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type TaskFormRouteProp = RouteProp<RootStackParamList, 'TaskForm'>;
