import React from "react";
import { Text, View } from "react-native";
import { getIpAddressAsync } from "expo-network";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setStringAsync } from "expo-clipboard";

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
    <View>
      <Text>IP</Text>
      {ip.isPending && <Text>Loading...</Text>}
      {ip.isSuccess &&
        (
          <>
            <Text>
              {ip.data}
            </Text>
            <Text
              onPress={() => copy.mutate(ip.data)}
            >
              Copy
            </Text>
          </>
        )}
    </View>
  );
}
