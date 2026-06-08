import { AppHeader } from "@/components/app-header";
import { Column, Host, Row, Text } from "@expo/ui";
import type { SnackbarHostRef } from "@expo/ui/jetpack-compose";
import { Card, SnackbarHost, Surface } from "@expo/ui/jetpack-compose";
import {
  clickable,
  fillMaxSize,
  fillMaxWidth,
  weight,
} from "@expo/ui/jetpack-compose/modifiers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setStringAsync } from "expo-clipboard";
import { ActivityAction, startActivityAsync } from "expo-intent-launcher";
import * as ExpoNet from "expo-network";
import React from "react";

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
  const snackbarRef = React.useRef<SnackbarHostRef>(null);

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
        <Column modifiers={[fillMaxSize()]}>
          <AppHeader pageName="Network" />
          <Column spacing={12} style={{ padding: 12 }} modifiers={[weight(1)]}>
            <Card
              modifiers={[
                fillMaxWidth(),
                clickable(() => {
                  startActivityAsync(ActivityAction.WIFI_SETTINGS);
                }),
              ]}
            >
              <Column style={{ padding: 14 }}>
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
                        snackbarRef.current?.showSnackbar({
                          message: error.message,
                        });
                      },
                      onSuccess() {
                        snackbarRef.current?.showSnackbar({
                          message: "Copied",
                        });
                      },
                    });
                  }),
                  fillMaxWidth(),
                ]}
              >
                <Column style={{ padding: 14 }}>
                  <Text textStyle={{ fontSize: 24 }}>IP</Text>
                  <Text textStyle={{ fontSize: 16 }}>{ip.data}</Text>
                </Column>
              </Card>
            )}
          </Column>
          <Row modifiers={[fillMaxWidth()]}>
            <SnackbarHost ref={snackbarRef} />
          </Row>
        </Column>
      </Surface>
    </Host>
  );
}
