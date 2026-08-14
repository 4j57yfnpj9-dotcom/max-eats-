import { ImageSourcePropType } from 'react-native';

// Local stand-in for an authenticated user until real auth/backend exists.
export type UserProfile = {
  name: string;
  email: string;
  image?: ImageSourcePropType;
};

export const currentUser: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
};
