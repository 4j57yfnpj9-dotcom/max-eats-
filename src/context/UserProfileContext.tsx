import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RestaurantTag } from '../data/restaurants';
import { currentUser as defaultUser } from '../data/user';

export const dietaryOptions: RestaurantTag[] = ['Vegan', 'Vegetarian', 'Gluten Free', 'Organic'];

type StoredProfile = {
  name: string;
  email: string;
  dietaryPreferences: RestaurantTag[];
  notificationsEnabled: boolean;
};

const defaults: StoredProfile = {
  name: defaultUser.name,
  email: defaultUser.email,
  dietaryPreferences: [],
  notificationsEnabled: true,
};

type UserProfileContextValue = StoredProfile & {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  toggleDietaryPreference: (tag: RestaurantTag) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  resetProfile: () => void;
};

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

const STORAGE_KEY = 'verdant.userProfile';

// Real (if locally-held) account state — name/email, dietary preferences,
// and the notification toggle — persisted to AsyncStorage. Dietary
// preferences aren't just stored for show: FindRestaurantsScreen reads them
// to pick a default filter.
export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<StoredProfile>(defaults);
  const hasLoaded = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setProfile({ ...defaults, ...JSON.parse(stored) });
      } finally {
        hasLoaded.current = true;
      }
    })();
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const value = useMemo<UserProfileContextValue>(
    () => ({
      ...profile,
      setName: (name) => setProfile((prev) => ({ ...prev, name })),
      setEmail: (email) => setProfile((prev) => ({ ...prev, email })),
      toggleDietaryPreference: (tag) =>
        setProfile((prev) => ({
          ...prev,
          dietaryPreferences: prev.dietaryPreferences.includes(tag)
            ? prev.dietaryPreferences.filter((existing) => existing !== tag)
            : [...prev.dietaryPreferences, tag],
        })),
      setNotificationsEnabled: (enabled) =>
        setProfile((prev) => ({ ...prev, notificationsEnabled: enabled })),
      resetProfile: () => setProfile(defaults),
    }),
    [profile]
  );

  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}
