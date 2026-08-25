import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/TabNavigator';
import { lightTheme, fontFamily, radius, spacing } from '../theme';
import { Recipe, Tag, quickPickTags } from '../data/recipes';
import { useFavorites } from '../context/FavoritesContext';
import { useGeneratedRecipes } from '../context/GeneratedRecipesContext';
import { generateMeal } from '../services/mealGenerator';
import { Chip } from '../components/Chip';
import { RecipeCard } from '../components/RecipeCard';

type AddMealScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Add'>;

export function AddMealScreen() {
  const navigation = useNavigation<AddMealScreenNavigationProp>();
  const { isRecipeFavorite, toggleRecipeFavorite } = useFavorites();
  const { addGeneratedRecipe } = useGeneratedRecipes();

  const [promptText, setPromptText] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function toggleTag(tag: Tag) {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  async function handleGenerate() {
    setIsGenerating(true);
    setErrorMessage(null);
    try {
      const recipe = await generateMeal(promptText, selectedTags, generatedRecipe?.id);
      setGeneratedRecipe(recipe);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Try again.');
    } finally {
      setIsGenerating(false);
    }
  }

  function handleSave() {
    if (!generatedRecipe) return;
    addGeneratedRecipe(generatedRecipe);
    if (!isRecipeFavorite(generatedRecipe.id)) {
      toggleRecipeFavorite(generatedRecipe.id);
    }
  }

  function handleViewFullRecipe() {
    if (!generatedRecipe) return;
    addGeneratedRecipe(generatedRecipe);
    navigation.navigate('Home', {
      screen: 'RecipeDetail',
      params: { recipeId: generatedRecipe.id },
    });
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Generate a Meal</Text>
        <Text style={styles.subtitle}>Tell us what you're craving and we'll whip up an idea.</Text>

        <TextInput
          value={promptText}
          onChangeText={setPromptText}
          placeholder="e.g. something quick with chickpeas..."
          placeholderTextColor={lightTheme.textMuted}
          style={styles.promptInput}
          multiline
        />

        <Text style={styles.sectionTitle}>Filters</Text>
        <View style={styles.chipRow}>
          {quickPickTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              theme={lightTheme}
              selected={selectedTags.includes(tag)}
              onPress={() => toggleTag(tag)}
            />
          ))}
        </View>

        <Pressable
          style={[styles.generateButton, isGenerating && styles.generateButtonDisabled]}
          onPress={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color={lightTheme.card} />
          ) : (
            <>
              <Ionicons name="sparkles" size={18} color={lightTheme.card} />
              <Text style={styles.generateLabel}>
                {generatedRecipe ? 'Generate Another' : 'Generate Meal'}
              </Text>
            </>
          )}
        </Pressable>

        {errorMessage && !isGenerating && <Text style={styles.errorText}>{errorMessage}</Text>}

        {generatedRecipe && !isGenerating && (
          <View style={styles.result}>
            <Text style={styles.sectionTitle}>Here's an idea</Text>
            <RecipeCard recipe={generatedRecipe} theme={lightTheme} onPress={handleViewFullRecipe} />

            <Pressable
              style={[
                styles.saveButton,
                isRecipeFavorite(generatedRecipe.id) && styles.saveButtonSaved,
              ]}
              onPress={handleSave}
            >
              <Ionicons
                name={isRecipeFavorite(generatedRecipe.id) ? 'heart' : 'heart-outline'}
                size={18}
                color={isRecipeFavorite(generatedRecipe.id) ? lightTheme.card : lightTheme.accent}
              />
              <Text
                style={[
                  styles.saveLabel,
                  isRecipeFavorite(generatedRecipe.id) && styles.saveLabelSaved,
                ]}
              >
                {isRecipeFavorite(generatedRecipe.id) ? 'Saved' : 'Save Recipe'}
              </Text>
            </Pressable>
          </View>
        )}

        {!generatedRecipe && !errorMessage && !isGenerating && (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={40} color={lightTheme.textMuted} />
            <Text style={styles.emptySubtitle}>
              Pick a few filters (or none) and generate your first idea.
            </Text>
          </View>
        )}
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
  subtitle: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    color: lightTheme.textMuted,
    marginTop: spacing.xs,
  },
  promptInput: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    color: lightTheme.text,
    backgroundColor: lightTheme.card,
    borderRadius: radius.button,
    padding: spacing.md,
    marginTop: spacing.lg,
    minHeight: 72,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontFamily: fontFamily.headingBold,
    fontSize: 18,
    color: lightTheme.text,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: lightTheme.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  generateButtonDisabled: {
    opacity: 0.7,
  },
  generateLabel: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 16,
    color: lightTheme.card,
  },
  errorText: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    color: '#C0524A',
    textAlign: 'center',
    marginTop: spacing.md,
  },
  result: {
    marginTop: spacing.md,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: lightTheme.accent,
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },
  saveButtonSaved: {
    backgroundColor: lightTheme.accent,
  },
  saveLabel: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 15,
    color: lightTheme.accent,
  },
  saveLabelSaved: {
    color: lightTheme.card,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  emptySubtitle: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    color: lightTheme.textMuted,
    textAlign: 'center',
  },
});
