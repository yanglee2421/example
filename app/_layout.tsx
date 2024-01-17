// Expo Imports
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// React Imports
import React from "react";

// RN Imports
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

// Providers Imports
import { QueryProvider } from "@/plugins";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const colorScheme = useColorScheme();

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    if (error) {
      throw error;
    }
  }, [loaded, error]);

  return (
    loaded && (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryProvider>
          <RootRoute></RootRoute>
        </QueryProvider>
      </ThemeProvider>
    )
  );
}

function RootRoute() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal" }}
      ></Stack.Screen>
    </Stack>
  );
}
