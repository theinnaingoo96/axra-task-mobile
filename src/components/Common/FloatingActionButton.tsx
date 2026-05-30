import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent, ViewStyle } from 'react-native';
import { COLORS } from '../../constants/theme';
import { FabPlusIcon } from './icons';

interface FloatingActionButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.fab, style]} onPress={onPress} activeOpacity={0.8}>
      <FabPlusIcon size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
