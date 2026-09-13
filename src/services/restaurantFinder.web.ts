import { Restaurant } from '../data/restaurants';

type SearchParams = {
  latitude: number;
  longitude: number;
  openNow?: boolean;
};

// Yelp Fusion's API has no CORS headers, so it can't be called directly from
// a browser — there's no way around this without a backend proxy, which this
// project doesn't have. FindRestaurantsScreen / RestaurantDetailScreen catch
// this and fall back to whatever sample/known data they already have.
export async function searchRestaurants(_params: SearchParams): Promise<Restaurant[]> {
  throw new Error('Live restaurant search is not available on web.');
}

export async function getRestaurantDetails(_id: string): Promise<Restaurant> {
  throw new Error('Live restaurant details are not available on web.');
}
