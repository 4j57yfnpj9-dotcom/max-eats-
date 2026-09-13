import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FindRestaurantsScreen } from '../screens/FindRestaurantsScreen';
import { RestaurantDetailScreen } from '../screens/RestaurantDetailScreen';
import { Restaurant } from '../data/restaurants';

// The Explore tab's own navigation history — separate from the Tab
// Navigator, mirrors HomeStackNavigator. Pushing RestaurantDetail here
// layers it on top without hiding the tab bar.
export type ExploreStackParamList = {
  ExploreMain: undefined;
  RestaurantDetail: { restaurant: Restaurant };
};

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export function ExploreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreMain" component={FindRestaurantsScreen} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
    </Stack.Navigator>
  );
}
