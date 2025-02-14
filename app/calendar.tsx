import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable, Text, View, ScrollView } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { android_ripple, gridSize } from "@/lib/utils";
import { Grid } from "@/components/Grid";

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

const initDate = () => new Date();

const colums = 7;
const gap = 4;

export default function Page() {
  const [width, setWidth] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(initDate);

  const theme = useTheme();
  console.log(width);
  console.log(gridSize(width, colums, 1, gap));

  return (
    <ScrollView>
      <Pressable
        onPress={() => {
          setOpen(true);
        }}
        style={{
          paddingInline: theme.spacing(5),
          paddingBlock: theme.spacing(3),
        }}
        android_ripple={android_ripple(theme.palette.action.focus)}
      >
        <Text
          style={[
            theme.typography.body1,
            { color: theme.palette.text.primary, textAlign: "center" },
          ]}
        >
          {date.toLocaleString()}
        </Text>
      </Pressable>
      {open && (
        <DateTimePicker
          value={date}
          onChange={(e, val) => {
            setOpen(false);

            void e;
            if (!val) {
              return;
            }
            setDate(val);
          }}
          mode="date"
        />
      )}
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
                <Text>{new Date(i).getDate()}</Text>
              </View>
            </Grid>
          ))}
        </Grid>
      </View>
    </ScrollView>
  );
}
