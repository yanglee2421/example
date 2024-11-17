import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useStorageStore } from "@/hooks/useStorageStore";

export function NeedAPIKEY() {
  const set = useStorageStore((s) => s.set);
  const [value, setValue] = React.useState("");

  return (
    <View>
      <Text>Need API Key</Text>
      <TextInput value={value} onChangeText={setValue} />
      <Button
        title="Save"
        onPress={() =>
          set((d) => {
            d.qqlykmKey = value;
          })}
      />
    </View>
  );
}
