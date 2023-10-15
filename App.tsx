// Expo Imports
import { StatusBar } from "expo-status-bar";
import SplashScreen from "expo-splash-screen";
import Font from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";

// RN Imports
import { StyleSheet, View } from "react-native";

// Page Imports
import { Home } from "@/pages/home";

// React Imports
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  React.useEffect(() => {
    void (async () => {
      try {
        await Font.loadAsync(Entypo.font);
      } catch (error) {
        console.error(error);
      } finally {
        setIsReady(true);
      }
    })();
  }, [setIsReady]);

  const handleLayout = async () => {
    if (!isReady) return;
    await SplashScreen.hideAsync();
  };

  return (
    <View onLayout={handleLayout} style={styles.container}>
      <StatusBar style="auto" />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
