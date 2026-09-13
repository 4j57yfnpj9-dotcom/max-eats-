import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { lightTheme, fontFamily, radius, spacing } from '../theme';
import { Card } from '../components/Card';
import { notifications } from '../data/notifications';
import { useNotifications } from '../context/NotificationsContext';

export function NotificationsScreen() {
  const navigation = useNavigation();
  const { isRead, markAllAsRead } = useNotifications();

  // Opening this screen is what clears the unread badge — same convention
  // as most notification inboxes.
  useEffect(() => {
    markAllAsRead();
  }, [markAllAsRead]);

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
              {notification.unread && !isRead(notification.id) && (
                <View style={styles.unreadDot} />
              )}
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
