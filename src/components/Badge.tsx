import { StyleSheet, Text, View } from 'react-native';
import { Theme, fontFamily, radius, spacing } from '../theme';

type BadgeProps = {
  label: string;
  theme: Theme;
  variant?: 'accent' | 'gold';
};

// A small, non-interactive label — e.g. the "New" tag on a recipe card.
export function Badge({ label, theme, variant = 'accent' }: BadgeProps) {
  const backgroundColor = variant === 'gold' ? theme.starGold : theme.accent;

  return (
    <View style={[styles.base, { backgroundColor }]}>
      <Text style={[styles.label, { color: theme.card }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 12,
  },
});
