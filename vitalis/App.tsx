import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Vitalis</Text>
        </View>

        {/* Scores Row */}
        <View style={styles.scoresRow}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Readiness</Text>
            <Text style={styles.scoreValue}>85</Text>
            <Text style={styles.scoreSubtext}>% Optimal</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Recovery</Text>
            <Text style={styles.scoreValue}>78</Text>
            <Text style={styles.scoreSubtext}>% Recovered</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Sleep</Text>
            <Text style={styles.scoreValue}>82</Text>
            <Text style={styles.scoreSubtext}>% Restful</Text>
          </View>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          {/* Calories Eaten */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Calories Eaten</Text>
            <Text style={styles.metricValue}>2,150 kcal</Text>
          </View>
          {/* Calories Burned */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Calories Burned</Text>
            <Text style={styles.metricValue}>320 kcal</Text>
          </View>
          {/* Steps */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Steps</Text>
            <Text style={styles.metricValue}>8,450</Text>
          </View>
          {/* Water Intake */}
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Water</Text>
            <Text style={styles.metricValue}>2.3 L</Text>
          </View>
        </View>

        {/* Cards Section */}
        <View style={styles.cardsSection}>
          <Text style={styles.sectionTitle}>Today's Activity</Text>
          <View style={styles.cardsRow}>
            {/* Gym Tracker */}
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>Gym Tracker</Text>
              <Text style={styles.cardValue}>Strength • 45 min</Text>
            </TouchableOpacity>
            {/* Food/Macros */}
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>Food / Macros</Text>
              <Text style={styles.cardValue}>Protein: 120g</Text>
            </TouchableOpacity>
            {/* Zepp/Helio Strap */}
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>Zepp / Helio Strap</Text>
              <Text style={styles.cardValue}>HRV: 45 ms</Text>
            </TouchableOpacity>
            {/* MyFitnessPal */}
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>MyFitnessPal</Text>
              <Text style={styles.cardValue}>Synced • 2h ago</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Navigation Mockup */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Trends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Goals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A12', // Dark background
  },
  content: {
    padding: 20,
    backgroundColor: '#070A12',
    minHeight: '100%',
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  scoresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  scoreCard: {
    backgroundColor: '#0F172A', // Slightly lighter dark
    padding: 16,
    borderRadius: 12,
    width: 30%, // Will adjust on smaller screens
    minWidth: 80,
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#9BA4B5',
    fontSize: 14,
    marginBottom: 4,
  },
  scoreValue: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 2,
  },
  scoreSubtext: {
    color: '#64748B',
    fontSize: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: '#0F172A',
    padding: 16,
    borderRadius: 12,
    width: '48%', // Two columns on larger screens
    marginBottom: 12,
  },
  metricLabel: {
    color: '#9BA4B5',
    fontSize: 14,
    marginBottom: 4,
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  cardsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#0F172A',
    padding: 16,
    borderRadius: 12,
    width: '48%', // Two columns
    marginBottom: 12,
  },
  cardTitle: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  cardValue: {
    color: '#9BA4B5',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    marginTop: 24,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  navText: {
    color: '#9BA4B5',
    fontSize: 14,
  },
});

// Responsive adjustments for smaller screens
// Note: In a real app, we'd use useWindowDimensions, but for simplicity with mock data,
// we'll rely on percentage widths and wrapping that work reasonably well on both web and mobile.