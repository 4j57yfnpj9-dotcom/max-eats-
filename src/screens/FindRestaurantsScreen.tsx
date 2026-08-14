import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { restaurants, RestaurantTag } from '../data/restaurants';
import { darkTheme, fontFamily, radius, spacing } from '../theme';
import { RestaurantCard } from '../components/RestaurantCard';
import { MapPlaceholder } from '../components/MapPlaceholder';
import { Chip } from '../components/Chip';

const filterOptions: ('All' | RestaurantTag | 'Open Now')[] = [
  'All',
  'Vegan',
  'Vegetarian',
  'Gluten Free',
  'Open Now',
];

export function FindRestaurantsScreen() {
  const [activeFilter, setActiveFilter] = useState<(typeof filterOptions)[number]>('All');
  const [location, setLocation] = useState('Cincinnati, OH');

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Open Now') return restaurant.isOpenNow;
    return restaurant.tags.includes(activeFilter);
  });

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Pressable hitSlop={8} onPress={() => {}}>
          <Ionicons name="arrow-back" size={24} color={darkTheme.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Find Vegetarian Restaurants</Text>
        <Pressable hitSlop={8} onPress={() => {}}>
          <Ionicons name="options-outline" size={22} color={darkTheme.text} />
        </Pressable>
      </View>

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

        <MapPlaceholder theme={darkTheme} />

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
