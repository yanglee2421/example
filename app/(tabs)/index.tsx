import { useStorageStore } from "@/hooks/useStorageStore";
import { android_ripple } from "@/lib/utils";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React from "react";
import { View, Pressable, Text } from "react-native";

export default function Page() {
  const [date, setDate] = React.useState(() => new Date());
  const theme = useStorageStore((s) => s.theme);

  return (
    <View>
      <Text
        style={[theme.typography.h5, { color: theme.palette.text.primary }]}
      >
        {date.toLocaleString()}
      </Text>
      <Pressable
        onPress={() => {
          DateTimePickerAndroid.open({
            value: date,
            onChange(e, val) {
              val && setDate(val);
              void e;
            },
            mode: "time",
            is24Hour: true,
          });
        }}
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
    </View>
  );
}
