import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ingredient } from '../data/recipes';

export type GroceryItem = {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
};

type AddIngredientsResult = {
  added: number;
  skippedHaveAtHome: number;
};

type GroceryListContextValue = {
  items: GroceryItem[];
  // Adds ingredients not already on the list. One marked `haveAtHome: true`
  // (only ever set on a fridge-scanned recipe) is skipped rather than
  // added — the whole point is a list of what you still need to buy.
  addIngredients: (ingredients: Ingredient[]) => AddIngredientsResult;
  toggleChecked: (id: string) => void;
  removeItem: (id: string) => void;
  clearChecked: () => void;
  clearAll: () => void;
};

const GroceryListContext = createContext<GroceryListContextValue | null>(null);

const STORAGE_KEY = 'verdant.groceryList';

export function GroceryListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const hasLoaded = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setItems(JSON.parse(stored));
      } finally {
        hasLoaded.current = true;
      }
    })();
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<GroceryListContextValue>(
    () => ({
      items,
      addIngredients: (ingredients) => {
        let added = 0;
        let skippedHaveAtHome = 0;
        setItems((prev) => {
          const existingNames = new Set(prev.map((item) => item.name.toLowerCase()));
          const next = [...prev];
          for (const ingredient of ingredients) {
            if (ingredient.haveAtHome) {
              skippedHaveAtHome++;
              continue;
            }
            if (existingNames.has(ingredient.name.toLowerCase())) continue;
            existingNames.add(ingredient.name.toLowerCase());
            next.push({
              id: `${ingredient.name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              name: ingredient.name,
              quantity: ingredient.quantity,
              checked: false,
            });
            added++;
          }
          return next;
        });
        return { added, skippedHaveAtHome };
      },
      toggleChecked: (id) =>
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
        ),
      removeItem: (id) => setItems((prev) => prev.filter((item) => item.id !== id)),
      clearChecked: () => setItems((prev) => prev.filter((item) => !item.checked)),
      clearAll: () => setItems([]),
    }),
    [items]
  );

  return <GroceryListContext.Provider value={value}>{children}</GroceryListContext.Provider>;
}

export function useGroceryList() {
  const context = useContext(GroceryListContext);
  if (!context) {
    throw new Error('useGroceryList must be used within a GroceryListProvider');
  }
  return context;
}
