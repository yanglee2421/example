import { useStorageStore } from "@/hooks/useStorageStore";
import React from "react";
import { Animated, PanResponder, View } from "react-native";

export default function Page() {
  const theme = useStorageStore((s) => s.theme);
  const [pan] = React.useState(() =>
    new Animated.ValueXY({ x: 0, y: 0 }, { useNativeDriver: true })
  );
  const [panResponder] = React.useState(() =>
    PanResponder.create({
      onMoveShouldSetPanResponder() {
        return true;
      },
      onPanResponderMove(e, gestureState) {
        const handler = Animated.event([null, { dx: pan.x, dy: pan.y }]);

        handler(e, gestureState);
      },
      onPanResponderRelease() {
        pan.extractOffset();
      },
    })
  );

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }, {
          backgroundColor: theme.palette.primary.main,

          width: 100,
          height: 100,
        }, theme.shape]}
      >
      </Animated.View>
    </View>
  );
}
