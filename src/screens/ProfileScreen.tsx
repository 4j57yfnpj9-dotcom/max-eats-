import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/ProfileStackNavigator';
import { lightTheme, fontFamily, spacing } from '../theme';
import { useFavorites } from '../context/FavoritesContext';
import { useGeneratedRecipes } from '../context/GeneratedRecipesContext';
import { useUserProfile } from '../context/UserProfileContext';
import { Card } from '../components/Card';

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileMain'>;

export function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { favoriteRecipeIds, favoriteRestaurantIds, clearFavorites } = useFavorites();
  const { clearGeneratedRecipes } = useGeneratedRecipes();
  const { name, email, dietaryPreferences, notificationsEnabled, setNotificationsEnabled, resetProfile } =
    useUserProfile();

  function handleReset() {
    Alert.alert(
      'Reset App Data',
      'This clears your saved recipes, saved restaurants, and profile settings on this device. This can\'t be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            clearFavorites();
            clearGeneratedRecipes();
            resetProfile();
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={lightTheme.accent} />
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
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
          <Pressable
            style={styles.settingsRow}
            onPress={() => navigation.navigate('DietaryPreferences')}
          >
            <View style={styles.settingsRowLeft}>
              <Ionicons name="restaurant-outline" size={20} color={lightTheme.text} />
              <Text style={styles.settingsLabel}>Dietary Preferences</Text>
            </View>
            <View style={styles.settingsRowRight}>
              {dietaryPreferences.length > 0 && (
                <Text style={styles.settingsValue}>{dietaryPreferences.length} selected</Text>
              )}
              <Ionicons name="chevron-forward" size={18} color={lightTheme.textMuted} />
            </View>
          </Pressable>

          <View style={[styles.settingsRow, styles.settingsRowBorder]}>
            <View style={styles.settingsRowLeft}>
              <Ionicons name="notifications-outline" size={20} color={lightTheme.text} />
              <Text style={styles.settingsLabel}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: lightTheme.imagePlaceholder, true: lightTheme.accent }}
              thumbColor={lightTheme.card}
            />
          </View>

          <Pressable
            style={[styles.settingsRow, styles.settingsRowBorder]}
            onPress={() => navigation.navigate('AccountSettings')}
          >
            <View style={styles.settingsRowLeft}>
              <Ionicons name="person-outline" size={20} color={lightTheme.text} />
              <Text style={styles.settingsLabel}>Account Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={lightTheme.textMuted} />
          </Pressable>

          <Pressable
            style={[styles.settingsRow, styles.settingsRowBorder]}
            onPress={() => navigation.navigate('HelpSupport')}
          >
            <View style={styles.settingsRowLeft}>
              <Ionicons name="help-circle-outline" size={20} color={lightTheme.text} />
              <Text style={styles.settingsLabel}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={lightTheme.textMuted} />
          </Pressable>
        </Card>

        <Pressable style={styles.signOutButton} onPress={handleReset}>
          <Text style={styles.signOutLabel}>Reset App Data</Text>
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
  settingsRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingsLabel: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    color: lightTheme.text,
  },
  settingsValue: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    color: lightTheme.textMuted,
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
