import { useTheme } from "@/hooks/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";

const styles = StyleSheet.create({
  leftAction: {
    left: "-100%",

    width: "100%",

    padding: 10,

    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const RenderLeftActions = (
  prog: SharedValue<number>,
  drag: SharedValue<number>
) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value }],
      backgroundColor: `rgba(255,0,0,${prog.value})`,
    };
  });

  return (
    <Animated.View style={[styleAnimation, styles.leftAction]}>
      <MaterialCommunityIcons name="delete-outline" size={26} color="white" />
    </Animated.View>
  );
};

type SwipeToDeleteProps = React.PropsWithChildren<{
  onDelete?: () => void;
}>;

const SwipeToDelete = (props: SwipeToDeleteProps) => {
  const ref = React.useRef<SwipeableMethods>(null);

  const height = useSharedValue(50);
  const style = useAnimatedStyle(() => ({
    height: withTiming(height.value),
  }));

  return (
    <ReanimatedSwipeable
      ref={ref}
      leftThreshold={50}
      renderLeftActions={RenderLeftActions}
      onSwipeableOpen={(dir) => {
        if (dir === "left") {
          height.value = 0;
          props.onDelete?.();
        }
      }}
      onSwipeableWillOpen={(dir) => {
        if (dir === "right") {
          ref.current?.close();
        }
      }}
      containerStyle={[{ overflow: "hidden" }, style]}
    >
      {props.children}
    </ReanimatedSwipeable>
  );
};

export default function Example() {
  const theme = useTheme();

  const width = useSharedValue(0);

  return (
    <>
      <Animated.View
        style={{ width, backgroundColor: "blue", height: 30 }}
      ></Animated.View>
      <Button
        onPress={() => {
          width.value = withTiming(width.value + 20);
        }}
        title="press"
      />
      <SwipeToDelete
        onDelete={() => {
          console.log("deleted");
        }}
      >
        <View
          style={{
            padding: 10,
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
            borderWidth: 1,
          }}
        >
          <Text
            style={[
              theme.typography.body1,
              { color: theme.palette.text.primary },
            ]}
          >
            asdasd
          </Text>
        </View>
      </SwipeToDelete>
    </>
  );
}
