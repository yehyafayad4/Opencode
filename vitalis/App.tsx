import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const readiness = 85;
  const recovery = 78;
  const sleep = 82;
  const caloriesEaten = 2150;
  const caloriesBurned = 320;
  const steps = 8450;
  const water = 2.3;

  return (
    <View style={styles.page}>
      <View style={styles.phoneFrame}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good morning, Yahia</Text>
              <Text style={styles.appName}>Vitalis</Text>
            </View>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>Y</Text>
            </View>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.heroGlow} />

            <View style={styles.heroTop}>
              <View>
                <Text style={styles.heroLabel}>Today’s Readiness</Text>
                <Text style={styles.heroTitle}>Prime Training Day</Text>
              </View>

              <View style={styles.statusPill}>
                <Text style={styles.statusPillText}>Optimal</Text>
              </View>
            </View>

            <View style={styles.heroMain}>
              <View style={styles.bigScoreCircle}>
                <Text style={styles.bigScore}>{readiness}</Text>
                <Text style={styles.bigScoreUnit}>%</Text>
              </View>

              <View style={styles.heroStats}>
                <Text style={styles.heroStatText}>Recovery is strong</Text>
                <Text style={styles.heroStatText}>Sleep quality is good</Text>
                <Text style={styles.heroStatText}>Workout load is safe</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Daily Overview</Text>

          <View style={styles.scoreGrid}>
            <MetricCard title="Recovery" value={`${recovery}%`} icon="💪" accent="#7CFFB2" />
            <MetricCard title="Sleep" value={`${sleep}%`} icon="🌙" accent="#8AB4FF" />
            <MetricCard title="Steps" value={steps.toLocaleString()} icon="👟" accent="#FFD166" />
            <MetricCard title="Water" value={`${water} L`} icon="💧" accent="#6EE7F9" />
          </View>

          <View style={styles.wideCard}>
            <View style={styles.cardHeaderRow}>
              <View>
                <Text style={styles.cardTitle}>Calories</Text>
                <Text style={styles.cardSubtitle}>Food + activity balance</Text>
              </View>
              <Text style={styles.cardIcon}>🔥</Text>
            </View>

            <View style={styles.calorieRow}>
              <View>
                <Text style={styles.calorieValue}>{caloriesEaten}</Text>
                <Text style={styles.calorieLabel}>eaten</Text>
              </View>

              <View style={styles.divider} />

              <View>
                <Text style={styles.calorieValue}>{caloriesBurned}</Text>
                <Text style={styles.calorieLabel}>burned</Text>
              </View>
            </View>

            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Today’s Activity</Text>

          <ActionCard
            icon="🏋️‍♂️"
            title="Gym Tracker"
            subtitle="Push day · Chest, shoulders, triceps"
            badge="45 min"
          />

          <ActionCard
            icon="🍽️"
            title="Food & Macros"
            subtitle="120g protein · 230g carbs · 62g fats"
            badge="Synced"
          />

          <ActionCard
            icon="🛌"
            title="Recovery & Sleep"
            subtitle={`${sleep}% restful · 7h 23m sleep`}
            badge="Good"
          />

          <Text style={styles.sectionTitle}>Connected Apps</Text>

          <View style={styles.connectedGrid}>
            <IntegrationCard
              icon="⌚"
              title="Zepp / Helio"
              subtitle="HRV 45ms · Sleep synced"
              status="Connected"
            />

            <IntegrationCard
              icon="🍎"
              title="MyFitnessPal"
              subtitle="Calories · Macros"
              status="Synced"
            />
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TabItem icon="🏠" label="Home" active />
          <TabItem icon="📈" label="Trends" />
          <TabItem icon="🎯" label="Goals" />
          <TabItem icon="⚙️" label="More" />
        </View>
      </View>
    </View>
  );
}

