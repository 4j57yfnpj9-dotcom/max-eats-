import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightTheme, fontFamily } from '../theme';

type PlaceholderScreenProps = {
  title: string;
};

// Stands in for a screen we haven't designed yet, so navigation has a real
// destination to point at. Swapped out screen-by-screen as we build each one.
export function PlaceholderScreen({ title }: PlaceholderScreenProps) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: lightTheme.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.headingBold,
    fontSize: 22,
    color: lightTheme.text,
  },
  subtitle: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    color: lightTheme.textMuted,
    marginTop: 4,
  },
});
