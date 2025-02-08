import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";
import Svg, { Polyline, Circle, Text, Line } from "react-native-svg";

const randomDelay = () => Math.floor(Math.random() * 1000 * 1.5);
const randomInt = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export default function Page() {
  const [width, setWidth] = React.useState(0);
  const [renderNodes, setRenderNodes] = React.useState<number[]>([]);

  const seedRef = React.useRef(0);

  const theme = useTheme();

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
          // borderWidth: 1,
          // borderColor: theme.palette.divider,
          height: height,
        }}
        onLayout={(e) => {
          setWidth(e.nativeEvent.layout.width);
        }}
      >
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
            y={height - 100}
            r={5}
            fill={theme.palette.error.main}
          />

          <Text x={10} y={height - 10} fill={theme.palette.text.secondary}>
            label
          </Text>
        </Svg>
      </View>
    </View>
  );
}
