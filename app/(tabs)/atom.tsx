import { useTheme } from "@/hooks/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function Page() {
  const theme = useTheme();
  const rotateValue = useSharedValue(0);
  const rotateStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: interpolate(rotateValue.value, [0, 1], [0, 360]) + "deg" },
    ],
  }));

  React.useEffect(() => {
    rotateValue.value = withRepeat(
      withTiming(1, {
        duration: 1000 * 6,
        easing: Easing.linear,
      }),
      -1
    );
  }, [rotateValue]);

  return (
    <View style={styles.iconWrapper}>
      <Animated.View style={[styles.icon, rotateStyle]}>
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
