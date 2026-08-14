import { Pressable, StyleSheet, Text } from 'react-native';
import { Theme, fontFamily, radius, spacing } from '../theme';

type ChipProps = {
  label: string;
  theme: Theme;
  selected?: boolean;
  onPress?: () => void;
};

// A pill-shaped, tappable tag. `selected` switches it between a muted
// outline look and a filled accent-green look.
export function Chip({ label, theme, selected = false, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: selected ? theme.accent : theme.card,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text
        style={{
          fontFamily: fontFamily.bodyMedium,
          color: selected ? theme.card : theme.text,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
});
