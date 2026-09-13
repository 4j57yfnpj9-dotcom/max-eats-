import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant } from '../data/restaurants';
import { Theme, fontFamily, radius, spacing } from '../theme';
import { Card } from './Card';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useFavorites } from '../context/FavoritesContext';

type RestaurantCardProps = {
  restaurant: Restaurant;
  theme: Theme;
  onPress?: () => void;
};

export function RestaurantCard({ restaurant, theme, onPress }: RestaurantCardProps) {
  const { isRestaurantFavorite, toggleRestaurantFavorite } = useFavorites();
  const isFavorite = isRestaurantFavorite(restaurant.id);

  return (
    <Pressable onPress={onPress} disabled={!onPress}>
    <Card theme={theme} style={styles.card}>
      <View style={styles.thumbnail}>
        {restaurant.image ? (
          <Image source={restaurant.image} style={styles.thumbnailImage} resizeMode="cover" />
        ) : (
          <ImagePlaceholder theme={theme} style={styles.thumbnailImage} />
        )}
      </View>

      <View style={styles.details}>
        <View style={styles.nameRow}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <Pressable onPress={() => toggleRestaurantFavorite(restaurant)} hitSlop={8}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={18}
              color={isFavorite ? theme.accent : theme.textMuted}
            />
          </Pressable>
        </View>

        <Text style={[styles.tags, { color: theme.textMuted }]} numberOfLines={1}>
          {restaurant.tags.join(' • ')}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color={theme.starGold} />
            <Text style={[styles.meta, { color: theme.text }]}>
              {restaurant.rating.toFixed(1)}
            </Text>
            <Text style={[styles.meta, { color: theme.textMuted }]}>
              ({restaurant.reviewCount})
            </Text>
          </View>
          <Text style={[styles.meta, { color: theme.textMuted }]}>
            {restaurant.distanceMiles} mi
          </Text>
        </View>
      </View>
    </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: radius.button,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: fontFamily.headingBold,
    fontSize: 16,
    flex: 1,
    marginRight: spacing.sm,
  },
  tags: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  meta: {
    fontFamily: fontFamily.body,
    fontSize: 13,
  },
});
