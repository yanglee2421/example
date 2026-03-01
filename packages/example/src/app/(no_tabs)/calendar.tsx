import React from "react";
import { FlatList, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import PagerView from "react-native-pager-view";
import { gridSize } from "@/lib/utils";

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

const initFullYear = () => new Date().getFullYear();

const PagerUI = () => {
  const [width, setWidth] = React.useState(0);
  const [dates, setDate] = React.useState(initDate);
  const [fullYear] = React.useState(initFullYear);

  const theme = useTheme();

  const pages = React.useMemo(
    () =>
      dates.map((i) => {
        const date = new Date(fullYear, i);

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
            <FlatList
              data={timeToCalendar(date.getTime())}
              keyExtractor={(i) => i + ""}
              horizontal={false}
              numColumns={7}
              onContentSizeChange={(w) => {
                setWidth(w);
              }}
              style={{
                borderColor: theme.palette.divider,
                borderTopWidth: 1,
                borderStartWidth: 1,
              }}
              renderItem={(i) => (
                <View
                  key={i.index}
                  style={{
                    width: gridSize(width, 7, 1, 0),
                  }}
                >
                  <View
                    style={{
                      borderColor: theme.palette.divider,
                      borderBottomWidth: 1,
                      borderEndWidth: 1,
                    }}
                  >
                    <Cell>
                      <Text
                        style={[
                          theme.typography.body1,
                          { color: theme.palette.text.primary },
                        ]}
                      >
                        {new Date(i.item).getDate()}
                      </Text>
                    </Cell>
                  </View>
                </View>
              )}
            />
          </View>
        );
      }),
    [dates, theme, width, fullYear]
  );

  return (
    <PagerView
      initialPage={1}
      style={{ flex: 1 }}
      onPageSelected={() => {
        setDate((p) => {
          const max = Math.max(...p);
          const min = Math.min(...p);
          return [min - 1, ...p, max + 1];
        });
      }}
      offscreenPageLimit={1}
    >
      {pages}
    </PagerView>
  );
};

export default function Page() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingInline: theme.spacing(4),
          paddingBlock: theme.spacing(3),
        }}
      >
        <Text
          style={[theme.typography.h6, { color: theme.palette.text.primary }]}
        >
          Header
        </Text>
      </View>
      <PagerUI />
    </View>
  );
}
