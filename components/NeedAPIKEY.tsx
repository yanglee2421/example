import { Button, Card, Input } from "@rneui/themed";
import React from "react";
import { useStorageStore } from "@/hooks/useStorageStore";

export function NeedAPIKEY() {
  const set = useStorageStore((s) => s.set);
  const [value, setValue] = React.useState("");

  return (
    <Card>
      <Card.Title>Need API Key</Card.Title>
      <Input value={value} onChangeText={setValue} />
      <Button
        icon={{
          name: "content-save-outline",
          type: "material-community",
          color: "#fff",
        }}
        onPress={() =>
          set((d) => {
            d.qqlykmKey = value;
          })}
      >
        Save
      </Button>
    </Card>
  );
}
