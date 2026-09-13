import { Restaurant, RestaurantTag } from '../data/restaurants';

export type SearchLocation =
  | { latitude: number; longitude: number }
  | { location: string };

type SearchParams = SearchLocation & { openNow?: boolean };

type YelpCategory = { alias: string; title: string };

type YelpBusiness = {
  id: string;
  name: string;
  image_url?: string;
  rating: number;
  review_count: number;
  distance?: number;
  price?: string;
  url?: string;
  display_phone?: string;
  categories: YelpCategory[];
  coordinates: { latitude: number; longitude: number };
  location?: { display_address?: string[] };
  hours?: { is_open_now: boolean }[];
};

const METERS_PER_MILE = 1609.344;

const CATEGORY_TAG_MAP: Record<string, RestaurantTag> = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  gluten_free: 'Gluten Free',
  organic_stores: 'Organic',
};

function requireApiKey() {
  const apiKey = process.env.EXPO_PUBLIC_YELP_API_KEY;
  if (!apiKey) {
    throw new Error(
      'No Yelp API key found. Add EXPO_PUBLIC_YELP_API_KEY to .env.local and restart the app.'
    );
  }
  return apiKey;
}

function mapBusinessToRestaurant(business: YelpBusiness): Restaurant {
  const tags = business.categories
    .map((category) => CATEGORY_TAG_MAP[category.alias])
    .filter((tag): tag is RestaurantTag => Boolean(tag));

  return {
    id: business.id,
    name: business.name,
    tags: tags.length > 0 ? tags : ['Vegetarian'],
    rating: business.rating,
    reviewCount: business.review_count,
    distanceMiles:
      typeof business.distance === 'number'
        ? Math.round((business.distance / METERS_PER_MILE) * 10) / 10
        : 0,
    isOpenNow: business.hours?.[0]?.is_open_now ?? true,
    latitude: business.coordinates.latitude,
    longitude: business.coordinates.longitude,
    image: business.image_url ? { uri: business.image_url } : undefined,
    address: business.location?.display_address?.join(', '),
    phone: business.display_phone,
    price: business.price,
    yelpUrl: business.url,
  };
}

// Native only — Yelp Fusion has no CORS headers, so it can't be called from
// a browser at all (see restaurantFinder.web.ts). The key lives in
// EXPO_PUBLIC_YELP_API_KEY (gitignored .env.local), same pattern as
// mealGenerator.native.ts.
//
// Accepts either device coordinates or a free-text location — Yelp geocodes
// the text itself, so a typed address needs no separate geocoding step.
export async function searchRestaurants(searchParams: SearchParams): Promise<Restaurant[]> {
  const apiKey = requireApiKey();

  const params = new URLSearchParams({
    categories: 'vegetarian,vegan',
    limit: '20',
    sort_by: 'best_match',
  });
  if ('location' in searchParams) {
    params.set('location', searchParams.location);
  } else {
    params.set('latitude', String(searchParams.latitude));
    params.set('longitude', String(searchParams.longitude));
  }
  if (searchParams.openNow) params.set('open_now', 'true');

  const response = await fetch(`https://api.yelp.com/v3/businesses/search?${params.toString()}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    throw new Error(`Yelp request failed (${response.status}).`);
  }

  const data = (await response.json()) as { businesses?: YelpBusiness[] };
  return (data.businesses ?? []).map(mapBusinessToRestaurant);
}

// Business Details returns everything Search does plus address, phone,
// price, a link to the Yelp page, and real open/closed hours — fetched
// lazily per-restaurant (on RestaurantDetailScreen) rather than for every
// search result, since it's a separate call against Yelp's rate limit.
export async function getRestaurantDetails(id: string): Promise<Restaurant> {
  const apiKey = requireApiKey();

  const response = await fetch(`https://api.yelp.com/v3/businesses/${id}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) {
    throw new Error(`Yelp request failed (${response.status}).`);
  }

  const business = (await response.json()) as YelpBusiness;
  return mapBusinessToRestaurant(business);
}
