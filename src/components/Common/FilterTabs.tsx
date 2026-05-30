import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../constants/theme';
import { TaskStatus } from '../../types';

interface FilterTabsProps {
  filter: 'All' | TaskStatus;
  setFilter: (status: 'All' | TaskStatus) => void;
  options: ('All' | TaskStatus)[];
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ filter, setFilter, options }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.filterContainer}
    >
      {options.map(status => (
        <TouchableOpacity
          key={'filter-' + status}
          style={[styles.filterTab, filter === status && styles.filterTabActive]}
          onPress={() => setFilter(status)}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterText, filter === status && styles.filterTextActive]}>
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 14,
  },
  filterTextActive: {
    color: COLORS.surface,
  },
});
