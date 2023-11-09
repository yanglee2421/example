// Expo Imports
// import { useFonts } from "expo-font";

// React Imports
import React from "react";

// RN Imports
import {
  AccessibilityInfo,
  RefreshControl,
  ScrollView,
  Keyboard,
} from "react-native";

export function NotFound() {
  React.useEffect(() => {
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      (evt) => {}
    );

    const sub = Keyboard.addListener("keyboardDidShow", (evt) => {});

    fetch("", { signal: new AbortController().signal });

    return () => {
      subscription.remove();
      sub.remove();
    };
  }, []);

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing onRefresh={() => {}} />}
    ></ScrollView>
  );
}
