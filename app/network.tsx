import { useStorageStore } from "@/hooks/useStorageStore";
import { Button, Card, Input, makeStyles } from "@rneui/themed";
import React from "react";
import { getIpAddressAsync } from "expo-network";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setStringAsync } from "expo-clipboard";

export default function Network() {
  const set = useStorageStore((s) => s.set);
  const [value, setValue] = React.useState("");
  const styles = useStyles();
  const ip = useQuery({
    queryKey: ["getIpAddressAsync"],
    queryFn() {
      return getIpAddressAsync();
    },
  });
  const copy = useMutation<boolean, Error, string>({
    async mutationFn(data) {
      const ok = await setStringAsync(data);

      if (ok) {
        return ok;
      }

      throw new Error("copy failed");
    },
  });

  return (
    <>
      <Card>
        <Card.Title>IP</Card.Title>
        {ip.isPending && (
          <Card.FeaturedSubtitle>Loading...</Card.FeaturedSubtitle>
        )}
        {ip.isSuccess &&
          (
            <>
              <Card.FeaturedSubtitle style={styles.ip}>
                {ip.data}
              </Card.FeaturedSubtitle>
              <Button
                icon={{ name: "content-copy", color: "#fff" }}
                onPress={() => copy.mutate(ip.data)}
                loading={copy.isPending}
              >
                Copy
              </Button>
            </>
          )}
      </Card>
      <Card>
        <Card.Title>API Key</Card.Title>
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
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  ip: {
    color: theme.colors.black,
  },
}));
