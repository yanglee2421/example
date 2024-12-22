import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable, Text } from "react-native";
import { useThemeStore } from "@/hooks/useThemeStore";
import { android_ripple } from "@/lib/utils";

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const theme = useThemeStore((s) => s.theme);
  const [date, setDate] = React.useState(() => new Date());

  return (
    <>
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
          Select Date
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
    </>
  );
}
