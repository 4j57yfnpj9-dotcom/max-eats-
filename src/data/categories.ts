import { ImageSourcePropType } from 'react-native';
import { MealCategory, recipes } from './recipes';

export type ExploreCategory = {
  id: MealCategory;
  label: string;
  recipeCount: number;
  image?: ImageSourcePropType;
};

// recipeCount is derived from the seed recipe list rather than hand-entered,
// so it never drifts out of sync as recipes get added or removed.
function countRecipesIn(category: MealCategory): number {
  return recipes.filter((recipe) => recipe.category === category).length;
}

export const exploreCategories: ExploreCategory[] = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    recipeCount: countRecipesIn('breakfast'),
    image: require('../../assets/images/breakfast.jpg'),
  },
  {
    id: 'lunch',
    label: 'Lunch',
    recipeCount: countRecipesIn('lunch'),
    image: require('../../assets/images/lunch.jpg'),
  },
  {
    id: 'dinner',
    label: 'Dinner',
    recipeCount: countRecipesIn('dinner'),
    image: require('../../assets/images/dinner.jpg'),
  },
];
