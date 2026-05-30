import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { TaskFormRouteProp, NavigationProps } from '../../navigation/types';
import { CustomInput } from '../../components/Common/CustomInput';
import { StatusPath } from '../../components/Task/StatusPath';
import { COLORS, SIZES } from '../../constants/theme';
import { useTasks } from '../../hooks/useTasks';
import { TaskStatus } from '../../types';

export const TaskFormScreen = () => {
  const route = useRoute<TaskFormRouteProp>();
  const navigation = useNavigation<NavigationProps>();
  const { tasks, createTask, updateTaskDetails, updateStatus } = useTasks();

  const taskId = route.params?.taskId;
  const isEditing = !!taskId;
  const existingTask = isEditing ? tasks.find(t => t.id === taskId) : null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('Todo');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setStatus(existingTask.status);
    }
  }, [existingTask]);

  const handleSave = async () => {
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      if (isEditing && taskId) {
        await updateTaskDetails(taskId, title, description);
        if (status !== existingTask?.status) {
          await updateStatus(taskId, status);
        }
      } else {
        const result = await createTask(title, description);
        const newTaskId = result.data?.createTask?.id;
        if (newTaskId && status !== 'Todo') {
          await updateStatus(newTaskId, status);
        }
      }
      navigation.goBack();
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusRow}>
        <View style={styles.statusPathWrapper}>
          <StatusPath currentStatus={status} />
        </View>
      </View>
      <View style={styles.content}>

        <CustomInput
          label="Title"
          placeholder="Task title"
          value={title}
          onChangeText={setTitle}
        />

        <CustomInput
          label="Description"
          placeholder="Task description (optional)"
          value={description}
          onChangeText={setDescription}
          textArea
        />

        {isEditing && existingTask && (
          <View style={styles.timestamps}>
            <Text style={styles.timestampLabel}>Created:</Text>
            <Text style={styles.timestampValue}>{new Date(existingTask.createdAt).toLocaleString()}</Text>
            <Text style={styles.timestampLabel}>Updated:</Text>
            <Text style={styles.timestampValue}>{new Date(existingTask.updatedAt).toLocaleString()}</Text>
          </View>
        )}

        {isSubmitting ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <Button
            title={isEditing ? "Update Task" : "Create Task"}
            onPress={handleSave}
            disabled={!title.trim()}
            color={COLORS.primary}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.paddingLarge },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  changeStatusBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#246E9C',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#246E9C',
  },
  statusPathWrapper: {
    flex: 1,
  },
  timestamps: { marginBottom: 16 },
  timestampLabel: { color: COLORS.textMuted, fontSize: 12, marginBottom: 2 },
  timestampValue: { color: COLORS.text, fontSize: 13, marginBottom: 8 },
});
