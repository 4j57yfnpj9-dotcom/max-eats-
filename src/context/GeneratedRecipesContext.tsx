import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../data/recipes';

type GeneratedRecipesContextValue = {
  generatedRecipes: Recipe[];
  addGeneratedRecipe: (recipe: Recipe) => void;
  clearGeneratedRecipes: () => void;
};

const GeneratedRecipesContext = createContext<GeneratedRecipesContextValue | null>(null);

const STORAGE_KEY = 'verdant.generatedRecipes';

// Recipes produced by the Add tab's meal generator. Kept separate from the
// static `recipes` seed data so screens that need "every known recipe" can
// combine the two, without the generator mutating the static list.
// Persisted to AsyncStorage so generated recipes survive an app restart.
export function GeneratedRecipesProvider({ children }: { children: ReactNode }) {
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const hasLoaded = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setGeneratedRecipes(JSON.parse(stored));
      } finally {
        hasLoaded.current = true;
      }
    })();
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(generatedRecipes));
  }, [generatedRecipes]);

  const value = useMemo<GeneratedRecipesContextValue>(
    () => ({
      generatedRecipes,
      addGeneratedRecipe: (recipe) =>
        setGeneratedRecipes((prev) =>
          prev.some((existing) => existing.id === recipe.id) ? prev : [...prev, recipe]
        ),
      clearGeneratedRecipes: () => setGeneratedRecipes([]),
    }),
    [generatedRecipes]
  );

  return (
    <GeneratedRecipesContext.Provider value={value}>{children}</GeneratedRecipesContext.Provider>
  );
}

export function useGeneratedRecipes() {
  const context = useContext(GeneratedRecipesContext);
  if (!context) {
    throw new Error('useGeneratedRecipes must be used within a GeneratedRecipesProvider');
  }
  return context;
}