function MetricCard({
  title,
  value,
  icon,
  accent,
}: {
  title: string;
  value: string;
  icon: string;
  accent: string;
}) {
  return (
    <View style={styles.metricCard}>
      <View style={[styles.metricIconCircle, { borderColor: accent }]}>
        <Text style={styles.metricIcon}>{icon}</Text>
      </View>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function ActionCard({
  icon,
  title,
  subtitle,
  badge,
}: {
  icon: string;
  title: string;
  subtitle: string;
  badge: string;
}) {
  return (
    <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
      <View style={styles.actionIcon}>
        <Text style={styles.actionIconText}>{icon}</Text>
      </View>

      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>

      <View style={styles.actionBadge}>
        <Text style={styles.actionBadgeText}>{badge}</Text>
      </View>
    </TouchableOpacity>
  );
}

function IntegrationCard({
  icon,
  title,
  subtitle,
  status,
}: {
  icon: string;
  title: string;
  subtitle: string;
  status: string;
}) {
  return (
    <TouchableOpacity style={styles.integrationCard} activeOpacity={0.8}>
      <Text style={styles.integrationIcon}>{icon}</Text>
      <Text style={styles.integrationTitle}>{title}</Text>
      <Text style={styles.integrationSubtitle}>{subtitle}</Text>
      <View style={styles.integrationStatus}>
        <Text style={styles.integrationStatusText}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
}

function TabItem({
  icon,
  label,
  active,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
      <Text style={styles.tabIcon}>{icon}</Text>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#050812',
    alignItems: 'center',
  },
  phoneFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#070A12',
    position: 'relative',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 22,
    paddingBottom: 110,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 22,
  },
  greeting: {
    color: '#93A4BD',
    fontSize: 14,
    fontWeight: '600',
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#172033',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#293653',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },

  heroCard: {
    backgroundColor: '#111A2E',
    borderRadius: 30,
    padding: 22,
    marginBottom: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#24314D',
  },
  heroGlow: {
    position: 'absolute',
    right: -70,
    top: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1F8BFF',
    opacity: 0.18,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  heroLabel: {
    color: '#9DB2D6',
    fontSize: 13,
    fontWeight: '700',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 6,
  },
  statusPill: {
    backgroundColor: '#183C2B',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2EEA88',
  },
  statusPillText: {
    color: '#7CFFB2',
    fontSize: 12,
    fontWeight: '800',
  },
  heroMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bigScoreCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 12,
    borderColor: '#7CFFB2',
    backgroundColor: '#0B1020',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  bigScore: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
  },
  bigScoreUnit: {
    color: '#A8B3C7',
    fontSize: 13,
    fontWeight: '700',
  },
  heroStats: {
    flex: 1,
  },
  heroStatText: {
    color: '#D9E4F8',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 14,
    marginTop: 4,
  },

  scoreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#101827',
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#202B40',
  },
  metricIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0B1020',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  metricIcon: {
    fontSize: 21,
  },
  metricTitle: {
    color: '#91A1B8',
    fontSize: 13,
    fontWeight: '700',
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 6,
  },

  wideCard: {
    backgroundColor: '#101827',
    borderRadius: 26,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#202B40',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  cardSubtitle: {
    color: '#91A1B8',
    fontSize: 13,
    marginTop: 4,
  },
  cardIcon: {
    fontSize: 28,
  },
  calorieRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 18,
  },
  calorieValue: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  calorieLabel: {
    color: '#91A1B8',
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 42,
    backgroundColor: '#293653',
    marginHorizontal: 28,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#1E293B',
    overflow: 'hidden',
  },
  progressFill: {
    height: 10,
    width: '75%',
    borderRadius: 999,
    backgroundColor: '#FF9F43',
  },

  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#101827',
    borderRadius: 24,
    padding: 16,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#202B40',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: '#182338',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  actionIconText: {
    fontSize: 24,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  actionSubtitle: {
    color: '#91A1B8',
    fontSize: 13,
    marginTop: 5,
  },
  actionBadge: {
    backgroundColor: '#172033',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },
  actionBadgeText: {
    color: '#C8D7F2',
    fontSize: 11,
    fontWeight: '800',
  },

  connectedGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  integrationCard: {
    width: '48%',
    backgroundColor: '#101827',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#202B40',
  },
  integrationIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  integrationTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  integrationSubtitle: {
    color: '#91A1B8',
    fontSize: 12,
    marginTop: 6,
    minHeight: 34,
  },
  integrationStatus: {
    alignSelf: 'flex-start',
    backgroundColor: '#183C2B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 12,
  },
  integrationStatusText: {
    color: '#7CFFB2',
    fontSize: 11,
    fontWeight: '900',
  },

  bottomNav: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    height: 72,
    borderRadius: 28,
    backgroundColor: '#111A2E',
    borderWidth: 1,
    borderColor: '#263653',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 21,
    marginBottom: 4,
  },
  tabLabel: {
    color: '#74829A',
    fontSize: 11,
    fontWeight: '800',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
});import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const readiness = 85;
  const recovery = 78;
  const sleep = 82;
  const caloriesEaten = 2150;
  const caloriesBurned = 320;
  const steps = 8450;
  const water = 2.3;

  return (
    <View style={styles.page}>
      <View style={styles.phoneFrame}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good morning, Yahia</Text>
              <Text style={styles.appName}>Vitalis</Text>
            </View>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>Y</Text>
            </View>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.heroGlow} />

            <View style={styles.heroTop}>
              <View>
                <Text style={styles.heroLabel}>Today’s Readiness</Text>
                <Text style={styles.heroTitle}>Prime Training Day</Text>
              </View>

              <View style={styles.statusPill}>
                <Text style={styles.statusPillText}>Optimal</Text>
              </View>
            </View>

            <View style={styles.heroMain}>
              <View style={styles.bigScoreCircle}>
                <Text style={styles.bigScore}>{readiness}</Text>
                <Text style={styles.bigScoreUnit}>%</Text>
              </View>

              <View style={styles.heroStats}>
                <Text style={styles.heroStatText}>Recovery is strong</Text>
                <Text style={styles.heroStatText}>Sleep quality is good</Text>
                <Text style={styles.heroStatText}>Workout load is safe</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Daily Overview</Text>

          <View style={styles.scoreGrid}>
            <MetricCard title="Recovery" value={`${recovery}%`} icon="💪" accent="#7CFFB2" />
            <MetricCard title="Sleep" value={`${sleep}%`} icon="🌙" accent="#8AB4FF" />
            <MetricCard title="Steps" value={steps.toLocaleString()} icon="👟" accent="#FFD166" />
            <MetricCard title="Water" value={`${water} L`} icon="💧" accent="#6EE7F9" />
          </View>

          <View style={styles.wideCard}>
            <View style={styles.cardHeaderRow}>
              <View>
                <Text style={styles.cardTitle}>Calories</Text>
                <Text style={styles.cardSubtitle}>Food + activity balance</Text>
              </View>
              <Text style={styles.cardIcon}>🔥</Text>
            </View>

            <View style={styles.calorieRow}>
              <View>
                <Text style={styles.calorieValue}>{caloriesEaten}</Text>
                <Text style={styles.calorieLabel}>eaten</Text>
              </View>

              <View style={styles.divider} />

              <View>
                <Text style={styles.calorieValue}>{caloriesBurned}</Text>
                <Text style={styles.calorieLabel}>burned</Text>
              </View>
            </View>

            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Today’s Activity</Text>

          <ActionCard
            icon="🏋️‍♂️"
            title="Gym Tracker"
            subtitle="Push day · Chest, shoulders, triceps"
            badge="45 min"
          />

          <ActionCard
            icon="🍽️"
            title="Food & Macros"
            subtitle="120g protein · 230g carbs · 62g fats"
            badge="Synced"
          />

          <ActionCard
            icon="🛌"
            title="Recovery & Sleep"
            subtitle={`${sleep}% restful · 7h 23m sleep`}
            badge="Good"
          />

          <Text style={styles.sectionTitle}>Connected Apps</Text>

          <View style={styles.connectedGrid}>
            <IntegrationCard
              icon="⌚"
              title="Zepp / Helio"
              subtitle="HRV 45ms · Sleep synced"
              status="Connected"
            />

            <IntegrationCard
              icon="🍎"
              title="MyFitnessPal"
              subtitle="Calories · Macros"
              status="Synced"
            />
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TabItem icon="🏠" label="Home" active />
          <TabItem icon="📈" label="Trends" />
          <TabItem icon="🎯" label="Goals" />
          <TabItem icon="⚙️" label="More" />
        </View>
      </View>
    </View>
  );
}

