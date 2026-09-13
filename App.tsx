import 'react-native-gesture-handler';
import { useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Lora_400Regular, Lora_700Bold } from '@expo-google-fonts/lora';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { TabNavigator } from './src/navigation/TabNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { GeneratedRecipesProvider } from './src/context/GeneratedRecipesContext';
import { NotificationsProvider } from './src/context/NotificationsContext';
import { UserProfileProvider } from './src/context/UserProfileContext';

// Keep the native splash screen visible while fonts are still downloading.
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // Once fonts are ready, hide the splash screen and reveal the app.
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <FavoritesProvider>
        <GeneratedRecipesProvider>
          <NotificationsProvider>
            <UserProfileProvider>
              <NavigationContainer>
                <TabNavigator />
              </NavigationContainer>
              <StatusBar style="dark" />
            </UserProfileProvider>
          </NotificationsProvider>
        </GeneratedRecipesProvider>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
