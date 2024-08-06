import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  onlineManager,
  focusManager,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { Platform, AppState } from "react-native";

export function QueryProvider(props: React.PropsWithChildren) {
  React.useEffect(() => {
    if (Platform.OS === "web") {
      return;
    }

    return NetInfo.addEventListener((state) => {
      onlineManager.setOnline(
        Boolean(state.isConnected && state.isInternetReachable),
      );
    });
  }, []);

  React.useEffect(() => {
    if (Platform.OS === "web") {
      return;
    }

    const subscription = AppState.addEventListener("change", (status) => {
      focusManager.setFocused(status === "active");
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 2,

      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,

      retry: 1,
      retryDelay(attemptIndex) {
        return Math.min(1000 * 2 ** attemptIndex, 1000 * 8);
      },
    },
  },
});
