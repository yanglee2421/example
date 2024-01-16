// Router Imports
import { RootRoute } from "@/router";

// React Imports
import React from "react";

// API Imports
import { QueryProvider } from "@/plugins";

// Expo Imports
import { StatusBar } from "expo-status-bar";
import Entypo from "@expo/vector-icons/Entypo";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// RN Imports
import { StyleSheet, View } from "react-native";

// Utils Imports
import { timeout, Query } from "@/utils";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontReady, setFontReady] = React.useState(false);
  const fontQueryRef = React.useRef(
    new Query(
      async () => {
        await Font.loadAsync({
          ...Entypo.font,
          "Yang-Lee": require("@/assets/fonts/Inter.ttf"),
        });
        await timeout(1000 * 3);
      },
      (error) => {
        console.error(error);
      },
      () => {
        setFontReady(true);
      }
    )
  );

  React.useEffect(() => {
    fontQueryRef.current.load();
  }, []);

  if (!fontReady) {
    return null;
  }

  return (
    <QueryProvider>
      <StatusBar style="auto"></StatusBar>
      <View
        onLayout={async () => {
          if (fontReady) {
            await SplashScreen.hideAsync();
          }
        }}
        style={styles.container}
      >
        <RootRoute></RootRoute>
      </View>
    </QueryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
