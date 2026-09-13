import { ImageSourcePropType } from 'react-native';

export type RestaurantTag = 'Vegan' | 'Vegetarian' | 'Gluten Free' | 'Organic';

export type Restaurant = {
  id: string;
  name: string;
  tags: RestaurantTag[];
  rating: number;
  reviewCount: number;
  distanceMiles: number;
  isOpenNow: boolean;
  latitude: number;
  longitude: number;
  image?: ImageSourcePropType;
  // Only populated for live Yelp results — a plain search doesn't return
  // these, so they're filled in lazily by getRestaurantDetails() once a
  // restaurant is opened. Sample/mock data never has them.
  address?: string;
  phone?: string;
  price?: string;
  yelpUrl?: string;
};

// Real Cincinnati, OH coordinates (matches the default location in
// FindRestaurantsScreen) so the map has something real to center and pin.
export const restaurants: Restaurant[] = [
  {
    id: 'green-acres',
    name: 'Green Acres',
    tags: ['Vegetarian', 'Vegan', 'Organic'],
    rating: 4.7,
    reviewCount: 320,
    distanceMiles: 0.8,
    isOpenNow: true,
    latitude: 39.1031,
    longitude: -84.512,
  },
  {
    id: 'the-kind-bowl',
    name: 'The Kind Bowl',
    tags: ['Vegan', 'Gluten Free'],
    rating: 4.6,
    reviewCount: 198,
    distanceMiles: 1.2,
    isOpenNow: true,
    latitude: 39.1121,
    longitude: -84.5064,
  },
  {
    id: 'plantitude',
    name: 'Plantitude',
    tags: ['Vegetarian', 'Organic'],
    rating: 4.5,
    reviewCount: 256,
    distanceMiles: 1.5,
    isOpenNow: false,
    latitude: 39.0997,
    longitude: -84.4977,
  },
  {
    id: 'sprout-cafe',
    name: 'Sprout Café',
    tags: ['Vegan', 'Organic'],
    rating: 4.6,
    reviewCount: 142,
    distanceMiles: 1.9,
    isOpenNow: true,
    latitude: 39.1225,
    longitude: -84.5171,
  },
  {
    id: 'harvest-table',
    name: 'Harvest Table',
    tags: ['Vegetarian', 'Gluten Free', 'Organic'],
    rating: 4.4,
    reviewCount: 301,
    distanceMiles: 2.3,
    isOpenNow: false,
    latitude: 39.0896,
    longitude: -84.5194,
  },
  {
    id: 'rooted-kitchen',
    name: 'Rooted Kitchen',
    tags: ['Vegan', 'Vegetarian', 'Gluten Free'],
    rating: 4.8,
    reviewCount: 410,
    distanceMiles: 2.6,
    isOpenNow: true,
    latitude: 39.1355,
    longitude: -84.504,
  },
];
