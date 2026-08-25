import { Recipe, Tag } from '../data/recipes';
import { recipeSuggestions } from '../data/recipeSuggestions';

// The web build is public (GitHub Pages), so it can't hold a real API key —
// see mealGenerator.native.ts for the real AI-backed version used on iOS/Android.
// This keeps the original mock: pick a suggestion matching every selected tag.
function pickSuggestion(tags: Tag[], excludeId?: string): Recipe {
  const matchesTags = (recipe: Recipe) => tags.every((tag) => recipe.tags.includes(tag));
  const pool = recipeSuggestions.filter((recipe) => recipe.id !== excludeId);
  const tagged = tags.length > 0 ? pool.filter(matchesTags) : pool;
  const candidates = tagged.length > 0 ? tagged : pool.length > 0 ? pool : recipeSuggestions;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export async function generateMeal(
  _promptText: string,
  tags: Tag[],
  previousId?: string
): Promise<Recipe> {
  return pickSuggestion(tags, previousId);
}
