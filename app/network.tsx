import React from "react";
import { getIpAddressAsync } from "expo-network";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setStringAsync } from "expo-clipboard";
import { Button, Card, H2, Paragraph, View } from "tamagui";

export default function Network() {
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
    <View padding="$2">
      <Card elevate elevation={"$0.25"} backgroundColor={"$background"}>
        <Card.Header padded>
          <H2 color="$color">
            IP
          </H2>
          {ip.isPending && <Paragraph>Loading...</Paragraph>}
          {ip.isSuccess &&
            (
              <Paragraph color="$color11">
                {ip.data}
              </Paragraph>
            )}
        </Card.Header>

        {ip.isSuccess && (
          <Card.Footer padded theme={"dark_Button"}>
            <Button
              onPress={() => copy.mutate(ip.data)}
              width={"100%"}
              color={"$color"}
              backgroundColor={"$primary"}
            >
              Copy
            </Button>
          </Card.Footer>
        )}
      </Card>
    </View>
  );
}
