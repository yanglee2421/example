import React from "react";
import * as ExpoNet from "expo-network";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setStringAsync } from "expo-clipboard";
import { useStorageStore } from "@/hooks/useStorageStore";
import { Pressable, ScrollView, Text, ToastAndroid } from "react-native";
import { android_ripple } from "@/lib/utils";
import { ActivityAction, startActivityAsync } from "expo-intent-launcher";

export default function Network() {
  const theme = useStorageStore((s) => s.theme);
  const ip = useQuery({
    queryKey: ["getIpAddressAsync"],
    queryFn() {
      return ExpoNet.getIpAddressAsync();
    },
  });

  const state = ExpoNet.useNetworkState();

  const refetch = ip.refetch;
  React.useEffect(() => {
    const sub = ExpoNet.addNetworkStateListener(() => {
      refetch();
    });

    return () => {
      sub.remove();
    };
  }, [refetch]);

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
    <ScrollView
      contentContainerStyle={{ padding: theme.space(3), gap: theme.space(4) }}
    >
      <Pressable
        onPress={() => startActivityAsync(ActivityAction.WIFI_SETTINGS)}
        style={[theme.shape, {
          borderColor: theme.palette.divider,
          borderWidth: 1,

          padding: theme.space(3),
        }]}
        android_ripple={android_ripple(theme.palette.action.focus)}
      >
        <Text
          style={[theme.typography.body1, {
            color: theme.palette.text.primary,
          }]}
        >
          {state.type}
        </Text>
        <Text
          style={[
            theme.typography.body2,
            {
              color: netSelector(
                !!state.isConnected,
                !!state.isInternetReachable,
                theme.palette.error.main,
                theme.palette.warning.main,
                theme.palette.success.main,
              ),
            },
          ]}
        >
          {netSelector(
            !!state.isConnected,
            !!state.isInternetReachable,
            "No Connected",
            "Connected but no internet",
            "Ready",
          )}
        </Text>
      </Pressable>

      {ip.isSuccess && (
        <Pressable
          onPress={() =>
            copy.mutate(ip.data, {
              onError(error) {
                ToastAndroid.show(error.message, 1000 * 2);
              },
              onSuccess() {
                ToastAndroid.showWithGravity(
                  "Copyed",
                  1000 * 2,
                  ToastAndroid.BOTTOM,
                );
              },
            })}
          style={[theme.shape, {
            borderColor: theme.palette.divider,
            borderWidth: 1,

            padding: theme.space(3),
          }]}
          android_ripple={android_ripple(theme.palette.action.focus)}
        >
          <Text
            style={[theme.typography.body1, {
              color: theme.palette.text.primary,
            }]}
          >
            IP
          </Text>
          <Text
            style={[theme.typography.body2, {
              color: theme.palette.text.secondary,
            }]}
          >
            {ip.data}
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

function netSelector<TError, TWarning, TSuccess>(
  isConnected: boolean,
  isInternetReachable: boolean,
  error: TError,
  warning: TWarning,
  success: TSuccess,
) {
  if (!isConnected) {
    return error;
  }

  if (!isInternetReachable) {
    return warning;
  }

  return success;
}
