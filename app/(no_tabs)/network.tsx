import { android_ripple } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setStringAsync } from "expo-clipboard";
import * as ExpoNet from "expo-network";
import { ActivityAction, startActivityAsync } from "expo-intent-launcher";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { fetchIp } from "@/api/qqlykm_cn";
import { Text } from "@/components/Text";

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
  const theme = useTheme();
  const ip = useQuery({
    queryKey: ["getIpAddressAsync"],
    queryFn: () => ExpoNet.getIpAddressAsync(),
    networkMode: "offlineFirst",
  });
  const netIp = useQuery(fetchIp({ params: {} }));

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

  const renderNetIP = () => {
    if (netIp.isPending) {
      return (
        <View>
          <ActivityIndicator size="small" color={theme.palette.primary.main} />
        </View>
      );
    }

    if (netIp.isError) {
      return (
        <Text
          style={[theme.typography.body1, { color: theme.palette.error.main }]}
        >
          {netIp.error.message}
        </Text>
      );
    }

    return (
      <View>
        <Text>{netIp.data.data.data.ip}</Text>
        <Text>{netIp.data.data.data.country}</Text>
        <Text>{netIp.data.data.data.net}</Text>
        <Text>{netIp.data.data.data.location}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: theme.spacing(3),
        gap: theme.spacing(4),
      }}
    >
      <Pressable
        onPress={() => startActivityAsync(ActivityAction.WIFI_SETTINGS)}
        style={[
          theme.shape,
          {
            borderColor: theme.palette.divider,
            borderWidth: 1,

            padding: theme.spacing(3),
          },
        ]}
        android_ripple={android_ripple(theme.palette.action.focus)}
      >
        <Text
          style={[
            theme.typography.body1,
            {
              color: theme.palette.text.primary,
            },
          ]}
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
                  "Copied",
                  1000 * 2,
                  ToastAndroid.BOTTOM,
                );
              },
            })
          }
          style={[
            theme.shape,
            {
              borderColor: theme.palette.divider,
              borderWidth: 1,

              padding: theme.spacing(3),
            },
          ]}
          android_ripple={android_ripple(theme.palette.action.focus)}
        >
          <Text
            style={[
              theme.typography.body1,
              {
                color: theme.palette.text.primary,
              },
            ]}
          >
            IP
          </Text>
          <Text
            style={[
              theme.typography.body2,
              {
                color: theme.palette.text.secondary,
              },
            ]}
          >
            {ip.data}
          </Text>
        </Pressable>
      )}

      {renderNetIP()}
    </ScrollView>
  );
}
