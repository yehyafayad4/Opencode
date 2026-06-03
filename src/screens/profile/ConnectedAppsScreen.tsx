import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from '../../components/ui/Card';
import { mockConnectedApps } from '../../mockData';
import { darkTheme } from '../../themes/darkTheme';
import { ConnectedApp } from '../../types';

const ConnectedAppsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Connected Apps</Text>
      </View>

      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Connect your favorite health and fitness apps to sync data and get more personalized insights.
        </Text>
      </View>

      <FlatList
        data={mockConnectedApps}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.appItem}
            onPress={() => {/* Navigate to connection flow for this app */}}
          >
            <View style={styles.appIconContainer}>
              <View style={[styles.appIcon, { backgroundColor: item.color }]}>
                {/* In a real app, this would be an icon from vector set */}
                <Text style={styles.appIconText}>{item.name.substring(0, 2).toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.appInfo}>
              <Text style={styles.appName}>{item.name}</Text>
              <Text style={styles.appStatus}>
                {item.connected ? 'Connected' : 'Not Connected'}
              </Text>
              {!item.connected && (
                <Text style={styles.appLastSynced}>
                  Tap to connect
                </Text>
              )}
              {item.connected && item.lastSynced && (
                <Text style={styles.appLastSynced}>
                  Last synced: {new Date(item.lastSynced).toLocaleDateString()}
                </Text>
              )}
            </View>
            <View style={styles.appArrow}>
              <Text style={styles.appArrowText}>&gt;</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyState}>No connected apps</Text>
        }
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          More integrations coming soon...
        </Text>
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
  description: {
    paddingHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.lg,
  },
  descriptionText: {
    fontSize: darkTheme.typography.body2.fontSize,
    color: darkTheme.colors.textSecondary,
    textAlign: 'center',
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: darkTheme.spacing.md,
    backgroundColor: darkTheme.colors.surface,
    borderRadius: darkTheme.borderRadius.md,
    marginHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.sm,
  },
  appIconContainer: {
    width: 50,
    height: 50,
    marginRight: darkTheme.spacing.md,
  },
  appIcon: {
    flex: 1,
    borderRadius: darkTheme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appIconText: {
    fontSize: darkTheme.typography.body2.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textOnPrimary,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: darkTheme.typography.h5.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
  },
  appStatus: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.textSecondary,
    marginTop: darkTheme.spacing.xs,
  },
  appLastSynced: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.textDisabled,
    marginTop: darkTheme.spacing.xs,
  },
  appArrow: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  appArrowText: {
    fontSize: darkTheme.typography.body2.fontSize,
    color: darkTheme.colors.textDisabled,
  },
  emptyState: {
    fontSize: darkTheme.typography.body2.fontSize,
    color: darkTheme.colors.textDisabled,
    textAlign: 'center',
    paddingVertical: darkTheme.spacing.lg,
  },
  footer: {
    padding: darkTheme.spacing.lg,
    marginTop: darkTheme.spacing.auto,
    alignItems: 'center',
  },
  footerText: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.textDisabled,
    textAlign: 'center',
  },
});

export default ConnectedAppsScreen;