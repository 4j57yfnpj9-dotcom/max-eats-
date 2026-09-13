import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { RecipeDetailScreen } from '../screens/RecipeDetailScreen';
import { RecipeListScreen } from '../screens/RecipeListScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { GroceryListScreen } from '../screens/GroceryListScreen';
import { MealCategory, Tag } from '../data/recipes';

// The Home tab's own navigation history — separate from the Tab Navigator.
// Pushing a new screen here layers it on top without affecting the other
// tabs or hiding the tab bar.
export type HomeStackParamList = {
  HomeMain: undefined;
  RecipeDetail: { recipeId: string };
  RecipeList: { title: string; category?: MealCategory; tags?: Tag[]; query?: string };
  Notifications: undefined;
  GroceryList: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      <Stack.Screen name="RecipeList" component={RecipeListScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="GroceryList" component={GroceryListScreen} />
    </Stack.Navigator>
  );
}
