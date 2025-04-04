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
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  fade: true,
  duration: 1000 * 0.2,
});

const RootRoute = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
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
