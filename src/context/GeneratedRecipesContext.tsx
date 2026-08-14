import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Recipe } from '../data/recipes';

type GeneratedRecipesContextValue = {
  generatedRecipes: Recipe[];
  addGeneratedRecipe: (recipe: Recipe) => void;
};

const GeneratedRecipesContext = createContext<GeneratedRecipesContextValue | null>(null);

// Recipes produced by the Add tab's meal generator. Kept separate from the
// static `recipes` seed data so screens that need "every known recipe" can
// combine the two, without the generator mutating the static list.
export function GeneratedRecipesProvider({ children }: { children: ReactNode }) {
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);

  const value = useMemo<GeneratedRecipesContextValue>(
    () => ({
      generatedRecipes,
      addGeneratedRecipe: (recipe) =>
        setGeneratedRecipes((prev) =>
          prev.some((existing) => existing.id === recipe.id) ? prev : [...prev, recipe]
        ),
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
