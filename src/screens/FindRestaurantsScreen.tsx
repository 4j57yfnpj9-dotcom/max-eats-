import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ExploreStackParamList } from '../navigation/ExploreStackNavigator';
import { restaurants as sampleRestaurants, Restaurant, RestaurantTag } from '../data/restaurants';
import { searchRestaurants, SearchLocation } from '../services/restaurantFinder';
import { useUserProfile } from '../context/UserProfileContext';
import { darkTheme, fontFamily, radius, spacing } from '../theme';
import { RestaurantCard } from '../components/RestaurantCard';
import { RestaurantMap } from '../components/RestaurantMap';
import { Chip } from '../components/Chip';

type FindRestaurantsNavigationProp = NativeStackNavigationProp<ExploreStackParamList, 'ExploreMain'>;

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

// Matches the coordinates baked into data/restaurants.ts, used only when we
// can't get a real device location (permission denied, or an error).
const CINCINNATI = { latitude: 39.1031, longitude: -84.512 };

type FallbackReason = 'web' | 'no-key' | 'error' | null;

function sortRestaurants(list: Restaurant[], sortBy: SortOption | null) {
  if (!sortBy) return list;
  const sorted = [...list];
  if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
  if (sortBy === 'distance') sorted.sort((a, b) => a.distanceMiles - b.distanceMiles);
  return sorted;
}

function describeFallback(reason: FallbackReason) {
  if (reason === 'web') {
    return "Live results aren't available in the web preview — showing sample restaurants.";
  }
  if (reason === 'no-key') {
    return 'Showing sample restaurants. Add a Yelp API key to see real results near you.';
  }
  return "Couldn't load live restaurants right now — showing sample restaurants.";
}

export function FindRestaurantsScreen() {
  const navigation = useNavigation<FindRestaurantsNavigationProp>();
  const { dietaryPreferences } = useUserProfile();
  // Defaults to a saved dietary preference (if one matches a filter chip
  // here) rather than always starting from "All" — set in Profile.
  const [activeFilter, setActiveFilter] = useState<(typeof filterOptions)[number]>(
    () => dietaryPreferences.find((tag): tag is RestaurantTag => filterOptions.includes(tag)) ?? 'All'
  );
  const [sortBy, setSortBy] = useState<SortOption | null>(null);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);

  const [locationLabel, setLocationLabel] = useState('Cincinnati, OH');
  // What's actually searched — device coordinates, or free text the user
  // typed and submitted. Yelp geocodes a text location itself, so this only
  // changes on an explicit user action (GPS button, or submitting the field)
  // and never as a side effect of a search finishing.
  const [searchTarget, setSearchTarget] = useState<SearchLocation>(CINCINNATI);
  const [isLocating, setIsLocating] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(true);
  const [liveResults, setLiveResults] = useState<Restaurant[] | null>(null);
  const [liveOpenNowResults, setLiveOpenNowResults] = useState<Restaurant[] | null>(null);
  const [fallbackReason, setFallbackReason] = useState<FallbackReason>(null);

  async function refreshLocation() {
    setIsLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const position = await Location.getCurrentPositionAsync({});
      setSearchTarget({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      if (Platform.OS !== 'web') {
        const [place] = await Location.reverseGeocodeAsync(position.coords);
        const label = [place?.city, place?.region].filter(Boolean).join(', ');
        setLocationLabel(label || 'Current Location');
      } else {
        setLocationLabel('Current Location');
      }
    } catch {
      // Keep whatever location was already in state (device location, or Cincinnati).
    } finally {
      setIsLocating(false);
    }
  }

  function handleLocationSubmit() {
    const query = locationLabel.trim();
    if (!query) return;
    setSearchTarget({ location: query });
  }

  useEffect(() => {
    refreshLocation();
  }, []);

  // Refetch restaurants whenever the search location changes.
  useEffect(() => {
    let cancelled = false;
    setIsLoadingResults(true);
    setLiveOpenNowResults(null);

    searchRestaurants(searchTarget)
      .then((results) => {
        if (cancelled) return;
        setLiveResults(results);
        setFallbackReason(null);
      })
      .catch((error) => {
        if (cancelled) return;
        setLiveResults(null);
        setFallbackReason(
          error instanceof Error && error.message.includes('not available on web')
            ? 'web'
            : error instanceof Error && error.message.includes('API key')
              ? 'no-key'
              : 'error'
        );
      })
      .finally(() => {
        if (!cancelled) setIsLoadingResults(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchTarget]);

  // "Open Now" re-queries live with a server-side filter rather than trusting
  // a per-item flag we don't have from a plain search response.
  useEffect(() => {
    if (fallbackReason || activeFilter !== 'Open Now' || liveOpenNowResults) return;
    searchRestaurants({ ...searchTarget, openNow: true })
      .then(setLiveOpenNowResults)
      .catch(() => {});
  }, [activeFilter, searchTarget, fallbackReason, liveOpenNowResults]);

  const usingSampleData = fallbackReason !== null;
  const baseList = usingSampleData
    ? sampleRestaurants
    : activeFilter === 'Open Now'
      ? (liveOpenNowResults ?? liveResults ?? sampleRestaurants)
      : (liveResults ?? sampleRestaurants);

  const filteredRestaurants = sortRestaurants(
    baseList.filter((restaurant) => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Open Now') return usingSampleData ? restaurant.isOpenNow : true;
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
            value={locationLabel}
            onChangeText={setLocationLabel}
            onSubmitEditing={handleLocationSubmit}
            returnKeyType="search"
            placeholderTextColor={darkTheme.textMuted}
            style={styles.locationInput}
          />
          <Pressable style={styles.locateButton} onPress={refreshLocation} hitSlop={8}>
            {isLocating ? (
              <ActivityIndicator size="small" color={darkTheme.card} />
            ) : (
              <Ionicons name="navigate" size={16} color={darkTheme.card} />
            )}
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

        {usingSampleData && (
          <Text style={styles.fallbackNote}>{describeFallback(fallbackReason)}</Text>
        )}

        <RestaurantMap restaurants={filteredRestaurants} theme={darkTheme} />

        {isLoadingResults && !usingSampleData ? (
          <View style={styles.emptyState}>
            <ActivityIndicator color={darkTheme.accent} />
          </View>
        ) : filteredRestaurants.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={36} color={darkTheme.textMuted} />
            <Text style={styles.emptySubtitle}>No restaurants match this filter yet.</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                theme={darkTheme}
                onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}
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
  fallbackNote: {
    fontFamily: fontFamily.body,
    fontSize: 12,
    color: darkTheme.textMuted,
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
