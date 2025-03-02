import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, StyleSheet, View } from "react-native";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const WidthContext = React.createContext<number>(0);

const WidithProvider = WidthContext.Provider;

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const width = React.useContext(WidthContext);

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value }],
    };
  });

  const bgStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(0,255,0,${prog.value})`,
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Reanimated.View
        style={[styles.rightAction, bgStyle, { width, right: -width }]}
      >
        <MaterialCommunityIcons
          name="file-document-outline"
          size={26}
          color="white"
        />
      </Reanimated.View>
    </Reanimated.View>
  );
}

const RenderLeftActions = (
  prog: SharedValue<number>,
  drag: SharedValue<number>
) => {
  const width = React.useContext(WidthContext);

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value }],
    };
  });

  const bgStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(255,0,0,${prog.value})`,
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Reanimated.View
        style={[styles.leftAction, bgStyle, { width, left: -width }]}
      >
        <MaterialCommunityIcons name="delete-outline" size={26} color="white" />
      </Reanimated.View>
    </Reanimated.View>
  );
};

export default function Example() {
  const [width, setWidth] = React.useState(0);

  const ref = React.useRef<SwipeableMethods>(null);

  const hidden = useSharedValue(50);

  const style = useAnimatedStyle(() => {
    return {
      height: hidden.value,
    };
  });

  return (
    <WidithProvider value={width}>
      <Reanimated.View
        style={[{ overflow: "hidden" }, style]}
        onLayout={(e) => {
          setWidth(e.nativeEvent.layout.width);
        }}
      >
        <ReanimatedSwipeable
          ref={ref}
          containerStyle={styles.swipeable}
          rightThreshold={50}
          renderRightActions={RightAction}
          leftThreshold={50}
          renderLeftActions={RenderLeftActions}
          onSwipeableOpen={(dir) => {
            if (dir === "left") {
              hidden.value = withTiming(0);
            }
          }}
        >
          <Text>Swipe me!</Text>
        </ReanimatedSwipeable>
      </Reanimated.View>
    </WidithProvider>
  );
}

const styles = StyleSheet.create({
  rightAction: {
    height: 50,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  leftAction: {
    height: 50,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  swipeable: {
    height: 50,
  },
});
