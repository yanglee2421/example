import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";
import Svg, { Polyline, Circle, Text, Line } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedText = Animated.createAnimatedComponent(Text);

const randomDelay = () => Math.floor(Math.random() * 1000 * 1.5);
const randomInt = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export default function Page() {
  const [width, setWidth] = React.useState(0);
  const [renderNodes, setRenderNodes] = React.useState<number[]>([]);
  const [cursor, setCursor] = React.useState(0);

  const seedRef = React.useRef(0);

  const theme = useTheme();
  const x = useSharedValue(0);

  const xProps = useAnimatedProps(() => ({
    x1: x.value,
    x2: x.value,
    stroke: withTiming(x.value ? theme.palette.error.main : "rgba(0,0,0,0)"),
  }));

  const x2Props = useAnimatedProps(() => ({
    x: x.value + 4,
    fill: withTiming(x.value ? theme.palette.error.main : "rgba(0,0,0,0)"),
  }));

  const height = 300;

  React.useEffect(() => {
    let timer: number | NodeJS.Timeout = 0;
    const update = () => {
      seedRef.current = randomInt(0, 700);
      timer = setTimeout(update, randomDelay());
    };

    update();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  React.useEffect(() => {
    let timer = 0;
    const draw = () => {
      timer = requestAnimationFrame(draw);

      setRenderNodes((prev) => {
        const val = [...prev, seedRef.current];
        return val.slice(-width);
      });
    };
    draw();

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [width, height]);

  const cursorText = Math.floor(renderNodes[Math.floor(cursor)]);

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      const idxV = e.x;
      x.value = e.x;
      runOnJS(setCursor)(idxV);
    })
    .onUpdate((e) => {
      const idxV = e.x;
      x.value = e.x;
      runOnJS(setCursor)(idxV);
    })
    .onEnd(() => {
      x.value = withSpring(0);
    })
    .onFinalize(() => {});

  return (
    <View
      style={[
        {
          paddingInline: theme.spacing(3),
        },
      ]}
    >
      <View
        style={{
          height: height,
          paddingBlockStart: 10,
        }}
        onLayout={(e) => {
          setWidth(e.nativeEvent.layout.width);
        }}
      >
        <GestureDetector gesture={gesture}>
          <Svg width={width} height={height}>
            <Polyline
              points={renderNodes
                .map((i, idx) => `${idx},${Math.floor(height * (1 - i / 700))}`)
                .join(" ")}
              fill={"none"}
              stroke={theme.palette.primary.main}
              strokeWidth={2}
            />
            <Line
              x1={0}
              y1={height}
              x2={width}
              y2={height}
              stroke={theme.palette.divider}
              strokeWidth={1}
            />
            <Line
              x1={0}
              y1={0}
              x2={0}
              y2={height}
              stroke={theme.palette.divider}
              strokeWidth={1}
            />
            <Circle
              x={0}
              y={(height / 4) * 3}
              r={5}
              fill={theme.palette.error.main}
            />

            <Text
              x={10}
              y={10}
              fill={theme.palette.text.secondary}
              textAnchor="start"
              alignmentBaseline="top"
            >
              label
            </Text>
            <AnimatedLine
              y2={height}
              y1={0}
              strokeWidth={1}
              animatedProps={xProps}
            />
            <AnimatedText
              y={Math.floor((height / 55) * 21)}
              animatedProps={x2Props}
            >
              {cursorText}
            </AnimatedText>
          </Svg>
        </GestureDetector>
      </View>
    </View>
  );
}
