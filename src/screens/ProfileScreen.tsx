import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme, fontFamily, spacing } from '../theme';
import { currentUser } from '../data/user';
import { useFavorites } from '../context/FavoritesContext';
import { Card } from '../components/Card';

type SettingsRow = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

// No destinations built yet for these — same honest no-op pattern as the
// Home screen's menu/notifications icons, until each one gets its own screen.
const settingsRows: SettingsRow[] = [
  { icon: 'restaurant-outline', label: 'Dietary Preferences' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'person-outline', label: 'Account Settings' },
  { icon: 'help-circle-outline', label: 'Help & Support' },
];

export function ProfileScreen() {
  const { favoriteRecipeIds, favoriteRestaurantIds } = useFavorites();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={lightTheme.accent} />
          </View>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.email}>{currentUser.email}</Text>
        </View>

        <View style={styles.statsRow}>
          <Card theme={lightTheme} style={styles.statCard}>
            <Text style={styles.statValue}>{favoriteRecipeIds.length}</Text>
            <Text style={styles.statLabel}>Saved Recipes</Text>
          </Card>
          <Card theme={lightTheme} style={styles.statCard}>
            <Text style={styles.statValue}>{favoriteRestaurantIds.length}</Text>
            <Text style={styles.statLabel}>Saved Restaurants</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Settings</Text>
        <Card theme={lightTheme} style={styles.settingsCard}>
          {settingsRows.map((row, index) => (
            <Pressable
              key={row.label}
              style={[styles.settingsRow, index > 0 && styles.settingsRowBorder]}
              onPress={() => {}}
            >
              <View style={styles.settingsRowLeft}>
                <Ionicons name={row.icon} size={20} color={lightTheme.text} />
                <Text style={styles.settingsLabel}>{row.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={lightTheme.textMuted} />
            </Pressable>
          ))}
        </Card>

        <Pressable style={styles.signOutButton} onPress={() => {}}>
          <Text style={styles.signOutLabel}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: lightTheme.background,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontFamily: fontFamily.headingBold,
    fontSize: 26,
    color: lightTheme.text,
  },
  identity: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: lightTheme.imagePlaceholder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: fontFamily.headingBold,
    fontSize: 20,
    color: lightTheme.text,
    marginTop: spacing.md,
  },
  email: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    color: lightTheme.textMuted,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: fontFamily.headingBold,
    fontSize: 22,
    color: lightTheme.accent,
  },
  statLabel: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    color: lightTheme.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    fontFamily: fontFamily.headingBold,
    fontSize: 18,
    color: lightTheme.text,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  settingsCard: {
    padding: 0,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  settingsRowBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(30, 42, 32, 0.08)',
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  settingsLabel: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    color: lightTheme.text,
  },
  signOutButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  signOutLabel: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 15,
    color: '#C0524A',
  },
});
