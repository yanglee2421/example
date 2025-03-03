import { useTheme } from "@/hooks/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Button, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { minmax } from "@/lib/worklet";

type CollapseProps = React.PropsWithChildren<{
  open: boolean;
}>;

const Collapse = (props: CollapseProps) => {
  const height = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    height: withTiming(height.value * Number(props.open)),
  }));

  return (
    <Animated.View style={[{ overflow: "hidden" }, style]}>
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={{ position: "absolute", width: "100%" }}
      >
        {props.children}
      </View>
    </Animated.View>
  );
};

const Swiper = () => {
  const theme = useTheme();
  const width = useSharedValue(0);
  const activeIndex = useSharedValue(1);
  const startX = useSharedValue(0);
  const translateX = useSharedValue(0);
  const alpha = useSharedValue(0);
  const translateXstyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: alpha.value + 0.3,
  }));

  const panGestureHandler = Gesture.Pan()
    .onBegin(() => {
      startX.value = translateX.value;
    })
    .onStart((e) => {
      translateX.value = startX.value + e.translationX;
      alpha.value = minmax(Math.abs(e.translationX) / 150 - 0.3, 0, 1);
    })
    .onUpdate((e) => {
      translateX.value = startX.value + e.translationX;
      alpha.value = minmax(Math.abs(e.translationX) / 150 - 0.3, 0, 1);
    })
    .onEnd((e) => {
      translateX.value = startX.value + e.translationX;
      alpha.value = minmax(Math.abs(e.translationX) / 150 - 0.3, 0, 1);
    })
    .onFinalize((e) => {
      // To Right
      if (e.translationX > 50) {
        activeIndex.value = minmax(activeIndex.value - 1, 0, 2);
      }

      // To Left
      if (e.translationX < -50) {
        activeIndex.value = minmax(activeIndex.value + 1, 0, 2);
      }

      translateX.value = withTiming(-activeIndex.value * width.value);
    });

  return (
    <GestureDetector gesture={panGestureHandler}>
      <Animated.View
        style={[
          {
            flexDirection: "row",
            alignItems: "stretch",

            width: "100%",
          },
          translateXstyle,
        ]}
        onLayout={(e) => {
          const containerWidth = e.nativeEvent.layout.width;
          width.value = containerWidth;
          translateX.value = -activeIndex.value * containerWidth;
        }}
      >
        <Animated.View
          style={[
            {
              width: "100%",
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: "auto",

              padding: theme.spacing(3),

              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: theme.spacing(3),

              backgroundColor: theme.palette.success.main,
            },
            opacityStyle,
          ]}
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
        </Animated.View>
        <View
          style={[
            {
              width: "100%",
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: "auto",

              padding: theme.spacing(3),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",

              backgroundColor: theme.palette.info.main,
            },
          ]}
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
        <Animated.View
          style={[
            {
              width: "100%",
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: "auto",

              padding: theme.spacing(3),

              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: theme.spacing(3),

              backgroundColor: theme.palette.error.main,
            },
            opacityStyle,
          ]}
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
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default function Example() {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <View style={[]}>
        <Collapse open={open}>
          <Swiper />
        </Collapse>
      </View>
      <View style={{ marginTop: theme.spacing(3) }}>
        <Button
          onPress={() => {
            setOpen((prev) => !prev);
          }}
          title="Show/Hidden"
        />
      </View>
    </View>
  );
}
