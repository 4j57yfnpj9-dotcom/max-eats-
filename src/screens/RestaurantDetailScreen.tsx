import { useEffect, useState } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ExploreStackParamList } from '../navigation/ExploreStackNavigator';
import { Restaurant } from '../data/restaurants';
import { getRestaurantDetails } from '../services/restaurantFinder';
import { darkTheme, fontFamily, radius, spacing } from '../theme';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { InfoPill } from '../components/InfoPill';
import { useFavorites } from '../context/FavoritesContext';

type RestaurantDetailRouteProp = RouteProp<ExploreStackParamList, 'RestaurantDetail'>;

export function RestaurantDetailScreen() {
  const { params } = useRoute<RestaurantDetailRouteProp>();
  const navigation = useNavigation();
  const { isRestaurantFavorite, toggleRestaurantFavorite } = useFavorites();

  const [restaurant, setRestaurant] = useState<Restaurant>(params.restaurant);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [detailsUnavailable, setDetailsUnavailable] = useState(false);
  const isFavorite = isRestaurantFavorite(restaurant.id);

  useEffect(() => {
    let cancelled = false;
    getRestaurantDetails(params.restaurant.id)
      .then((details) => {
        if (!cancelled) setRestaurant(details);
      })
      .catch(() => {
        if (!cancelled) setDetailsUnavailable(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingDetails(false);
      });
    return () => {
      cancelled = true;
    };
  }, [params.restaurant.id]);

  function openInMaps() {
    const query = encodeURIComponent(restaurant.address ?? restaurant.name);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  }

  function callRestaurant() {
    if (!restaurant.phone) return;
    Linking.openURL(`tel:${restaurant.phone.replace(/[^0-9+]/g, '')}`);
  }

  function openOnYelp() {
    if (restaurant.yelpUrl) Linking.openURL(restaurant.yelpUrl);
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={darkTheme.text} />
        </Pressable>
        <Pressable onPress={() => toggleRestaurantFavorite(restaurant)} hitSlop={8}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorite ? darkTheme.accent : darkTheme.text}
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {restaurant.image ? (
          <Image source={restaurant.image} style={styles.hero} resizeMode="cover" />
        ) : (
          <ImagePlaceholder theme={darkTheme} />
        )}

        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.tags}>{restaurant.tags.join(' • ')}</Text>

        <View style={styles.pillRow}>
          <InfoPill
            theme={darkTheme}
            icon={<Ionicons name="star" size={16} color={darkTheme.starGold} />}
            label={`${restaurant.rating.toFixed(1)} (${restaurant.reviewCount})`}
          />
          <InfoPill
            theme={darkTheme}
            icon={<Ionicons name="navigate-outline" size={16} color={darkTheme.text} />}
            label={`${restaurant.distanceMiles} mi`}
          />
          {restaurant.price && (
            <InfoPill
              theme={darkTheme}
              icon={<Ionicons name="cash-outline" size={16} color={darkTheme.text} />}
              label={restaurant.price}
            />
          )}
        </View>

        {isLoadingDetails && (
          <Text style={styles.loadingNote}>Loading address, hours, and phone number…</Text>
        )}

        {detailsUnavailable && !restaurant.address && (
          <Text style={styles.loadingNote}>
            More details aren't available for this restaurant right now.
          </Text>
        )}

        {restaurant.address && (
          <Pressable style={styles.detailRow} onPress={openInMaps}>
            <Ionicons name="location-outline" size={20} color={darkTheme.accent} />
            <Text style={styles.detailText}>{restaurant.address}</Text>
          </Pressable>
        )}

        {restaurant.phone && (
          <Pressable style={styles.detailRow} onPress={callRestaurant}>
            <Ionicons name="call-outline" size={20} color={darkTheme.accent} />
            <Text style={styles.detailText}>{restaurant.phone}</Text>
          </Pressable>
        )}

        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={20} color={darkTheme.accent} />
          <Text style={styles.detailText}>{restaurant.isOpenNow ? 'Open now' : 'Closed now'}</Text>
        </View>

        {restaurant.yelpUrl && (
          <Pressable style={styles.ctaButton} onPress={openOnYelp}>
            <Text style={styles.ctaLabel}>View on Yelp</Text>
          </Pressable>
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
  content: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  hero: {
    width: '100%',
    height: 220,
    borderRadius: radius.card,
  },
  title: {
    fontFamily: fontFamily.headingBold,
    fontSize: 24,
    color: darkTheme.text,
    marginTop: spacing.md,
  },
  tags: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    color: darkTheme.textMuted,
    marginTop: 2,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  loadingNote: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    color: darkTheme.textMuted,
    marginTop: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  detailText: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    color: darkTheme.text,
    flex: 1,
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
});
