import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../../components/ui/Card';
import { PrimaryButton } from '../../components/ui/buttons/PrimaryButton';
import { mockUser } from '../../mockData';
import { darkTheme } from '../../themes/darkTheme';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* User Info */}
      <View style={styles.userSection}>
         <Card style={styles.userCard}>
           <View style={styles.userInfo}>
             {/* In a real app, this would be an Image component */}
             <View style={styles.avatarPlaceholder}>
               <Text style={styles.avatarText}>AJ</Text>
             </View>
             <View style={styles.userDetails}>
               <Text style={styles.userName}>{mockUser.name}</Text>
               <Text style={styles.userEmail}>{mockUser.email}</Text>
             </View>
           </View>
           <View style={styles.userStats}>
             <View style={styles.statItem}>
               <Text style={styles.statLabel}>Member Since</Text>
               <Text style={styles.statValue}>Jan 2023</Text>
             </View>
             <View style={styles.statItem}>
               <Text style={styles.statLabel}>Goals Active</Text>
               <Text style={styles.statValue}>3</Text>
             </View>
             <View style={styles.statItem}>
               <Text style={styles.statLabel}>Streak</Text>
               <Text style={styles.statValue}>5 days</Text>
             </View>
           </View>
         </Card>
      </View>

      {/* Settings Sections */}
      <View style={styles.settingsSection}>
        <View style={styles.settingsGroup}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <TouchableOpacity 
            style={styles.settingsItem}
            onPress={() => {/* Navigate to theme settings */}}
          >
            <Text style={styles.settingsText}>Theme & Appearance</Text>
            <Text style={settingsIcon}>&gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.settingsItem}
            onPress={() => {/* Navigate to notifications settings */}}
          >
            <Text style={styles.settingsText}>Notifications</Text>
            <Text style={settingsIcon}>&gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.settingsItem}
            onPress={() => {/* Navigate to units settings */}}
          >
            <Text style={styles.settingsText}>Units & Measurements</Text>
            <Text style={settingsIcon}>&gt;</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsGroup}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          <TouchableOpacity 
            style={styles.settingsItem}
            onPress={() => {/* Navigate to data export */}}
          >
            <Text style={styles.settingsText}>Export Data</Text>
            <Text style={settingsIcon}>&gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.settingsItem}
            onPress={() => {/* Navigate to account deletion */}}
          >
            <Text style={styles.settingsText}>Delete Account</Text>
            <Text style={{ color: darkTheme.colors.error }}>&gt;</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsGroup}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity 
            style={styles.settingsItem}
            onPress={() => {/* Navigate to help center */}}
          >
            <Text style={styles.settingsText}>Help & Support</Text>
            <Text style={settingsIcon}>&gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.settingsItem}
            onPress={() => {/* Navigate to about */}}
          >
            <Text style={styles.settingsText}>About FreshFit AI</Text>
            <Text style={settingsIcon}>&gt;</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign Out Button */}
      <View style={styles.signOutSection}>
        <PrimaryButton 
          title="Sign Out" 
          onPress={() => {/* Handle sign out */}}
          style={{ backgroundColor: darkTheme.colors.error }}
        />
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
  userSection: {
    paddingHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.lg,
  },
  userCard: {
    padding: darkTheme.spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: darkTheme.spacing.md,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: darkTheme.colors.primary,
    borderRadius: darkTheme.borderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: darkTheme.spacing.md,
  },
  avatarText: {
    fontSize: darkTheme.typography.h5.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textOnPrimary,
  },
  userDetails: {
  },
  userName: {
    fontSize: darkTheme.typography.h5.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
  },
  userEmail: {
    fontSize: darkTheme.typography.body2.fontSize,
    color: darkTheme.colors.textSecondary,
    marginTop: darkTheme.spacing.xs,
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.textDisabled,
  },
  statValue: {
    fontSize: darkTheme.typography.body2.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
    marginTop: darkTheme.spacing.xs,
  },
  settingsSection: {
    paddingHorizontal: darkTheme.spacing.lg,
  },
  settingsGroup: {
    marginBottom: darkTheme.spacing.lg,
  },
  sectionTitle: {
    fontSize: darkTheme.typography.h4.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
    marginBottom: darkTheme.spacing.sm,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: darkTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.colors.border,
  },
  settingsText: {
    fontSize: darkTheme.typography.body2.fontSize,
    color: darkTheme.colors.textPrimary,
  },
  settingsIcon: {
    fontSize: darkTheme.typography.body2.fontSize,
    color: darkTheme.colors.textDisabled,
  },
  signOutSection: {
    padding: darkTheme.spacing.lg,
    marginTop: darkTheme.spacing.auto,
  },
});

export default ProfileScreen;