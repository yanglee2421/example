import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Grid } from "@/components/Grid";
import PagerView from "react-native-pager-view";

type CellProps = React.PropsWithChildren;

const Cell = (props: CellProps) => {
  const [size, setSize] = React.useState(0);

  return (
    <View
      onLayout={(e) => {
        setSize(e.nativeEvent.layout.width);
      }}
      style={{
        height: Math.floor(size),

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </View>
  );
};

function timeToCalendar(time: number) {
  const monthStartTime = new Date(time).setDate(1);
  const monthStartIndex = new Date(monthStartTime).getDay();
  const calendarStartTime = monthStartTime - monthStartIndex * dayInterval;
  const calendar = [];

  for (let i = 0; i < 42; i++) {
    calendar.push(calendarStartTime + i * dayInterval);
  }

  return calendar;
}

const dayInterval = 1000 * 60 * 60 * 24;

const initDate = () => {
  const month = new Date().getMonth();
  return [month - 1, month, month + 1];
};

export default function Page() {
  const [dates, setDate] = React.useState(initDate);

  const page = React.useRef(1);

  const theme = useTheme();

  return (
    <PagerView
      initialPage={1}
      style={{ flex: 1 }}
      onPageSelected={(e) => {
        const next = e.nativeEvent.position;
        const current = page.current;

        if (next > current) {
          setDate((p) => [...p, Math.max(...p) + 1]);
        }
        if (next < current) {
          setDate((p) => [Math.min(...p) - 1, ...p]);
        }

        page.current = next;
      }}
      offscreenPageLimit={1}
    >
      {dates.map((i) => {
        const date = new Date(2025, i);

        return (
          <View key={i}>
            <Text
              style={[
                theme.typography.h2,
                { color: theme.palette.text.primary },
              ]}
            >
              {date.toLocaleDateString()}
            </Text>
            <View
              style={{
                borderTopWidth: 1,
                borderStartWidth: 1,
                borderColor: theme.palette.divider,
              }}
            >
              <Grid container columns={7}>
                {timeToCalendar(date.getTime()).map((i) => (
                  <Grid key={i}>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderEndWidth: 1,
                        borderColor: theme.palette.divider,
                      }}
                    >
                      <Cell>
                        <Text
                          style={[
                            theme.typography.body1,
                            { color: theme.palette.text.primary },
                          ]}
                        >
                          {new Date(i).getDate()}
                        </Text>
                      </Cell>
                    </View>
                  </Grid>
                ))}
              </Grid>
            </View>
          </View>
        );
      })}
    </PagerView>
  );
}
