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
  const handleLayout = async () => {
    await Font.loadAsync(Entypo.font);
    await timeout(1000 * 2);
    await SplashScreen.hideAsync();
  };

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
