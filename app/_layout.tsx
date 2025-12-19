import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { db } from "@/db/db";
import { useTheme } from "@/hooks/useTheme";
import migrations from "@/drizzle/migrations.js";
import { QueryProvider } from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useStorageHasHydrated } from "@/hooks/useStorageStore";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  fade: true,
  duration: 1000 * 0.2,
});

const RootLayout = (props: React.PropsWithChildren) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.palette.background.default }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        {props.children}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const AppRouter = () => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.palette.background.default },
      }}
    />
  );
};

const calculateLoadingProgress = (
  migrations: {
    success: boolean;
    error?: Error;
  },
  [fontLoaded, fontError]: [boolean, Error | null],
  hasHydrated: boolean,
) => {
  const error = migrations.error || fontError;
  const isSuccess = migrations.success && fontLoaded;

  if (error) {
    return { isError: true, error };
  }

  if (isSuccess) {
    return { isSuccess: true };
  }

  return { isPending: !hasHydrated };
};

const App = () => {
  const hasHydrated = useStorageHasHydrated();
  const migrationState = useMigrations(db, migrations);
  const fontsState = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  const loadingProgress = calculateLoadingProgress(
    migrationState,
    fontsState,
    hasHydrated,
  );

  React.useEffect(() => {
    if (loadingProgress.isPending) return;
    SplashScreen.hideAsync();
  }, [loadingProgress.isPending]);

  if (loadingProgress.isPending) {
    return null;
  }

  if (loadingProgress.isError) {
    return (
      <View>
        <Text>Error loading app: {loadingProgress.error.message}</Text>
      </View>
    );
  }

  return (
    <QueryProvider>
      <ThemeProvider>
        <StatusBar />
        <RootLayout>
          <AppRouter />
        </RootLayout>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