function MetricCard({
  title,
  value,
  icon,
  accent,
}: {
  title: string;
  value: string;
  icon: string;
  accent: string;
}) {
  return (
    <View style={styles.metricCard}>
      <View style={[styles.metricIconCircle, { borderColor: accent }]}>
        <Text style={styles.metricIcon}>{icon}</Text>
      </View>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function ActionCard({
  icon,
  title,
  subtitle,
  badge,
}: {
  icon: string;
  title: string;
  subtitle: string;
  badge: string;
}) {
  return (
    <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
      <View style={styles.actionIcon}>
        <Text style={styles.actionIconText}>{icon}</Text>
      </View>

      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>

      <View style={styles.actionBadge}>
        <Text style={styles.actionBadgeText}>{badge}</Text>
      </View>
    </TouchableOpacity>
  );
}

function IntegrationCard({
  icon,
  title,
  subtitle,
  status,
}: {
  icon: string;
  title: string;
  subtitle: string;
  status: string;
}) {
  return (
    <TouchableOpacity style={styles.integrationCard} activeOpacity={0.8}>
      <Text style={styles.integrationIcon}>{icon}</Text>
      <Text style={styles.integrationTitle}>{title}</Text>
      <Text style={styles.integrationSubtitle}>{subtitle}</Text>
      <View style={styles.integrationStatus}>
        <Text style={styles.integrationStatusText}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
}

function TabItem({
  icon,
  label,
  active,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
      <Text style={styles.tabIcon}>{icon}</Text>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#050812',
    alignItems: 'center',
  },
  phoneFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#070A12',
    position: 'relative',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 22,
    paddingBottom: 110,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 22,
  },
  greeting: {
    color: '#93A4BD',
    fontSize: 14,
    fontWeight: '600',
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#172033',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#293653',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },

  heroCard: {
    backgroundColor: '#111A2E',
    borderRadius: 30,
    padding: 22,
    marginBottom: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#24314D',
  },
  heroGlow: {
    position: 'absolute',
    right: -70,
    top: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1F8BFF',
    opacity: 0.18,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  heroLabel: {
    color: '#9DB2D6',
    fontSize: 13,
    fontWeight: '700',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 6,
  },
  statusPill: {
    backgroundColor: '#183C2B',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2EEA88',
  },
  statusPillText: {
    color: '#7CFFB2',
    fontSize: 12,
    fontWeight: '800',
  },
  heroMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bigScoreCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 12,
    borderColor: '#7CFFB2',
    backgroundColor: '#0B1020',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  bigScore: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
  },
  bigScoreUnit: {
    color: '#A8B3C7',
    fontSize: 13,
    fontWeight: '700',
  },
  heroStats: {
    flex: 1,
  },
  heroStatText: {
    color: '#D9E4F8',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 14,
    marginTop: 4,
  },

  scoreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#101827',
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#202B40',
  },
  metricIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0B1020',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  metricIcon: {
    fontSize: 21,
  },
  metricTitle: {
    color: '#91A1B8',
    fontSize: 13,
    fontWeight: '700',
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 6,
  },

  wideCard: {
    backgroundColor: '#101827',
    borderRadius: 26,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#202B40',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  cardSubtitle: {
    color: '#91A1B8',
    fontSize: 13,
    marginTop: 4,
  },
  cardIcon: {
    fontSize: 28,
  },
  calorieRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 18,
  },
  calorieValue: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  calorieLabel: {
    color: '#91A1B8',
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 42,
    backgroundColor: '#293653',
    marginHorizontal: 28,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#1E293B',
    overflow: 'hidden',
  },
  progressFill: {
    height: 10,
    width: '75%',
    borderRadius: 999,
    backgroundColor: '#FF9F43',
  },

  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#101827',
    borderRadius: 24,
    padding: 16,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#202B40',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: '#182338',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  actionIconText: {
    fontSize: 24,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  actionSubtitle: {
    color: '#91A1B8',
    fontSize: 13,
    marginTop: 5,
  },
  actionBadge: {
    backgroundColor: '#172033',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },
  actionBadgeText: {
    color: '#C8D7F2',
    fontSize: 11,
    fontWeight: '800',
  },

  connectedGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  integrationCard: {
    width: '48%',
    backgroundColor: '#101827',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#202B40',
  },
  integrationIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  integrationTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  integrationSubtitle: {
    color: '#91A1B8',
    fontSize: 12,
    marginTop: 6,
    minHeight: 34,
  },
  integrationStatus: {
    alignSelf: 'flex-start',
    backgroundColor: '#183C2B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 12,
  },
  integrationStatusText: {
    color: '#7CFFB2',
    fontSize: 11,
    fontWeight: '900',
  },

  bottomNav: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    height: 72,
    borderRadius: 28,
    backgroundColor: '#111A2E',
    borderWidth: 1,
    borderColor: '#263653',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 21,
    marginBottom: 4,
  },
  tabLabel: {
    color: '#74829A',
    fontSize: 11,
    fontWeight: '800',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
})