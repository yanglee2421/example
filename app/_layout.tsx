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

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useSyncLocale();
  const dbState = useMigrations(db, migrations);
  const [fontLoaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  React.useEffect(() => {
    if (fontLoaded || error || dbState.error || dbState.success) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, error, dbState.error, dbState.success]);

  if (error || dbState.error) {
    return <ErrorScreen />;
  }

  return fontLoaded && dbState.success && (
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
      <Stack.Screen name="about" />
      <Stack.Screen
        name="todolist"
        options={{
          title: "To Do List",
        }}
      />
    </Stack>
  );
}
