import { useTheme } from "@/hooks/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import Animated, {
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export default function Example() {
  const theme = useTheme();

  const ref = useAnimatedRef();
  const hidden = useSharedValue(false);
  const height = useSharedValue(50);
  const translateX = useSharedValue(0);
  const translateXstyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    height: height.value,
  }));
  const overflowStyle = useAnimatedStyle(() => ({
    overflow: hidden.value ? "hidden" : "visible",
  }));

  const panGestureHandler = Gesture.Pan()
    .onBegin((e) => {})
    .onStart((e) => {
      translateX.value = e.translationX;
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      translateX.value = e.translationX;
    })
    .onFinalize((e) => {
      if (Math.abs(e.translationX) < 50) {
        translateX.value = withTiming(0);
        return;
      }

      const size = measure(ref);

      if (!size) return;

      if (e.translationX > 50) {
        translateX.value = withTiming(size.width, {}, () => {
          hidden.value = true;
          height.value = withTiming(0);
        });
      }

      if (e.translationX < -50) {
        translateX.value = withTiming(-size.width, {}, () => {
          hidden.value = true;
          height.value = withTiming(0);
        });
      }
    });

  return (
    <GestureDetector gesture={panGestureHandler}>
      <Animated.View ref={ref} style={[translateXstyle]}>
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: "-100%",

              width: "100%",
              height: "100%",
            },
            overflowStyle,
          ]}
        >
          <View
            style={{
              padding: theme.spacing(3),

              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: theme.spacing(3),

              backgroundColor: theme.palette.success.main,
              borderWidth: 1,
              borderColor: "transparent",
            }}
          >
            <Text
              style={[
                theme.typography.body1,
                { color: theme.palette.success.contrastText },
              ]}
            >
              Left
            </Text>
            <MaterialCommunityIcons
              name="archive-outline"
              size={28}
              color={theme.palette.success.contrastText}
            />
          </View>
        </Animated.View>
        <View
          style={[
            {
              width: "100%",
              height: "100%",
            },
          ]}
        >
          <View
            style={{
              padding: theme.spacing(3),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",

              backgroundColor: theme.palette.info.main,
              borderWidth: 1,
              borderColor: "transparent",
            }}
          >
            <Text
              style={[
                theme.typography.body1,
                { color: theme.palette.info.contrastText },
              ]}
            >
              Center
            </Text>
          </View>
        </View>
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: "100%",

              width: "100%",
              height: "100%",

              overflow: "hidden",
            },
            overflowStyle,
          ]}
        >
          <View
            style={{
              padding: theme.spacing(3),

              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: theme.spacing(3),

              backgroundColor: theme.palette.error.main,
              borderWidth: 1,
              borderColor: "transparent",
            }}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={28}
              color={theme.palette.error.contrastText}
            />
            <Text
              style={[
                theme.typography.body1,
                { color: theme.palette.error.contrastText },
              ]}
            >
              Right
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
