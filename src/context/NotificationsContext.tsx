import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notifications } from '../data/notifications';

type NotificationsContextValue = {
  unreadCount: number;
  isRead: (id: string) => boolean;
  markAllAsRead: () => void;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

const STORAGE_KEY = 'verdant.readNotificationIds';

// Tracks which of the (static, mock) notifications the user has already
// seen, persisted so the unread badge doesn't reset every app restart.
export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [readIds, setReadIds] = useState<string[]>([]);
  const hasLoaded = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setReadIds(JSON.parse(stored));
      } finally {
        hasLoaded.current = true;
      }
    })();
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(readIds));
  }, [readIds]);

  const value = useMemo<NotificationsContextValue>(
    () => ({
      unreadCount: notifications.filter((n) => n.unread && !readIds.includes(n.id)).length,
      isRead: (id) => readIds.includes(id),
      markAllAsRead: () =>
        setReadIds((prev) => {
          const unreadIds = notifications.filter((n) => n.unread).map((n) => n.id);
          const merged = new Set([...prev, ...unreadIds]);
          return Array.from(merged);
        }),
    }),
    [readIds]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}
