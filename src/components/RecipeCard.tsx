import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recipe } from '../data/recipes';
import { Theme, fontFamily, radius, spacing } from '../theme';
import { Card } from './Card';
import { Badge } from './Badge';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useFavorites } from '../context/FavoritesContext';

type RecipeCardProps = {
  recipe: Recipe;
  theme: Theme;
  onPress?: () => void;
};

export function RecipeCard({ recipe, theme, onPress }: RecipeCardProps) {
  const { isRecipeFavorite, toggleRecipeFavorite } = useFavorites();
  const isFavorite = isRecipeFavorite(recipe.id);
  const subtitle = recipe.subtitle ?? `${recipe.tags[0]} • ${recipe.minutes} min`;

  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <Card theme={theme}>
      {recipe.image ? (
        <Image source={recipe.image} style={styles.image} resizeMode="cover" />
      ) : (
        <ImagePlaceholder theme={theme} />
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm }}>
        <Text
          style={{
            fontFamily: fontFamily.headingBold,
            fontSize: 20,
            color: theme.text,
          }}
        >
          {recipe.title}
        </Text>
        {recipe.isNew && <Badge label="New" theme={theme} />}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: spacing.xs,
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily.body,
            fontSize: 14,
            color: theme.textMuted,
          }}
        >
          {subtitle}
        </Text>
        <Pressable onPress={() => toggleRecipeFavorite(recipe.id)} hitSlop={8}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? theme.accent : theme.textMuted}
          />
        </Pressable>
      </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 160,
    borderRadius: radius.button,
    width: '100%',
  },
});
