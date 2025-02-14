import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  measure,
  useAnimatedRef,
  withTiming,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  ball: {
    flex: 1,
  },
});

export default function Page() {
  const viewRef = useAnimatedRef<View>();

  const x = useSharedValue(0);
  const startX = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: "red",
      transform: [
        {
          translateX: x.value,
        },
      ],
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {})
    .onUpdate((e) => {
      x.value = e.translationX + startX.value;
    })
    .onEnd(() => {})
    .onFinalize((e) => {
      const width = measure(viewRef)?.width!;

      if (Math.abs(e.translationX) * 2 < width) {
        x.value = withTiming(startX.value);
        return;
      }

      // Right
      if (e.translationX > 0 && startX.value < width) {
        startX.value += width;
      }

      // Left
      if (e.translationX < 0 && startX.value > -width) {
        startX.value -= width;
      }

      x.value = withTiming(startX.value);
    });

  return (
    <GestureDetector gesture={gesture}>
      <View ref={viewRef} style={{ flex: 1 }}>
        <Animated.View style={[styles.ball, animatedStyles]} />
      </View>
    </GestureDetector>
  );
}
