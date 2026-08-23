import { Restaurant } from '../data/restaurants';
import { Theme } from '../theme';
import { MapPlaceholder } from './MapPlaceholder';

type RestaurantMapProps = {
  restaurants: Restaurant[];
  theme: Theme;
};

// expo-maps has no web renderer, so this file (picked automatically for the
// web bundle via the .web.tsx extension) never imports it — keeping the
// native module out of the web build entirely rather than branching on
// Platform.OS at runtime, which would still pull it into the bundle.
export function RestaurantMap({ theme }: RestaurantMapProps) {
  return <MapPlaceholder theme={theme} />;
}
