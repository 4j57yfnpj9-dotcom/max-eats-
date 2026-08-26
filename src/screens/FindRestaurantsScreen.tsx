import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/TabNavigator';
import { restaurants, Restaurant, RestaurantTag } from '../data/restaurants';
import { darkTheme, fontFamily, radius, spacing } from '../theme';
import { RestaurantCard } from '../components/RestaurantCard';
import { RestaurantMap } from '../components/RestaurantMap';
import { Chip } from '../components/Chip';

type FindRestaurantsNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Explore'>;

const filterOptions: ('All' | RestaurantTag | 'Open Now')[] = [
  'All',
  'Vegan',
  'Vegetarian',
  'Gluten Free',
  'Open Now',
];

type SortOption = 'rating' | 'distance';

const sortMenuOptions: { value: SortOption; label: string }[] = [
  { value: 'rating', label: 'Sort by rating' },
  { value: 'distance', label: 'Sort by distance' },
];

function sortRestaurants(list: Restaurant[], sortBy: SortOption | null) {
  if (!sortBy) return list;
  const sorted = [...list];
  if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
  if (sortBy === 'distance') sorted.sort((a, b) => a.distanceMiles - b.distanceMiles);
  return sorted;
}

export function FindRestaurantsScreen() {
  const navigation = useNavigation<FindRestaurantsNavigationProp>();
  const [activeFilter, setActiveFilter] = useState<(typeof filterOptions)[number]>('All');
  const [location, setLocation] = useState('Cincinnati, OH');
  const [sortBy, setSortBy] = useState<SortOption | null>(null);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);

  const filteredRestaurants = sortRestaurants(
    restaurants.filter((restaurant) => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Open Now') return restaurant.isOpenNow;
      return restaurant.tags.includes(activeFilter);
    }),
    sortBy
  );

  function selectSort(option: SortOption) {
    // Tapping the active sort again clears it, so there's always a way back to default order.
    setSortBy((prev) => (prev === option ? null : option));
    setSortMenuVisible(false);
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Pressable hitSlop={8} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={darkTheme.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Find Vegetarian Restaurants</Text>
        <Pressable hitSlop={8} onPress={() => setSortMenuVisible(true)}>
          <Ionicons name="options-outline" size={22} color={darkTheme.text} />
        </Pressable>
      </View>

      <Modal
        visible={sortMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortMenuVisible(false)}
      >
        <Pressable style={styles.menuBackdrop} onPress={() => setSortMenuVisible(false)}>
          <Pressable style={styles.sortMenuCard} onPress={() => {}}>
            {sortMenuOptions.map((option) => (
              <Pressable
                key={option.value}
                style={styles.menuRow}
                onPress={() => selectSort(option.value)}
              >
                <Ionicons
                  name={sortBy === option.value ? 'checkmark-circle' : 'ellipse-outline'}
                  size={18}
                  color={sortBy === option.value ? darkTheme.accent : darkTheme.textMuted}
                />
                <Text style={styles.menuLabel}>{option.label}</Text>
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.locationBar}>
          <Ionicons name="location-outline" size={18} color={darkTheme.textMuted} />
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholderTextColor={darkTheme.textMuted}
            style={styles.locationInput}
          />
          <Pressable
            style={styles.locateButton}
            onPress={() => setLocation('Current Location')}
            hitSlop={8}
          >
            <Ionicons name="navigate" size={16} color={darkTheme.card} />
          </Pressable>
        </View>

        <View style={styles.filterRow}>
          {filterOptions.map((option) => (
            <Chip
              key={option}
              label={option}
              theme={darkTheme}
              selected={activeFilter === option}
              onPress={() => setActiveFilter(option)}
            />
          ))}
        </View>

        <RestaurantMap restaurants={filteredRestaurants} theme={darkTheme} />

        {filteredRestaurants.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={36} color={darkTheme.textMuted} />
            <Text style={styles.emptySubtitle}>No restaurants match this filter yet.</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} theme={darkTheme} />
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
    backgroundColor: darkTheme.background,
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
    color: darkTheme.text,
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sortMenuCard: {
    position: 'absolute',
    top: 56,
    right: spacing.lg,
    minWidth: 200,
    backgroundColor: darkTheme.card,
    borderRadius: radius.button,
    paddingVertical: spacing.xs,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  menuLabel: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    color: darkTheme.text,
  },
  content: {
    padding: spacing.lg,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkTheme.card,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  locationInput: {
    flex: 1,
    fontFamily: fontFamily.body,
    fontSize: 15,
    color: darkTheme.text,
  },
  locateButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: darkTheme.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  list: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  emptySubtitle: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    color: darkTheme.textMuted,
    textAlign: 'center',
  },
});
