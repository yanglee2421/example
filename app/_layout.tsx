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
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  fade: true,
  duration: 1000 * 0.2,
});

const RootUI = () => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.palette.background.default }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.palette.background.default },
          }}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const RootLayout = () => {
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
        <ThemeProvider>
          <RootUI />
        </ThemeProvider>
      </QueryProvider>
    )
  );
};

const Layout = () => {
  return <RootLayout />;
};

export default Layout;
