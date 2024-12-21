import { useStorageStore } from "@/hooks/useStorageStore";
import { android_ripple } from "@/lib/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function Page() {
  const [show, setShow] = React.useState(false);
  const [date, setDate] = React.useState<Date>(() => new Date());
  const theme = useStorageStore((s) => s.theme);

  return (
    <View>
      <Text
        style={[theme.typography.h5, { color: theme.palette.text.primary }]}
      >
        {date.toLocaleString()}
      </Text>
      <Pressable
        onPress={() => setShow(true)}
        android_ripple={android_ripple(theme.palette.action.focus)}
      >
        <Text
          style={[
            theme.typography.button,
            { color: theme.palette.primary.main },
          ]}
        >
          pick date
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={date}
          onChange={(e, val) => {
            void e;
            val && setDate(val);
            setShow(false);
          }}
          mode="date"
          is24Hour
          accentColor={"red"}
        />
      )}
    </View>
  );
}
