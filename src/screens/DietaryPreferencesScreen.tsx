import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { lightTheme, fontFamily, spacing } from '../theme';
import { useUserProfile, dietaryOptions } from '../context/UserProfileContext';
import { Chip } from '../components/Chip';

export function DietaryPreferencesScreen() {
  const navigation = useNavigation();
  const { dietaryPreferences, toggleDietaryPreference } = useUserProfile();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={lightTheme.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Dietary Preferences</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>
          Pick what applies to you — Explore defaults to these filters when you open it.
        </Text>

        <View style={styles.chipRow}>
          {dietaryOptions.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              theme={lightTheme}
              selected={dietaryPreferences.includes(tag)}
              onPress={() => toggleDietaryPreference(tag)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: lightTheme.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  headerTitle: {
    flex: 1,
    fontFamily: fontFamily.headingBold,
    fontSize: 18,
    color: lightTheme.text,
    textAlign: 'center',
  },
  content: {
    padding: spacing.lg,
  },
  subtitle: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    color: lightTheme.textMuted,
    lineHeight: 20,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
});
