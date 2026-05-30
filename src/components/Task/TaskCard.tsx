import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { EditIcon, DeleteIcon } from '../Common/icons';
import { COLORS, SIZES } from '../../constants/theme';
import { Task, TaskStatus } from '../../types';

const statusTransition: Record<TaskStatus, { next: TaskStatus; label: string }> = {
  Todo: { next: 'In Progress', label: 'Start' },
  'In Progress': { next: 'Done', label: 'Complete' },
  Done: { next: 'Todo', label: 'Reopen' },
};

interface TaskCardProps {
  item: Task;
  isConnected: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onUpdateStatus: (id: string, nextStatus: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  item,
  isConnected,
  onEdit,
  onDelete,
  onUpdateStatus,
}) => {
  return (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <TouchableOpacity onPress={onEdit} activeOpacity={0.7} style={styles.iconBtn}>
          <EditIcon size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {!!item.description && <Text style={styles.taskDesc}>{item.description}</Text>}
      <View style={styles.metaRow}>
        <Text style={[
          styles.taskStatus,
          {
            color: item.status === 'Done' ? COLORS.done : item.status === 'In Progress' ? COLORS.inProgress : COLORS.textMuted,
            backgroundColor: item.status === 'Done' ? COLORS.done + '20' : item.status === 'In Progress' ? COLORS.inProgress + '20' : COLORS.todo + '20',
          }
        ]}>
          {item.status}
        </Text>
        <Text style={styles.taskTimestamp}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => onUpdateStatus(item.id, statusTransition[item.status].next)}
          style={[styles.actionBtn, !isConnected && styles.actionBtnDisabled]}
          disabled={!isConnected}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionText, !isConnected && styles.actionTextDisabled]}>
            {statusTransition[item.status].label}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn} activeOpacity={0.7}>
          <DeleteIcon size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.paddingMedium,
    marginBottom: 12,
    marginHorizontal: SIZES.paddingMedium,
    borderRadius: SIZES.radius,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.text,
  },
  iconBtn: {
    padding: 4,
  },
  taskDesc: {
    color: COLORS.textMuted,
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  taskStatus: {
    fontWeight: '600',
    marginBottom: 12,
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: SIZES.radius * 2,
  },
  taskTimestamp: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
  },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: SIZES.radius / 2,
    backgroundColor: COLORS.background,
  },
  actionBtnDisabled: {
    opacity: 0.5,
  },
  actionText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  actionTextDisabled: {
    color: COLORS.textMuted,
  },
  deleteBtn: {
    padding: 6,
    borderRadius: SIZES.radius / 2,
    backgroundColor: COLORS.background,
  },
});
