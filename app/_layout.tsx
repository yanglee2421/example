import React from "react";
import { useTheme } from "@rneui/themed";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "@/db/db";
import migrations from "@/drizzle/migrations.js";
import { useStorageHasHydrated } from "@/hooks/useStorageStore";
import { ErrorScreen } from "@/components/ErrorScreen";
import { QueryProvider } from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

SplashScreen.preventAutoHideAsync();

const fontUri = require("@/assets/fonts/SpaceMono-Regular.ttf");

export default function RootLayout() {
  const hasHydrated = useStorageHasHydrated();
  const dbState = useMigrations(db, migrations);
  const [fontLoaded, error] = useFonts({ SpaceMono: fontUri });

  React.useEffect(() => {
    // Load Failed
    if (dbState.error || dbState.success) {
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
    return <ErrorScreen />;
  }

  return hasHydrated && fontLoaded && dbState.success && (
    <QueryProvider>
      <ThemeProvider>
        <RootRoute />
      </ThemeProvider>
    </QueryProvider>
  );
}

function RootRoute() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTintColor: theme.colors.black,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="+not-found"
        options={{ title: "Not Found" }}
      />
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
      <Stack.Screen
        name="todolist"
        options={{ title: "To Do List" }}
      />
    </Stack>
  );
}
