import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { recipes } from '../data/recipes';
import { useGeneratedRecipes } from '../context/GeneratedRecipesContext';
import { lightTheme, fontFamily, spacing } from '../theme';
import { RecipeCard } from '../components/RecipeCard';

type RecipeListRouteProp = RouteProp<HomeStackParamList, 'RecipeList'>;
type RecipeListNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'RecipeList'>;

export function RecipeListScreen() {
  const { params } = useRoute<RecipeListRouteProp>();
  const navigation = useNavigation<RecipeListNavigationProp>();
  const { generatedRecipes } = useGeneratedRecipes();

  const allRecipes = [...recipes, ...generatedRecipes];
  const filteredRecipes = allRecipes.filter((recipe) => {
    const matchesCategory = !params.category || recipe.category === params.category;
    const matchesTags = !params.tags || params.tags.every((tag) => recipe.tags.includes(tag));
    const matchesQuery =
      !params.query || recipe.title.toLowerCase().includes(params.query.toLowerCase());
    return matchesCategory && matchesTags && matchesQuery;
  });

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={lightTheme.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {params.title}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {filteredRecipes.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={40} color={lightTheme.textMuted} />
            <Text style={styles.emptySubtitle}>No recipes match yet.</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                theme={lightTheme}
                onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })}
              />
            ))}
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
  list: {
    gap: spacing.md,
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
