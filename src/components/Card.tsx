import { StyleSheet, View, ViewProps } from 'react-native';
import { Theme, radius, spacing } from '../theme';

type CardProps = ViewProps & {
  theme: Theme;
};

// A rounded container that adapts to whichever theme (light or dark) the
// screen passes in. Screens compose their layouts by nesting content inside.
export function Card({ theme, style, children, ...rest }: CardProps) {
  return (
    <View
      style={[styles.base, { backgroundColor: theme.card }, style]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.card,
    padding: spacing.md,
  },
});
