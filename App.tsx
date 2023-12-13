// Router Imports
import { RootRoute } from "@/router";

// React Imports
import React from "react";

// API Imports
import { QueryProvider } from "@/api/provider";

// Expo Imports
import { StatusBar } from "expo-status-bar";
import Entypo from "@expo/vector-icons/Entypo";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// RN Imports
import { StyleSheet, View, Text, Button } from "react-native";

// Utils Imports
import { timeout } from "@/utils";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontReady, setFontReady] = React.useState(false);
  const pendingRef = React.useRef(false);

  const handleLayout = async () => {
    if (fontReady) {
      await SplashScreen.hideAsync();
    }
  };

  React.useEffect(() => {
    if (pendingRef.current) {
      return;
    }

    void (async () => {
      pendingRef.current = true;
      setFontReady(false);

      await Font.loadAsync({
        ...Entypo.font,
        "Yang-Lee": require("@/assets/fonts/Inter.ttf"),
      });
      await timeout(1000 * 3);

      pendingRef.current = false;
      setFontReady(true);
    })();
  }, [pendingRef, setFontReady]);

  if (!fontReady) {
    return <></>;
  }

  return (
    <QueryProvider>
      <StatusBar style="auto" />
      <View onLayout={handleLayout} style={styles.container}>
        <RootRoute />
      </View>
    </QueryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
