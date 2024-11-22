import React from "react";
import { useStorageStore } from "@/hooks/useStorageStore";
import { Pressable, Text, TextInput, View } from "react-native";

export function NeedAPIKEY() {
  const set = useStorageStore((s) => s.set);
  const [value, setValue] = React.useState("");
  const theme = useStorageStore((s) => s.theme);

  return (
    <View
      style={{
        margin: 16,
        borderWidth: 1,
        borderColor: theme.palette.divider,
        padding: 12,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Text
        style={{
          color: theme.palette.text.primary,
          fontSize: theme.typography.body1.fontSize,
          lineHeight: theme.typography.body1.lineHeight,
        }}
      >
        Need API Key
      </Text>
      <View>
        <TextInput value={value} onChangeText={setValue} />
      </View>
      <Pressable
        onPress={() =>
          set((d) => {
            d.qqlykmKey = value;
          })}
        style={{
          backgroundColor: theme.palette.primary.main,

          padding: 16,
          paddingBlock: 8,

          borderRadius: theme.shape.borderRadius,
        }}
        android_ripple={{
          color: theme.palette.action.hover,
          foreground: true,
          borderless: false,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: theme.palette.primary.contrastText,
            fontSize: theme.typography.button.fontSize,
            textTransform: theme.typography.button.textTransform,
            lineHeight: theme.typography.button.lineHeight,
          }}
        >
          Save
        </Text>
      </Pressable>
    </View>
  );
}
