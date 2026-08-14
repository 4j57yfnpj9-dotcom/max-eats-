import { StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, radius } from '../theme';

type ImagePlaceholderProps = {
  theme: Theme;
  style?: ViewStyle;
};

// Stands in for a food photo. Swapping this for a real <Image> later is a
// one-component change — every screen that renders a recipe stays the same.
// `style` lets callers override the default size (e.g. a small thumbnail)
// while keeping the same look.
export function ImagePlaceholder({ theme, style }: ImagePlaceholderProps) {
  return (
    <View style={[styles.base, { backgroundColor: theme.imagePlaceholder }, style]}>
      <Ionicons name="leaf-outline" size={28} color={theme.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 120,
    width: '100%',
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
