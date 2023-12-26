// Expo Imports
import { timeout } from "@/utils";
import { useFonts } from "expo-font";

// React Imports
import React from "react";

// RN Imports
import {
  AccessibilityInfo,
  RefreshControl,
  ScrollView,
  Keyboard,
  Text,
  StyleSheet,
} from "react-native";

export function NotFound() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [fontReady, error] = useFonts({
    CustomFont: require("@/assets/fonts/Inter.ttf"),
  });

  React.useEffect(() => {
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      (evt) => {}
    );

    const sub = Keyboard.addListener("keyboardDidShow", (evt) => {});

    return () => {
      subscription.remove();
      sub.remove();
    };
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            await timeout(1000 * 2);
            setRefreshing(false);
          }}
        />
      }
      style={styles.container}
    >
      <Text style={{ fontFamily: fontReady ? "CustomFont" : void 0 }}>
        Hello fonts
      </Text>
      {error && <Text>{error.message}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
});
