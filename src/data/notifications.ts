import { Ionicons } from '@expo/vector-icons';

export type NotificationItem = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
};

// Local stand-in for a real notifications feed — same seam as the rest of
// the app's mock data, swapped for a backend/push service later.
export const notifications: NotificationItem[] = [
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
