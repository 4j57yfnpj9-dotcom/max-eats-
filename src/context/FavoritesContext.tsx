import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restaurant } from '../data/restaurants';

type FavoritesContextValue = {
  favoriteRecipeIds: string[];
  favoriteRestaurantIds: string[];
  favoriteRestaurants: Restaurant[];
  isRecipeFavorite: (id: string) => boolean;
  isRestaurantFavorite: (id: string) => boolean;
  toggleRecipeFavorite: (id: string) => void;
  toggleRestaurantFavorite: (restaurant: Restaurant) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const RECIPES_STORAGE_KEY = 'verdant.favoriteRecipeIds';
const RESTAURANTS_STORAGE_KEY = 'verdant.favoriteRestaurants';

// Shared favorites store — lets the heart toggle on a Recipe/Restaurant
// card (Home, Explore, Recipe Detail) and the Saved tab agree on the same state.
// Persisted to AsyncStorage so favorites survive an app restart.
//
// Restaurants are stored as full objects, not just ids — unlike the static
// recipe catalog, restaurants come from a live search (see
// services/restaurantFinder) so a favorited one may not be in the current
// results list. Storing the object is what lets Saved still render it later.
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<string[]>([]);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>([]);
  const hasLoaded = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const [storedRecipeIds, storedRestaurants] = await Promise.all([
          AsyncStorage.getItem(RECIPES_STORAGE_KEY),
          AsyncStorage.getItem(RESTAURANTS_STORAGE_KEY),
        ]);
        if (storedRecipeIds) setFavoriteRecipeIds(JSON.parse(storedRecipeIds));
        if (storedRestaurants) setFavoriteRestaurants(JSON.parse(storedRestaurants));
      } finally {
        hasLoaded.current = true;
      }
    })();
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;
    AsyncStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(favoriteRecipeIds));
  }, [favoriteRecipeIds]);

  useEffect(() => {
    if (!hasLoaded.current) return;
    AsyncStorage.setItem(RESTAURANTS_STORAGE_KEY, JSON.stringify(favoriteRestaurants));
  }, [favoriteRestaurants]);

  const favoriteRestaurantIds = useMemo(
    () => favoriteRestaurants.map((restaurant) => restaurant.id),
    [favoriteRestaurants]
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteRecipeIds,
      favoriteRestaurantIds,
      favoriteRestaurants,
      isRecipeFavorite: (id) => favoriteRecipeIds.includes(id),
      isRestaurantFavorite: (id) => favoriteRestaurantIds.includes(id),
      toggleRecipeFavorite: (id) =>
        setFavoriteRecipeIds((prev) =>
          prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]
        ),
      toggleRestaurantFavorite: (restaurant) =>
        setFavoriteRestaurants((prev) =>
          prev.some((existing) => existing.id === restaurant.id)
            ? prev.filter((existing) => existing.id !== restaurant.id)
            : [...prev, restaurant]
        ),
      clearFavorites: () => {
        setFavoriteRecipeIds([]);
        setFavoriteRestaurants([]);
      },
    }),
    [favoriteRecipeIds, favoriteRestaurantIds, favoriteRestaurants]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
