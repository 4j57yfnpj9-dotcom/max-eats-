import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { lightTheme, fontFamily, radius, spacing } from '../theme';
import { Card } from '../components/Card';

type NotificationItem = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
};

// Local stand-in for a real notifications feed — same seam as the rest of
// the app's mock data, swapped for a backend/push service later.
const notifications: NotificationItem[] = [
  {
    id: 'todays-recommendation',
    icon: 'restaurant-outline',
    title: "Today's recommendation is ready",
    message: 'We picked a Lemon Chickpea Power Bowl for you based on your Quick Picks.',
    time: '2h ago',
    unread: true,
  },
  {
    id: 'new-restaurant',
    icon: 'location-outline',
    title: 'New spot near you',
    message: 'Rooted Kitchen just joined Verdant — 2.6 mi away with a 4.8 rating.',
    time: '1d ago',
    unread: true,
  },
  {
    id: 'saved-reminder',
    icon: 'heart-outline',
    title: "You haven't cooked this in a while",
    message: 'Revisit your saved recipes for meal ideas this week.',
    time: '3d ago',
  },
];

export function NotificationsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={lightTheme.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {notifications.map((notification) => (
          <Card key={notification.id} theme={lightTheme} style={styles.card}>
            <View style={styles.iconWrap}>
              <Ionicons name={notification.icon} size={20} color={lightTheme.accent} />
              {notification.unread && <View style={styles.unreadDot} />}
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.title}>{notification.title}</Text>
              <Text style={styles.message}>{notification.message}</Text>
              <Text style={styles.time}>{notification.time}</Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: lightTheme.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  headerTitle: {
    flex: 1,
    fontFamily: fontFamily.headingBold,
    fontSize: 18,
    color: lightTheme.text,
    textAlign: 'center',
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.button,
    backgroundColor: lightTheme.imagePlaceholder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: lightTheme.accent,
    borderWidth: 2,
    borderColor: lightTheme.card,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.headingBold,
    fontSize: 15,
    color: lightTheme.text,
  },
  message: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    color: lightTheme.textMuted,
    marginTop: 2,
    lineHeight: 18,
  },
  time: {
    fontFamily: fontFamily.body,
    fontSize: 12,
    color: lightTheme.textMuted,
    marginTop: spacing.xs,
  },
});
