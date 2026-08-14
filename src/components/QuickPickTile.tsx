import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Theme, fontFamily, radius, spacing } from '../theme';

type QuickPickTileProps = {
  label: string;
  icon: ReactNode;
  theme: Theme;
  selected?: boolean;
  onPress?: () => void;
};

// Same selected/unselected toggle behavior as Chip, in a different shape —
// the screen still owns which tags are selected; this just renders it.
export function QuickPickTile({ label, icon, theme, selected = false, onPress }: QuickPickTileProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: selected ? theme.accent : theme.card,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      {icon}
      <Text style={[styles.label, { color: selected ? theme.card : theme.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    borderRadius: radius.button,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  label: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: 12,
    textAlign: 'center',
  },
});
