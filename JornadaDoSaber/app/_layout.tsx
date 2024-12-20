import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/BalooThambi2-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="tutorial/2" options={{ headerShown: false }} />
        <Stack.Screen name="tutorial/3" options={{ headerShown: false }} />
        <Stack.Screen name="tutorial/4" options={{ headerShown: false }} />
        
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="memoria/index" options={{ headerShown: false }} />
        <Stack.Screen name="memoria/jogar/index" options={{ headerShown: false }} />
        <Stack.Screen name="jogoDaVelha/index" options={{ headerShown: false }} />
        <Stack.Screen name="jogoDaVelha/jogar/index" options={{ headerShown: false }} />
        <Stack.Screen name="resultados/index" options={{ headerShown: false }} />
        <Stack.Screen name="resultados/jogoDaVelha/index" options={{ headerShown: false }} />
        <Stack.Screen name="resultados/memoria/index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
