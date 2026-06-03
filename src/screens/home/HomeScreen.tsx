import React from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import { Card } from '../../components/ui/Card';
import { PrimaryButton } from '../../components/ui/buttons/PrimaryButton';
import { mockUser } from '../../mockData';
import { darkTheme } from '../../themes/darkTheme';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  // Mock data for dashboard
  const dashboardStats = [
    { label: 'Calories Eaten', value: '1,240 / 2,200', icon: 'fire', color: '#FF6B35' },
    { label: 'Calories Remaining', value: '960 kcal', icon: 'remove-circle', color: '#00C853' },
    { label: 'Protein', value: '98g / 150g', icon: 'egg', color: '#FF6B35' },
    { label: 'Carbs', value: '180g / 220g', icon: 'bread-slice', color: '#FF6B35' },
    { label: 'Fat', value: '65g / 70g', icon: 'avocado', color: '#FF6B35' },
    { label: 'Steps', value: '8,240 / 10,000', icon: 'walk', color: '#0066FF' },
    { label: 'Sleep', value: '7h 12m', icon: 'moon', color: '#9D4EDD' },
    { label: 'Recovery', value: '85%', icon: 'pulse', color: '#00C853' },
    { label: 'Water', value: '6 / 8 glasses', icon: 'droplet', color: '#33B5E5' },
  ];

  const expiringSoon = [
    { name: 'Milk', expiry: 'Tomorrow', quantity: '1L' },
    { name: 'Spinach', expiry: 'In 2 days', quantity: '200g' }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning, {mockUser.name.split(' ')[0]}!</Text>
        <Text style={styles.subtitle}>Let's make today count</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.statsGrid}>
          {dashboardStats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { borderLeftWidth: 4, borderLeftColor: stat.color }]}>
              <View style={styles.statIcon}>
                {/* Placeholder for icon - in real app would use vector icons */}
                <View style={{ width: 24, height: 24, backgroundColor: stat.color, borderRadius: 6 }} />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Expiring Soon Section */}
      <View style={styles.expiringSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Expiring Soon</Text>
          <Text style={styles.viewAll}>View All →</Text>
        </View>
        {expiringSoon.length > 0 ? (
          <View style={styles.expiringList}>
            {expiringSoon.map((item, index) => (
              <View key={index} style={styles.expiringItem}>
                <Text style={styles.expiringItemName}>{item.name}</Text>
                <View style={styles.expiringItemDetails}>
                  <Text style={styles.expiringItemText}>{item.expiry}</Text>
                  <Text style={styles.expiringItemText}>{item.quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyState}>No food expiring soon</Text>
        )}
      </View>

      {/* AI Suggestion Section */}
      <View style={styles.suggestionSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>AI Suggestion</Text>
        </View>
        <Card style={styles.suggestionCard}>
          <View style={styles.suggestionContent}>
            <Text style={styles.suggestionTitle}>High-Protein Chicken Stir Fry</Text>
            <Text style={styles.suggestionSubtitle}>Uses expiring chicken & broccoli • 25 min</Text>
            <Text style={styles.suggestionText}>Reduce food waste while hitting your protein goals</Text>
            <PrimaryButton 
              title="Generate Meal Plan" 
              onPress={() => {/* Navigate to meal generation */}}
            />
          </View>
        </Card>
      </View>

      {/* Suggested Workout Section */}
      <View style={styles.workoutSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Suggested Workout</Text>
        </View>
        <Card style={styles.workoutCard}>
          <View style={styles.workoutContent}>
            <Text style={styles.workoutTitle}>20-Minute HIIT Session</Text>
            <Text style={styles.workoutSubtitle}>Based on your recovery score</Text>
            <Text style={styles.workoutText}>85% recovery - perfect for high intensity</Text>
            <PrimaryButton 
              title="Start Workout" 
              onPress={() => {/* Navigate to workout tracking */}}
            />
          </View>
        </Card>
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
    paddingTop: darkTheme.spacing.xxxl + 20, // Account for status bar
    paddingBottom: darkTheme.spacing.md,
  },
  greeting: {
    fontSize: darkTheme.typography.h2.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
  },
  subtitle: {
    fontSize: darkTheme.typography.body2.fontSize,
    color: darkTheme.colors.textSecondary,
    marginTop: darkTheme.spacing.xs,
  },
  statsSection: {
    paddingHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.lg,
  },
  sectionTitle: {
    fontSize: darkTheme.typography.h4.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
    marginBottom: darkTheme.spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: darkTheme.colors.surface,
    borderRadius: darkTheme.borderRadius.md,
    padding: darkTheme.spacing.md,
    marginBottom: darkTheme.spacing.sm,
  },
  statIcon: {
    width: 24,
    height: 24,
    marginRight: darkTheme.spacing.sm,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.textDisabled,
  },
  statValue: {
    fontSize: darkTheme.typography.h5.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
  },
  expiringSection: {
    paddingHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: darkTheme.spacing.md,
  },
  viewAll: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.primary,
  },
  expiringList: {
    gap: darkTheme.spacing.sm,
  },
  expiringItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: darkTheme.spacing.sm,
    backgroundColor: darkTheme.colors.surfaceVariant,
    borderRadius: darkTheme.borderRadius.sm,
  },
  expiringItemName: {
    fontSize: darkTheme.typography.body2.fontSize,
    fontWeight: '500' as const,
    color: darkTheme.colors.textPrimary,
  },
  expiringItemDetails: {
    flexDirection: 'row',
    gap: darkTheme.spacing.md,
  },
  expiringItemText: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.textSecondary,
  },
  suggestionSection: {
    paddingHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.lg,
  },
  suggestionCard: {
    marginTop: darkTheme.spacing.md,
  },
  suggestionContent: {
    padding: darkTheme.spacing.md,
  },
  suggestionTitle: {
    fontSize: darkTheme.typography.h5.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
  },
  suggestionSubtitle: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.textSecondary,
    marginVertical: darkTheme.spacing.xs,
  },
  suggestionText: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.textSecondary,
    marginBottom: darkTheme.spacing.md,
  },
  workoutSection: {
    paddingHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.xxxl,
  },
  workoutCard: {
    marginTop: darkTheme.spacing.md,
  },
  workoutContent: {
    padding: darkTheme.spacing.md,
  },
  workoutTitle: {
    fontSize: darkTheme.typography.h5.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
  },
  workoutSubtitle: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.textSecondary,
    marginVertical: darkTheme.spacing.xs,
  },
  workoutText: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.textSecondary,
    marginBottom: darkTheme.spacing.md,
  },
});

export default HomeScreen;