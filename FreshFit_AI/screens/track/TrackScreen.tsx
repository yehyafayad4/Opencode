import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from '../../components/ui/Card';
import { PrimaryButton } from '../../components/ui/buttons/PrimaryButton';
import { mockHabits } from '../../mockData';
import { darkTheme } from '../../themes/darkTheme';

const TrackScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Track Progress</Text>
      </View>

      {/* Daily Metrics */}
      <View style={styles.metricsSection}>
        <Text style={styles.sectionTitle}>Today's Metrics</Text>
        <View style={styles.metricsGrid}>
          {/* Calories */}
          <Card style={[styles.metricCard, { borderLeftWidth: 4, borderLeftColor: darkTheme.colors.primary }]}>
            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>Calories</Text>
              <Text style={styles.metricValue}>1,240 / 2,200 kcal</Text>
            </View>
          </Card>
          {/* Workout */}
          <Card style={[styles.metricCard, { borderLeftWidth: 4, borderLeftColor: darkTheme.colors.secondary }]}>
            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>Workout</Text>
              <Text style={styles.metricValue}>Completed • 35 min</Text>
            </View>
          </Card>
          {/* Water */}
          <Card style={[styles.metricCard, { borderLeftWidth: 4, borderLeftColor: darkTheme.colors.accent }]}>
            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>Water</Text>
              <Text style={styles.metricValue}>6 / 8 glasses</Text>
            </View>
          </Card>
          {/* Weight */}
          <Card style={[styles.metricCard, { borderLeftWidth: 4, borderLeftColor: darkTheme.colors.warning }]}>
            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>Weight</Text>
              <Text style={styles.metricValue}>72.5 kg • -0.5 kg</Text>
            </View>
          </Card>
        </View>
      </View>

      {/* Habits */}
      <View style={styles.habitsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Habits & Routines</Text>
          <PrimaryButton 
            title="+ Add Habit" 
            onPress={() => {/* Navigate to add habit */}}
          />
        </View>
        <FlatList
          data={mockHabits}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.habitItem}>
              <View style={styles.habitInfo}>
                <View style={styles.habitIconContainer}>
                  <View style={[styles.habitIcon, { backgroundColor: item.color }]}>
                    {/* In a real app, this would be an icon from vector set */}
                    <Text style={styles.habitIconText}>{item.icon.substring(0, 1).toUpperCase()}</Text>
                  </View>
                </View>
                <View style={styles.habitDetails}>
                  <Text style={styles.habitTitle}>{item.title}</Text>
                  <Text style={styles.habitDescription}>{item.description}</Text>
                </View>
              </View>
              <View style={styles.habitStatus}>
                <Text style={[
                  styles.habitStatusText, 
                  { color: item.completedToday ? darkTheme.colors.secondary : darkTheme.colors.textDisabled }
                ]}>
                  {item.completedToday ? 'Done' : 'Not Done'}
                </Text>
                <Text style={styles.streakText}>
                  {item.streak} day streak
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyState}>No habits added yet</Text>
          }
        />
      </View>

      {/* Weekly Overview */}
      <View style={styles.weeklySection}>
        <Text style={styles.sectionTitle}>Weekly Overview</Text>
        <View style={styles.weeklyChartPlaceholder}>
          {/* In a real app, this would be a chart */}
          <View style={styles.chartBar} />
          <View style={styles.chartBar} />
          <View style={styles.chartBar} />
          <View style={styles.chartBar} />
          <View style={styles.chartBar} />
          <View style={styles.chartBar} />
          <View style={styles.chartBar} />
        </View>
        <Text style={styles.chartLabel}>Mon Tue Wed Thu Fri Sat Sun</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  header: {
    paddingHorizontal: darkTheme.spacing.lg,
    paddingTop: darkTheme.spacing.xxxl + 20, // Status bar
    paddingBottom: darkTheme.spacing.md,
  },
  title: {
    fontSize: darkTheme.typography.h2.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
  },
  metricsSection: {
    paddingHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.lg,
  },
  sectionTitle: {
    fontSize: darkTheme.typography.h4.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
    marginBottom: darkTheme.spacing.sm,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: darkTheme.colors.surface,
    borderRadius: darkTheme.borderRadius.md,
    padding: darkTheme.spacing.md,
    marginBottom: darkTheme.spacing.sm,
  },
  metricContent: {
  },
  metricLabel: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.textDisabled,
  },
  metricValue: {
    fontSize: darkTheme.typography.h5.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
  },
  habitsSection: {
    paddingHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: darkTheme.spacing.md,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: darkTheme.spacing.md,
    backgroundColor: darkTheme.colors.surface,
    borderRadius: darkTheme.borderRadius.md,
    marginBottom: darkTheme.spacing.sm,
  },
  habitIconContainer: {
    width: 40,
    height: 40,
    marginRight: darkTheme.spacing.md,
  },
  habitIcon: {
    flex: 1,
    borderRadius: darkTheme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitIconText: {
    fontSize: darkTheme.typography.body2.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textOnPrimary,
  },
  habitDetails: {
    flex: 1,
  },
  habitTitle: {
    fontSize: darkTheme.typography.body2.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
  },
  habitDescription: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.textSecondary,
    marginTop: darkTheme.spacing.xs,
  },
  habitStatus: {
    alignItems: 'flex-end',
  },
  habitStatusText: {
    fontSize: darkTheme.typography.body3.fontSize,
  },
  streakText: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.textDisabled,
    marginTop: darkTheme.spacing.xs,
  },
  weeklySection: {
    paddingHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.xxxl,
  },
  weeklyChartPlaceholder: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: darkTheme.spacing.md,
  },
  chartBar: {
    width: 20,
    height: 80,
    backgroundColor: darkTheme.colors.primary,
    borderRadius: darkTheme.borderRadius.sm,
  },
  chartLabel: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.textSecondary,
    textAlign: 'center',
  },
  emptyState: {
    fontSize: darkTheme.typography.body2.fontSize,
    color: darkTheme.colors.textDisabled,
    textAlign: 'center',
    paddingVertical: darkTheme.spacing.lg,
  },
});

export default TrackScreen;