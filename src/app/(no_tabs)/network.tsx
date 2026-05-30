import { Column, Host, Text } from "@expo/ui";
import { Card, Surface } from "@expo/ui/jetpack-compose";
import {
  clickable,
  fillMaxWidth,
  paddingAll,
} from "@expo/ui/jetpack-compose/modifiers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setStringAsync } from "expo-clipboard";
import { ActivityAction, startActivityAsync } from "expo-intent-launcher";
import * as ExpoNet from "expo-network";
import React from "react";
import { ToastAndroid } from "react-native";

const netSelector = <TError, TWarning, TSuccess>(
  isConnected: boolean,
  isInternetReachable: boolean,
  error: TError,
  warning: TWarning,
  success: TSuccess,
) => {
  if (!isConnected) {
    return error;
  }

  if (!isInternetReachable) {
    return warning;
  }

  return success;
};

export default function Network() {
  const ip = useQuery({
    queryKey: ["getIpAddressAsync"],
    queryFn: () => ExpoNet.getIpAddressAsync(),
    networkMode: "offlineFirst",
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
    mutationFn: async (data) => {
      const ok = await setStringAsync(data);

      if (ok) {
        return ok;
      }

      throw new Error("copy failed");
    },
    networkMode: "offlineFirst",
  });

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column modifiers={[paddingAll(12)]} spacing={12}>
          <Card
            modifiers={[
              clickable(() => startActivityAsync(ActivityAction.WIFI_SETTINGS)),
              fillMaxWidth(),
            ]}
          >
            <Column modifiers={[paddingAll(16)]}>
              <Text textStyle={{ fontSize: 24 }}>{state.type}</Text>
              <Text textStyle={{ fontSize: 16 }}>
                {netSelector(
                  !!state.isConnected,
                  !!state.isInternetReachable,
                  "No Connected",
                  "Connected but no internet",
                  "Ready",
                )}
              </Text>
            </Column>
          </Card>
          {ip.isSuccess && (
            <Card
              modifiers={[
                clickable(() => {
                  copy.mutate(ip.data, {
                    onError(error) {
                      ToastAndroid.show(error.message, 1000 * 2);
                    },
                    onSuccess() {
                      ToastAndroid.showWithGravity(
                        "Copied",
                        1000 * 2,
                        ToastAndroid.BOTTOM,
                      );
                    },
                  });
                }),
                fillMaxWidth(),
              ]}
            >
              <Column modifiers={[paddingAll(16)]}>
                <Text textStyle={{ fontSize: 24 }}>IP</Text>
                <Text textStyle={{ fontSize: 16 }}>{ip.data}</Text>
              </Column>
            </Card>
          )}
        </Column>
      </Surface>
    </Host>
  );
}
