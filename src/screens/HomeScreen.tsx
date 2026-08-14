import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { darkTheme, fontFamily, radius, spacing } from '../theme';
import { getGreeting } from '../utils/getGreeting';
import { todaysRecommendation, quickPickTags, Tag } from '../data/recipes';
import { exploreCategories } from '../data/categories';
import { RecipeCard } from '../components/RecipeCard';
import { QuickPickTile } from '../components/QuickPickTile';
import { CategoryCard } from '../components/CategoryCard';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

// Maps each Quick Pick tag to the icon shown on its tile. Kept next to the
// screen that uses it, since icon choice is a presentation detail, not data.
function getQuickPickIcon(tag: Tag, color: string) {
  switch (tag) {
    case 'High Protein':
      return <Ionicons name="nutrition-outline" size={22} color={color} />;
    case 'Under 30 Min':
      return <Ionicons name="time-outline" size={22} color={color} />;
    case 'Gluten Free':
      return <MaterialCommunityIcons name="barley" size={22} color={color} />;
    case 'Meal Prep':
      return <Ionicons name="cube-outline" size={22} color={color} />;
  }
}

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  function toggleTag(tag: Tag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function submitSearch() {
    if (!searchQuery.trim()) return;
    navigation.navigate('RecipeList', { title: `"${searchQuery.trim()}"`, query: searchQuery.trim() });
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <Pressable hitSlop={8} onPress={() => {}}>
            <Ionicons name="menu-outline" size={26} color={darkTheme.text} />
          </Pressable>
          <Pressable hitSlop={8} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={24} color={darkTheme.text} />
          </Pressable>
        </View>

        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.welcome}>welcome back 🌿</Text>

        <View style={styles.searchBar}>
          <Pressable hitSlop={8} onPress={submitSearch}>
            <Ionicons name="search" size={18} color={darkTheme.textMuted} />
          </Pressable>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={submitSearch}
            returnKeyType="search"
            placeholder="Search recipes..."
            placeholderTextColor={darkTheme.textMuted}
            style={styles.searchInput}
          />
          <Pressable hitSlop={8} onPress={() => {}}>
            <Ionicons name="options-outline" size={18} color={darkTheme.textMuted} />
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Today's Recommendation</Text>
        <RecipeCard
          recipe={todaysRecommendation}
          theme={darkTheme}
          onPress={() =>
            navigation.navigate('RecipeDetail', { recipeId: todaysRecommendation.id })
          }
        />

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Quick Picks</Text>
          <Pressable
            onPress={() =>
              navigation.navigate('RecipeList', {
                title: selectedTags.length > 0 ? selectedTags.join(', ') : 'Quick Picks',
                tags: selectedTags.length > 0 ? selectedTags : undefined,
              })
            }
          >
            <Text style={styles.viewAll}>View all</Text>
          </Pressable>
        </View>
        <View style={styles.tileRow}>
          {quickPickTags.map((tag) => {
            const selected = selectedTags.includes(tag);
            const iconColor = selected ? darkTheme.card : darkTheme.accent;
            return (
              <QuickPickTile
                key={tag}
                label={tag}
                icon={getQuickPickIcon(tag, iconColor)}
                theme={darkTheme}
                selected={selected}
                onPress={() => toggleTag(tag)}
              />
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Explore</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryRow}>
            {exploreCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                theme={darkTheme}
                onPress={() =>
                  navigation.navigate('RecipeList', {
                    title: category.label,
                    category: category.id,
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  content: {
    padding: spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greeting: {
    fontFamily: fontFamily.headingBold,
    fontSize: 26,
    color: darkTheme.text,
  },
  welcome: {
    fontFamily: fontFamily.body,
    fontSize: 16,
    color: darkTheme.textMuted,
    marginTop: spacing.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkTheme.card,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.body,
    fontSize: 16,
    color: darkTheme.text,
  },
  sectionTitle: {
    fontFamily: fontFamily.headingBold,
    fontSize: 18,
    color: darkTheme.text,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAll: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: 14,
    color: darkTheme.accent,
  },
  tileRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
});
