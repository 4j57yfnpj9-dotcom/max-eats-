import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ExploreCategory } from '../data/categories';
import { Theme, darkTheme, fontFamily, radius, spacing } from '../theme';

type CategoryCardProps = {
  category: ExploreCategory;
  theme: Theme;
  onPress?: () => void;
};

export function CategoryCard({ category, theme, onPress }: CategoryCardProps) {
  return (
    <Pressable onPress={onPress} style={[styles.base, { backgroundColor: theme.imagePlaceholder }]}>
      {category.image ? (
        <Image source={category.image} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.iconWrap}>
          <Ionicons name="restaurant-outline" size={26} color={theme.accent} />
        </View>
      )}

      {/* Gradient scrim: transparent up top, solid at the bottom, so the
          overlaid text stays readable no matter what photo ends up here. */}
      <LinearGradient colors={['transparent', 'rgba(20, 31, 23, 0.75)']} style={styles.scrim}>
        <Text style={styles.label}>{category.label}</Text>
        <Text style={styles.count}>{category.recipeCount} recipes</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 140,
    height: 140,
    borderRadius: radius.card,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  iconWrap: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  label: {
    fontFamily: fontFamily.headingBold,
    fontSize: 15,
    color: darkTheme.text,
  },
  count: {
    fontFamily: fontFamily.body,
    fontSize: 12,
    color: darkTheme.textMuted,
    marginTop: 2,
  },
});
