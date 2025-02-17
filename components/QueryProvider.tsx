import React from "react";
import { AppState, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { qqlykm } from "@/api/qqlykm";
import { useStorageStore } from "@/hooks/useStorageStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3,
      gcTime: 1000 * 60 * 5,

      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,

      retry: 1,
      retryDelay(attemptIndex) {
        return Math.min(1000 * 2 ** attemptIndex, 1000 * 8);
      },
      networkMode: "always",
    },
    mutations: {
      networkMode: "always",
    },
  },
});

export const QueryProvider = (props: React.PropsWithChildren) => {
  useSyncOnline();
  useSyncFocus();
  useSyncQqlykm();

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

const useSyncOnline = () => {
  React.useEffect(() => {
    if (Platform.OS === "web") return;

    return NetInfo.addEventListener((state) =>
      onlineManager.setOnline(
        Boolean(state.isConnected && state.isInternetReachable)
      )
    );
  }, []);
};

const useSyncFocus = () => {
  React.useEffect(() => {
    if (Platform.OS === "web") return;

    const subscription = AppState.addEventListener("change", (status) =>
      focusManager.setFocused(status === "active")
    );

    return () => subscription.remove();
  }, []);
};

const useSyncQqlykm = () => {
  const qqlykmKey = useStorageStore((s) => s.qqlykmKey);

  // Checking the API_KEY must happen before the component is presented to the user
  React.useInsertionEffect(() => {
    const id = qqlykm.interceptors.request.use((config) => {
      if (!qqlykmKey) {
        throw new Error("API_KEY not ready");
      }

      config.params = { ...(config.params || {}), key: qqlykmKey };

      return config;
    });

    return () => qqlykm.interceptors.request.eject(id);
  }, [qqlykmKey]);
};
