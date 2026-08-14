import { useState } from 'react';
import { Image, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { recipes } from '../data/recipes';
import { darkTheme, fontFamily, radius, spacing } from '../theme';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { InfoPill } from '../components/InfoPill';
import { useFavorites } from '../context/FavoritesContext';
import { useGeneratedRecipes } from '../context/GeneratedRecipesContext';

type RecipeDetailRouteProp = RouteProp<HomeStackParamList, 'RecipeDetail'>;

export function RecipeDetailScreen() {
  const { params } = useRoute<RecipeDetailRouteProp>();
  const navigation = useNavigation();
  const { isRecipeFavorite, toggleRecipeFavorite } = useFavorites();
  const { generatedRecipes } = useGeneratedRecipes();
  const recipe = [...recipes, ...generatedRecipes].find((r) => r.id === params.recipeId);
  const isFavorite = recipe ? isRecipeFavorite(recipe.id) : false;
  const [showInstructions, setShowInstructions] = useState(false);

  // Only reachable via navigation.navigate with a real recipe id from our
  // own data, so this should never actually render — it's a type-safety
  // escape hatch, not a real user-facing state.
  if (!recipe) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: recipe.description
          ? `${recipe.title} — ${recipe.description}`
          : recipe.title,
        title: recipe.title,
      });
    } catch {
      // User dismissed the share sheet — nothing to do.
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={darkTheme.text} />
        </Pressable>
        <View style={styles.headerActions}>
          <Pressable onPress={() => toggleRecipeFavorite(recipe.id)} hitSlop={8}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavorite ? darkTheme.accent : darkTheme.text}
            />
          </Pressable>
          <Pressable onPress={handleShare} hitSlop={8}>
            <Ionicons name="share-outline" size={22} color={darkTheme.text} />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {recipe.image ? (
          <Image source={recipe.image} style={styles.hero} resizeMode="cover" />
        ) : (
          <ImagePlaceholder theme={darkTheme} />
        )}

        <Text style={styles.title}>{recipe.title}</Text>

        <View style={styles.pillRow}>
          <InfoPill
            theme={darkTheme}
            icon={<Ionicons name="time-outline" size={16} color={darkTheme.text} />}
            label={`${recipe.minutes} min`}
          />
          {recipe.tags[0] && (
            <InfoPill
              theme={darkTheme}
              icon={<Ionicons name="nutrition-outline" size={16} color={darkTheme.text} />}
              label={recipe.tags[0]}
            />
          )}
          {recipe.rating && (
            <InfoPill
              theme={darkTheme}
              icon={<Ionicons name="star" size={16} color={darkTheme.starGold} />}
              label={recipe.rating.toFixed(1)}
            />
          )}
        </View>

        {recipe.description && <Text style={styles.description}>{recipe.description}</Text>}

        {recipe.ingredients && (
          <>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              {recipe.servings && <Text style={styles.servings}>{recipe.servings} servings</Text>}
            </View>
            {recipe.ingredients.map((ingredient) => (
              <View key={ingredient.name} style={styles.ingredientRow}>
                <View style={styles.ingredientLeft}>
                  <View style={styles.ingredientDot} />
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                </View>
                <Text style={styles.ingredientQuantity}>{ingredient.quantity}</Text>
              </View>
            ))}
          </>
        )}

        {recipe.steps && (
          <Pressable
            style={styles.ctaButton}
            onPress={() => setShowInstructions((prev) => !prev)}
          >
            <Text style={styles.ctaLabel}>
              {showInstructions ? 'Hide Full Recipe' : 'View Full Recipe'}
            </Text>
          </Pressable>
        )}

        {showInstructions && recipe.steps && (
          <>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.steps.map((step, index) => (
              <View key={step} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberLabel}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  hero: {
    width: '100%',
    height: 280,
    borderRadius: radius.card,
  },
  title: {
    fontFamily: fontFamily.headingBold,
    fontSize: 24,
    color: darkTheme.text,
    marginTop: spacing.md,
  },
  pillRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  description: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    lineHeight: 22,
    color: darkTheme.textMuted,
    marginTop: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fontFamily.headingBold,
    fontSize: 18,
    color: darkTheme.text,
  },
  servings: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    color: darkTheme.textMuted,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(237, 237, 226, 0.08)',
  },
  ingredientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: darkTheme.accent,
  },
  ingredientName: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    color: darkTheme.text,
  },
  ingredientQuantity: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    color: darkTheme.textMuted,
  },
  ctaButton: {
    backgroundColor: darkTheme.accent,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  ctaLabel: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 16,
    color: darkTheme.card,
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: darkTheme.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberLabel: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 12,
    color: darkTheme.card,
  },
  stepText: {
    flex: 1,
    fontFamily: fontFamily.body,
    fontSize: 15,
    lineHeight: 21,
    color: darkTheme.textMuted,
  },
});
