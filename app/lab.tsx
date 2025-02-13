import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  measure,
  useAnimatedRef,
  withTiming,
} from "react-native-reanimated";
import { minmax } from "@/lib/worklet";

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});

export default function Page() {
  const viewRef = useAnimatedRef<View>();

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const theme = useTheme();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.1 : 1) },
      ],
      backgroundColor: isPressed.value
        ? theme.palette.action.active
        : theme.palette.primary.main,
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      const size = measure(viewRef)!;

      offset.value = {
        x: minmax(e.translationX + start.value.x, 0, size.width - 100),
        y: minmax(e.translationY + start.value.y, 0, size.height - 100),
      };
    })
    .onEnd(() => {
      offset.value = withTiming({
        x: start.value.x,
        y: start.value.y,
      });
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  return (
    <View ref={viewRef} style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.ball, animatedStyles]} />
      </GestureDetector>
    </View>
  );
}
