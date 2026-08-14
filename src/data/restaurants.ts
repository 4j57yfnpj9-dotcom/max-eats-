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
  image?: ImageSourcePropType;
};

export const restaurants: Restaurant[] = [
  {
    id: 'green-acres',
    name: 'Green Acres',
    tags: ['Vegetarian', 'Vegan', 'Organic'],
    rating: 4.7,
    reviewCount: 320,
    distanceMiles: 0.8,
    isOpenNow: true,
  },
  {
    id: 'the-kind-bowl',
    name: 'The Kind Bowl',
    tags: ['Vegan', 'Gluten Free'],
    rating: 4.6,
    reviewCount: 198,
    distanceMiles: 1.2,
    isOpenNow: true,
  },
  {
    id: 'plantitude',
    name: 'Plantitude',
    tags: ['Vegetarian', 'Organic'],
    rating: 4.5,
    reviewCount: 256,
    distanceMiles: 1.5,
    isOpenNow: false,
  },
  {
    id: 'sprout-cafe',
    name: 'Sprout Café',
    tags: ['Vegan', 'Organic'],
    rating: 4.6,
    reviewCount: 142,
    distanceMiles: 1.9,
    isOpenNow: true,
  },
  {
    id: 'harvest-table',
    name: 'Harvest Table',
    tags: ['Vegetarian', 'Gluten Free', 'Organic'],
    rating: 4.4,
    reviewCount: 301,
    distanceMiles: 2.3,
    isOpenNow: false,
  },
  {
    id: 'rooted-kitchen',
    name: 'Rooted Kitchen',
    tags: ['Vegan', 'Vegetarian', 'Gluten Free'],
    rating: 4.8,
    reviewCount: 410,
    distanceMiles: 2.6,
    isOpenNow: true,
  },
];
