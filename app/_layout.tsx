import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { View } from "react-native";
import React from "react";
import { db } from "@/db/db";
import migrations from "@/drizzle/migrations.js";
import { QueryProvider } from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useStorageHasHydrated } from "@/hooks/useStorageStore";
import { useTheme } from "@/hooks/useTheme";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  fade: true,
  duration: 1000 * 0.2,
});

const RootRoute = () => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTintColor: theme.palette.primary.main,
        headerStyle: {
          backgroundColor: theme.palette.background.paper,
        },
        headerTitleStyle: {
          color: theme.palette.text.primary,
          fontFamily: theme.typography.body1.fontFamily,
        },

        contentStyle: {
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
      <Stack.Screen name="bing" options={{ title: "Bing" }} />
      <Stack.Screen name="fengjing" options={{ title: "Landscape" }} />
      <Stack.Screen name="history" options={{ title: "History" }} />
      <Stack.Screen name="joke" options={{ title: "Joke" }} />
      <Stack.Screen name="locking_dog" options={{ title: "Locking Dog" }} />
      <Stack.Screen name="movie" options={{ title: "Movie" }} />
      <Stack.Screen name="network" options={{ title: "Network" }} />
      <Stack.Screen name="news" options={{ title: "News" }} />
      <Stack.Screen name="qrcode" options={{ title: "QR Code Scaner" }} />
      <Stack.Screen name="randtext" options={{ title: "Rand Text" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="todolist" options={{ title: "To Do List" }} />
      <Stack.Screen name="lab" options={{ title: "Lab" }} />
      <Stack.Screen name="calendar" options={{ title: "Calendar" }} />
      <Stack.Screen name="chat/[id]" options={{ title: "Chat" }} />
    </Stack>
  );
};

export default function RootLayout() {
  const hasHydrated = useStorageHasHydrated();
  const dbState = useMigrations(db, migrations);
  const [fontLoaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  React.useEffect(() => {
    // Load Failed
    if (dbState.error || error) {
      SplashScreen.hideAsync();
      return;
    }

    // Load Successfully
    if (hasHydrated && fontLoaded && dbState.success) {
      SplashScreen.hideAsync();
      return;
    }
  }, [fontLoaded, error, dbState.error, dbState.success, hasHydrated]);

  if (error || dbState.error) {
    return <View></View>;
  }

  return (
    hasHydrated &&
    fontLoaded &&
    dbState.success && (
      <QueryProvider>
        <StatusBar />
        <ThemeProvider>
          <GestureHandlerRootView>
            <RootRoute />
          </GestureHandlerRootView>
        </ThemeProvider>
      </QueryProvider>
    )
  );
}
