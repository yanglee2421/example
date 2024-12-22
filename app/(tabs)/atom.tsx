import { useThemeStore } from "@/hooks/useThemeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  useAnimatedValue,
  View,
} from "react-native";

export default function Page() {
  const rotateValue = useAnimatedValue(0);
  const theme = useThemeStore((s) => s.theme);

  React.useEffect(() => {
    const startRotation = () => {
      rotateValue.setValue(0);
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 1000 * 12,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };
    startRotation();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.iconWrapper}>
      <Animated.View style={[styles.icon, { transform: [{ rotate }] }]}>
        <MaterialCommunityIcons
          name="react"
          size={96}
          color={theme.palette.text.icon}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: "transparent",

    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    borderWidth: 0,
  },
});
