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
  useAnimatedRef,
  useFrameCallback,
  measure,
  useDerivedValue,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedPolyline = Animated.createAnimatedComponent(Polyline);

const randomDelay = () => Math.floor(Math.random() * 1000 * 1.5);
const randomInt = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const height = 300;

export default function Page() {
  const [width, setWidth] = React.useState(0);
  const [cursorText, setCursorText] = React.useState("");

  const theme = useTheme();
  const seed = useSharedValue(0);
  const cursorX = useSharedValue(0);
  const renderNodes = useSharedValue<number[]>([]);
  const svgRef = useAnimatedRef<Svg>();

  const points = useDerivedValue(() =>
    renderNodes.value
      .map((i, idx) => `${idx},${Math.floor(height * (1 - i / 700))}`)
      .join(" ")
  );

  const polylineProps = useAnimatedProps(() => ({
    points: points.value,
  }));

  const cursorXProps = useAnimatedProps(() => ({
    x1: cursorX.value,
    x2: cursorX.value,
    strokeWidth: cursorX.value ? 1 : 0,
  }));

  const cursorTextProps = useAnimatedProps(() => ({
    x: cursorX.value + 4,
    fill: withTiming(
      cursorX.value ? theme.palette.error.main : "rgba(0,0,0,0)"
    ),
  }));

  useFrameCallback(() => {
    const xSize = measure(svgRef)?.width;
    if (!xSize) return;

    renderNodes.value = [...renderNodes.value, seed.value].slice(-xSize);

    runOnJS(setCursorText)(
      Math.floor(renderNodes.value[Math.floor(cursorX.value)]) + ""
    );
  });

  React.useEffect(() => {
    let timer: number | NodeJS.Timeout = 0;
    const update = () => {
      seed.value = randomInt(50, 700);
      timer = setTimeout(update, randomDelay());
    };

    update();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      cursorX.value = e.x;
    })
    .onUpdate((e) => {
      cursorX.value = e.x;
    })
    .onEnd((e) => {
      cursorX.value = e.x;
    })
    .onFinalize(() => {
      cursorX.value = withSpring(0);
    });

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
          <Svg ref={svgRef} height={height} width={width}>
            <AnimatedPolyline
              fill={"none"}
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              animatedProps={polylineProps}
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
              stroke={theme.palette.error.main}
              animatedProps={cursorXProps}
            />
            <AnimatedText y={24} animatedProps={cursorTextProps}>
              {cursorText}
            </AnimatedText>
          </Svg>
        </GestureDetector>
      </View>
    </View>
  );
}
