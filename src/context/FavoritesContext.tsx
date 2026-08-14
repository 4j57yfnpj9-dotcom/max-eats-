import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type FavoritesContextValue = {
  favoriteRecipeIds: string[];
  favoriteRestaurantIds: string[];
  isRecipeFavorite: (id: string) => boolean;
  isRestaurantFavorite: (id: string) => boolean;
  toggleRecipeFavorite: (id: string) => void;
  toggleRestaurantFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

// Shared in-memory favorites store — lets the heart toggle on a Recipe/Restaurant
// card (Home, Explore, Recipe Detail) and the Saved tab agree on the same state.
// Resets on app restart until there's a backend/persistence layer to back it.
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<string[]>([]);
  const [favoriteRestaurantIds, setFavoriteRestaurantIds] = useState<string[]>([]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteRecipeIds,
      favoriteRestaurantIds,
      isRecipeFavorite: (id) => favoriteRecipeIds.includes(id),
      isRestaurantFavorite: (id) => favoriteRestaurantIds.includes(id),
      toggleRecipeFavorite: (id) =>
        setFavoriteRecipeIds((prev) =>
          prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]
        ),
      toggleRestaurantFavorite: (id) =>
        setFavoriteRestaurantIds((prev) =>
          prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]
        ),
    }),
    [favoriteRecipeIds, favoriteRestaurantIds]
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
