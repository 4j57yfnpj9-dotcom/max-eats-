import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { lightTheme, fontFamily, radius, spacing } from '../theme';
import { useUserProfile } from '../context/UserProfileContext';

export function AccountSettingsScreen() {
  const navigation = useNavigation();
  const { name, email, setName, setEmail } = useUserProfile();
  const [draftName, setDraftName] = useState(name);
  const [draftEmail, setDraftEmail] = useState(email);
  const [justSaved, setJustSaved] = useState(false);

  const hasChanges = draftName.trim() !== name || draftEmail.trim() !== email;

  function handleSave() {
    if (!draftName.trim() || !draftEmail.trim()) return;
    setName(draftName.trim());
    setEmail(draftEmail.trim());
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={lightTheme.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={draftName}
          onChangeText={setDraftName}
          placeholderTextColor={lightTheme.textMuted}
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={draftEmail}
          onChangeText={setDraftEmail}
          placeholderTextColor={lightTheme.textMuted}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Pressable
          style={[styles.saveButton, !hasChanges && !justSaved && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!hasChanges}
        >
          <Text style={styles.saveLabel}>{justSaved ? 'Saved' : 'Save Changes'}</Text>
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
  label: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 13,
    color: lightTheme.textMuted,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  input: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    color: lightTheme.text,
    backgroundColor: lightTheme.card,
    borderRadius: radius.button,
    padding: spacing.md,
  },
  saveButton: {
    backgroundColor: lightTheme.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveLabel: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 16,
    color: lightTheme.card,
  },
});
