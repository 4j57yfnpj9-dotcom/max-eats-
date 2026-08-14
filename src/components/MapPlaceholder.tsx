import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, radius } from '../theme';

type MapPlaceholderProps = {
  theme: Theme;
};

// Stands in for a real interactive map. Wiring in an actual map (API keys,
// native module, web support) is a bigger decision saved for its own step —
// this just mimics the layout so the screen reads correctly for now.
const PIN_POSITIONS = [
  { top: '20%', left: '25%' },
  { top: '15%', left: '65%' },
  { top: '55%', left: '78%' },
  { top: '65%', left: '15%' },
] as const;

export function MapPlaceholder({ theme }: MapPlaceholderProps) {
  return (
    <View style={[styles.base, { backgroundColor: theme.imagePlaceholder }]}>
      {PIN_POSITIONS.map((position, index) => (
        <Ionicons
          key={index}
          name="location"
          size={22}
          color={theme.accent}
          style={[styles.pin, position]}
        />
      ))}
      <View style={[styles.userDot, { backgroundColor: theme.accentBright }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 200,
    borderRadius: radius.card,
    overflow: 'hidden',
  },
  pin: {
    position: 'absolute',
  },
  userDot: {
    position: 'absolute',
    top: '45%',
    left: '48%',
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
