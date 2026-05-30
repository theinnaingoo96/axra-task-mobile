import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

interface HeaderProps {
  title: string;
  showNetworkStatus?: boolean;
  isConnected?: boolean;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showNetworkStatus = false,
  isConnected = true,
  rightIcon,
  onRightPress,
  style,
}) => {
  return (
    <View style={[styles.header, style]}>
      <Text style={styles.title}>
        {title}
        {showNetworkStatus && (isConnected ? ' 🟢' : ' 🔴')}
      </Text>
      {rightIcon && onRightPress && (
        <TouchableOpacity onPress={onRightPress} style={styles.iconButton} activeOpacity={0.7}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.paddingMedium,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  iconButton: {
    padding: 8,
  },
});
