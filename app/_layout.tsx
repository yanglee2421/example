import { createTheme, ThemeProvider } from "@rneui/themed";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, useColorScheme } from "react-native";
import { LocaleProvider } from "@/components/LocaleProvider";
import { QueryProvider } from "@/components/QueryProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  const colorScheme = useColorScheme();

  React.useEffect(() => {
    if (fontLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, error]);

  if (!fontLoaded && !error) {
    return null;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (fontLoaded) {
  }

  return (
    <ThemeProvider
      theme={createTheme({
        mode: colorScheme || "light",
        lightColors: {
          primary: "#3b82f6",
          error: "#ef4444",
        },
        darkColors: {
          primary: "#3b82f6",
          error: "#ef4444",
        },
        components: {
          Icon: {
            type: "material-community",
          },
          Text: { style: { fontFamily: "SpaceMono" } },
        },
      })}
    >
      <LocaleProvider>
        <QueryProvider>
          <StatusBar style="auto" />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="+not-found"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="about" />
          </Stack>
        </QueryProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
