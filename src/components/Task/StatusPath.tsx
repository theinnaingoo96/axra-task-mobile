import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TaskStatus } from '../../types';
import { COLORS } from '../../constants/theme';

interface StatusPathProps {
  currentStatus: TaskStatus;
  onStatusChange?: (status: TaskStatus) => void;
  readOnly?: boolean;
}

const STATUSES: TaskStatus[] = ['Todo', 'In Progress', 'Done'];

const STATUS_LABELS: Record<TaskStatus, string> = {
  'Todo': 'TODO',
  'In Progress': 'IN PROGRESS',
  'Done': 'DONE',
};

export const StatusPath: React.FC<StatusPathProps> = ({
  currentStatus,
  onStatusChange,
  readOnly = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.pathContainer}>
        {STATUSES.map((status, index) => {
          const isActive = currentStatus === status;
          const isFirst = index === 0;
          const isLast = index === STATUSES.length - 1;

          const stepBg = isActive ? '#EAEFF4' : '#FFFFFF';
          const stepTextColor = isActive ? '#246E9C' : '#8A8A8A';

          const StepComponent = readOnly ? View : TouchableOpacity;
          const stepProps = readOnly ? {} : { onPress: () => onStatusChange?.(status), activeOpacity: 0.8 };

          return (
            <StepComponent
              key={status}
              style={[
                styles.step,
                { backgroundColor: stepBg },
                isFirst && styles.firstStep,
                isLast && styles.lastStep,
              ]}
              {...stepProps}
            >
              {!isFirst && (
                <View style={styles.leftIndentContainer}>
                  <View style={styles.leftIndentMask} />
                </View>
              )}

              <Text style={[styles.stepText, { color: stepTextColor }]}>
                {STATUS_LABELS[status]}
              </Text>

              {!isLast && (
                <View style={[styles.rightChevron, { backgroundColor: stepBg }]} />
              )}
            </StepComponent>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: COLORS.text,
  },
  pathContainer: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  step: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  firstStep: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  lastStep: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  stepText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    zIndex: 10,
  },
  rightChevron: {
    position: 'absolute',
    right: -10,
    top: 11,
    width: 22,
    height: 22,
    transform: [{ rotate: '45deg' }],
    zIndex: 5,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  leftIndentContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 15,
    overflow: 'hidden',
    zIndex: 4,
  },
  leftIndentMask: {
    position: 'absolute',
    left: -11,
    top: 11,
    width: 22,
    height: 22,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E0E0E0',
  },
});
