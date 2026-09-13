import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { lightTheme, fontFamily, spacing } from '../theme';
import { Card } from '../components/Card';

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: 'How do I save a recipe or restaurant?',
    answer: 'Tap the heart icon on any recipe or restaurant card. Saved items show up on the Saved tab and stick around after you close the app.',
  },
  {
    question: 'How does the meal generator work?',
    answer: 'The Add tab sends your craving and filters to an AI model, which writes a new recipe on the spot — ingredients, steps, and all.',
  },
  {
    question: 'Why do Explore results sometimes look different?',
    answer: 'Explore searches live restaurant data near your actual location. If it ever falls back to a sample list, a note at the top explains why.',
  },
  {
    question: 'Where do my dietary preferences apply?',
    answer: 'Preferences set in Profile become the default filter when you open Explore, so it starts narrowed to what matters to you.',
  },
];

export function HelpSupportScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={lightTheme.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {faqItems.map((item) => (
          <Card key={item.question} theme={lightTheme} style={styles.card}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </Card>
        ))}
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
    gap: spacing.md,
  },
  card: {
    gap: spacing.xs,
  },
  question: {
    fontFamily: fontFamily.headingBold,
    fontSize: 15,
    color: lightTheme.text,
  },
  answer: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    color: lightTheme.textMuted,
    lineHeight: 20,
  },
});
