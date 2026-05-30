import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FloatingActionButton } from '../../components/Common/FloatingActionButton';
import { FilterTabs } from '../../components/Common/FilterTabs';
import { LogoutIcon } from '../../components/Common/icons';
import { TaskCard } from '../../components/Task/TaskCard';
import { useNetworkStatus } from '../../hooks/useNetwork';
import { NavigationProps } from '../../navigation/types';
import { Header } from '../../components/Common/Header';
import { useTasks } from '../../hooks/useTasks';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';
import { TaskStatus } from '../../types';

export const DashboardScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { tasks, loading, updateStatus, deleteTask } = useTasks();
  const { logout } = useAuth();
  const { isConnected } = useNetworkStatus();

  const [filter, setFilter] = useState<'All' | TaskStatus>('All');

  const filteredTasks = tasks.filter(t => filter === 'All' || t.status === filter);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  if (loading && tasks.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Tasks"
        showNetworkStatus
        isConnected={isConnected}
        rightIcon={<LogoutIcon size={24} color={COLORS.text} />}
        onRightPress={handleLogout}
      />
      <View>
        <FilterTabs
          filter={filter}
          setFilter={setFilter}
          options={['All', 'Todo', 'In Progress', 'Done'] as ('All' | TaskStatus)[]}
        />
      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskCard
            item={item}
            isConnected={isConnected}
            onEdit={() => navigation.navigate('TaskForm', { taskId: item.id })}
            onDelete={() => deleteTask(item.id)}
            onUpdateStatus={updateStatus}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <FloatingActionButton
        onPress={() => navigation.navigate('TaskForm', {})}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContent: {
    paddingBottom: 90
  },
});
