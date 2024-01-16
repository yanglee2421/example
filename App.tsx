// Router Imports
import { RootRoute } from "@/router";

// React Imports
import React from "react";

// Plugin Imports
import { QueryProvider } from "@/plugins";

// Expo Imports
import { StatusBar } from "expo-status-bar";
import Entypo from "@expo/vector-icons/Entypo";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// RN Imports
import { StyleSheet, View } from "react-native";

// Utils Imports
import { timeout } from "@/utils";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontReady, setFontReady] = React.useState(false);

  React.useEffect(() => {
    if (fontReady) {
      return;
    }

    void (async () => {
      await Font.loadAsync(Entypo.font);
      await timeout(1000 * 3);

      setFontReady(true);
    })();
  }, [fontReady]);

  return (
    fontReady && (
      <QueryProvider>
        <StatusBar style="auto"></StatusBar>
        <View onLayout={SplashScreen.hideAsync} style={styles.container}>
          <RootRoute></RootRoute>
        </View>
      </QueryProvider>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
