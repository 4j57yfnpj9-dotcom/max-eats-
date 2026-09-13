import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/TabNavigator';
import { lightTheme, fontFamily, spacing } from '../theme';
import { recipes } from '../data/recipes';
import { useFavorites } from '../context/FavoritesContext';
import { useGeneratedRecipes } from '../context/GeneratedRecipesContext';
import { RecipeCard } from '../components/RecipeCard';
import { RestaurantCard } from '../components/RestaurantCard';

type SavedScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Saved'>;

export function SavedScreen() {
  const navigation = useNavigation<SavedScreenNavigationProp>();
  const { favoriteRecipeIds, favoriteRestaurants } = useFavorites();
  const { generatedRecipes } = useGeneratedRecipes();

  const savedRecipes = [...recipes, ...generatedRecipes].filter((recipe) =>
    favoriteRecipeIds.includes(recipe.id)
  );
  const savedRestaurants = favoriteRestaurants;
  const hasNothingSaved = savedRecipes.length === 0 && savedRestaurants.length === 0;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Saved</Text>

        {hasNothingSaved ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={40} color={lightTheme.textMuted} />
            <Text style={styles.emptyTitle}>Nothing saved yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart on any recipe or restaurant to save it here.
            </Text>
          </View>
        ) : (
          <>
            {savedRecipes.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Recipes</Text>
                <View style={styles.list}>
                  {savedRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      theme={lightTheme}
                      onPress={() =>
                        navigation.navigate('Home', {
                          screen: 'RecipeDetail',
                          params: { recipeId: recipe.id },
                        })
                      }
                    />
                  ))}
                </View>
              </>
            )}

            {savedRestaurants.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Restaurants</Text>
                <View style={styles.list}>
                  {savedRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      theme={lightTheme}
                      onPress={() =>
                        navigation.navigate('Explore', {
                          screen: 'RestaurantDetail',
                          params: { restaurant },
                        })
                      }
                    />
                  ))}
                </View>
              </>
            )}
          </>
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
  sectionTitle: {
    fontFamily: fontFamily.headingBold,
    fontSize: 18,
    color: lightTheme.text,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  emptyTitle: {
    fontFamily: fontFamily.headingBold,
    fontSize: 18,
    color: lightTheme.text,
  },
  emptySubtitle: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    color: lightTheme.textMuted,
    textAlign: 'center',
  },
});
