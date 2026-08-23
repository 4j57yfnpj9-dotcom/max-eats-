import { Platform, StyleSheet, View } from 'react-native';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { Restaurant } from '../data/restaurants';
import { Theme, radius } from '../theme';

type RestaurantMapProps = {
  restaurants: Restaurant[];
  theme: Theme;
};

const CINCINNATI = { latitude: 39.1031, longitude: -84.512 };

function centerOf(restaurants: Restaurant[]) {
  if (restaurants.length === 0) return CINCINNATI;
  const total = restaurants.reduce(
    (acc, restaurant) => ({
      latitude: acc.latitude + restaurant.latitude,
      longitude: acc.longitude + restaurant.longitude,
    }),
    { latitude: 0, longitude: 0 }
  );
  return {
    latitude: total.latitude / restaurants.length,
    longitude: total.longitude / restaurants.length,
  };
}

export function RestaurantMap({ restaurants, theme }: RestaurantMapProps) {
  const cameraPosition = { coordinates: centerOf(restaurants), zoom: 13 };

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <AppleMaps.View
          style={styles.map}
          cameraPosition={cameraPosition}
          markers={restaurants.map((restaurant) => ({
            id: restaurant.id,
            coordinates: { latitude: restaurant.latitude, longitude: restaurant.longitude },
            title: restaurant.name,
            tintColor: theme.accent,
          }))}
        />
      ) : (
        <GoogleMaps.View
          style={styles.map}
          cameraPosition={cameraPosition}
          markers={restaurants.map((restaurant) => ({
            id: restaurant.id,
            coordinates: { latitude: restaurant.latitude, longitude: restaurant.longitude },
            title: restaurant.name,
          }))}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: radius.card,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});
