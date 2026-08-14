import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme, fontFamily, radius, spacing } from '../theme';

type InfoPillProps = {
  icon: ReactNode;
  label: string;
  theme: Theme;
};

export function InfoPill({ icon, label, theme }: InfoPillProps) {
  return (
    <View style={[styles.pill, { backgroundColor: theme.card }]}>
      {icon}
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  label: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: 13,
  },
});
