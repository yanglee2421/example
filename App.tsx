// Expo Imports
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";

// RN Imports
import { StyleSheet, View } from "react-native";

// Page Imports
// import { Home } from "@/pages/home";
import { Guess } from "@/pages/guess";
// import { Payment } from "@/pages/payment";

// React Imports
import React from "react";

// Utils Imports
import { timeout } from "@/utils";

// API Imports
import { QueryProvider } from "@/api/provider";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = React.useState(false);

  const handleLayout = async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  };

  React.useEffect(() => {
    if (isReady) return;

    void (async () => {
      try {
        await Font.loadAsync({
          "Yang-Lee": require("@/assets/fonts/Inter.ttf"),
          ...Entypo.font,
        });
        await timeout(1000 * 2);
      } catch (error) {
        console.error(error);
      } finally {
        setIsReady(true);
      }
    })();
  }, [isReady, setIsReady]);

  if (!isReady) {
    return <></>;
  }

  return (
    <QueryProvider>
      <View onLayout={handleLayout} style={styles.container}>
        <StatusBar style="auto" />
        {/* <Home /> */}
        <Guess />
        {/* <Payment /> */}
      </View>
    </QueryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
