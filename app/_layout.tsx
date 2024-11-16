import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { QueryProvider } from "@/components/QueryProvider";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations.js";
import { db } from "@/db/db";
import { useSyncLocale } from "@/hooks/useSyncLocale";
import { ErrorScreen } from "@/components/ErrorScreen";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useTheme } from "@rneui/themed";
import { useStorageHasHydrated } from "@/hooks/useStorageStore";

SplashScreen.preventAutoHideAsync();

const fontUri = require("@/assets/fonts/SpaceMono-Regular.ttf");

export default function RootLayout() {
  useSyncLocale();
  const hasHydrated = useStorageHasHydrated();
  const dbState = useMigrations(db, migrations);
  const [fontLoaded, error] = useFonts({ SpaceMono: fontUri });

  React.useEffect(() => {
    if (fontLoaded || error || dbState.error || dbState.success) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, error, dbState.error, dbState.success]);

  if (error || dbState.error) {
    return <ErrorScreen />;
  }

  return hasHydrated && fontLoaded && dbState.success && (
    <QueryProvider>
      <ThemeProvider>
        <StatusBar style="auto" />
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
      <Stack.Screen name="network" options={{ title: "Network" }} />
      <Stack.Screen name="news" options={{ title: "News" }} />
      <Stack.Screen name="qrcode" options={{ title: "QR Code Scaner" }} />
      <Stack.Screen
        name="todolist"
        options={{ title: "To Do List" }}
      />
    </Stack>
  );
}
