import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AccountSettingsScreen } from '../screens/AccountSettingsScreen';
import { DietaryPreferencesScreen } from '../screens/DietaryPreferencesScreen';
import { HelpSupportScreen } from '../screens/HelpSupportScreen';

// The Profile tab's own navigation history — mirrors HomeStackNavigator /
// ExploreStackNavigator, so settings screens push on top without hiding the
// tab bar.
export type ProfileStackParamList = {
  ProfileMain: undefined;
  AccountSettings: undefined;
  DietaryPreferences: undefined;
  HelpSupport: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
      <Stack.Screen name="DietaryPreferences" component={DietaryPreferencesScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
    </Stack.Navigator>
  );
}
