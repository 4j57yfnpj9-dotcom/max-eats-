import { createBottomTabNavigator, BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { HomeStackNavigator, HomeStackParamList } from './HomeStackNavigator';
import { FindRestaurantsScreen } from '../screens/FindRestaurantsScreen';
import { SavedScreen } from '../screens/SavedScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AddMealScreen } from '../screens/AddMealScreen';
import { lightTheme, fontFamily } from '../theme';

// Lets screens outside the Home stack (e.g. Saved) navigate into it —
// `navigation.navigate('Home', { screen: 'RecipeDetail', params: {...} })`.
export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Explore: undefined;
  Add: undefined;
  Saved: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

// Overrides the default tab button entirely for the center "+" — it needs to
// look raised above the bar, not sit inline with the other four tabs.
function FloatingAddButton({ onPress }: BottomTabBarButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.addButtonWrap}>
      <View style={styles.addButton}>
        <Ionicons name="add" size={28} color={lightTheme.card} />
      </View>
    </Pressable>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: lightTheme.accent,
        tabBarInactiveTintColor: lightTheme.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={FindRestaurantsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddMealScreen}
        options={{
          tabBarLabel: () => null,
          tabBarButton: (props) => <FloatingAddButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'bookmark' : 'bookmark-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: lightTheme.card,
    borderTopWidth: 0,
    height: 68,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabLabel: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: 11,
  },
  addButtonWrap: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: lightTheme.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
});
