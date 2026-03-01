import React from "react";
import { Canvas, Path, usePathValue } from "@shopify/react-native-skia";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { Button, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

// path.close();

type Point = {
  x: number;
  y: number;
};

const HelloWorld = () => {
  const points = useSharedValue<Point[]>([]);
  const cursorX = useSharedValue(0);

  const path = usePathValue((path) => {
    "worklet";
    path.moveTo(0, 300);
    points.get().forEach((point) => {
      path.lineTo(point.x, point.y);
    });
  });

  const cursorPath = usePathValue((path) => {
    "worklet";
    const x = cursorX.get();
    path.moveTo(x, 0);
    path.lineTo(x, 300);
  });

  const panGestureHandler = Gesture.Pan()
    .onBegin((e) => {
      cursorX.set(e.x);
    })
    .onStart((e) => {
      cursorX.set(e.x);
    })
    .onUpdate((e) => {
      cursorX.set(e.x);
    })
    .onEnd((e) => {
      cursorX.set(e.x);
    })
    .onFinalize((e) => {
      cursorX.set(withSpring(0));
    });

  return (
    <>
      <View style={{ height: 300, borderWidth: 1 }}>
        <GestureDetector gesture={panGestureHandler}>
          <Canvas style={{ flex: 1 }}>
            <Path
              path={path}
              color="lightblue"
              style={"stroke"}
              strokeWidth={2}
            />
            <Path
              path={cursorPath}
              color="red"
              style={"stroke"}
              strokeWidth={2}
            />
          </Canvas>
        </GestureDetector>
      </View>

      <Button
        title="click me"
        onPress={() => {
          points.set((prev) => {
            return [
              ...prev,
              {
                x: prev.length * 10,
                y: Math.floor(Math.random() * 300),
              },
            ];
          });
        }}
      />
    </>
  );
};

export default HelloWorld;
