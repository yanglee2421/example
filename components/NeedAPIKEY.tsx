import React from "react";
import { useStorageStore } from "@/hooks/useStorageStore";
import { Button, Card, H4, Input, View } from "tamagui";

export function NeedAPIKEY() {
  const set = useStorageStore((s) => s.set);
  const [value, setValue] = React.useState("");

  return (
    <Card bordered margin="$2.5">
      <Card.Header padded>
        <H4>Need API Key</H4>
      </Card.Header>
      <View paddingInline="$4">
        <Input value={value} onChangeText={setValue} />
      </View>
      <Card.Footer padded>
        <Button
          onPress={() =>
            set((d) => {
              d.qqlykmKey = value;
            })}
          flex={1}
          backgroundColor={"$palette.primary"}
          color={"$gray12Dark"}
        >
          Save
        </Button>
      </Card.Footer>
    </Card>
  );
}
