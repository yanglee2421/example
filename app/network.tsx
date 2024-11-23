import React from "react";
import { getIpAddressAsync } from "expo-network";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setStringAsync } from "expo-clipboard";
import { useStorageStore } from "@/hooks/useStorageStore";
import { Pressable, ScrollView, Text, View } from "react-native";
import { android_ripple } from "@/lib/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Network() {
  const theme = useStorageStore((s) => s.theme);
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
    <ScrollView contentContainerStyle={{ padding: theme.space(3) }}>
      <View
        style={[theme.shape, {
          borderColor: theme.palette.divider,
          borderWidth: 1,

          padding: theme.space(3),
        }]}
      >
        <Text
          style={[theme.typography.h5, { color: theme.palette.text.primary }]}
        >
          IP
        </Text>
        {ip.isPending && (
          <Text
            style={[theme.typography.body1, {
              color: theme.palette.text.primary,
            }]}
          >
            Loading...
          </Text>
        )}
        {ip.isSuccess && (
          <Text
            style={[theme.typography.body1, {
              color: theme.palette.text.primary,
            }]}
          >
            {ip.data}
          </Text>
        )}
        {ip.isSuccess && (
          <Pressable
            onPress={() => copy.mutate(ip.data)}
            disabled={copy.isPending}
            style={[{
              backgroundColor: copy.isPending
                ? theme.palette.action.disabledBackground
                : theme.palette.primary.main,

              paddingInline: theme.space(4),
              paddingBlock: theme.space(2),
              marginBlockStart: theme.space(3),

              borderWidth: 1,
              borderColor: "transparent",

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: theme.space(2),
            }, theme.shape]}
            android_ripple={android_ripple(theme.palette.action.focus)}
          >
            <MaterialCommunityIcons
              name="content-copy"
              size={theme.space(5)}
              color={theme.palette.primary.contrastText}
              style={{ marginInlineStart: theme.space(-1) }}
            />
            <Text
              style={[theme.typography.button, {
                color: copy.isPending
                  ? theme.palette.action.disabled
                  : theme.palette.primary.contrastText,
                textAlign: "center",
              }]}
            >
              Copy
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}
