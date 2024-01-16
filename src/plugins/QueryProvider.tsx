// Query Imports
import {
  QueryClient,
  DefaultOptions,
  onlineManager,
  focusManager,
} from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

// RN Imports
import { AppState, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

// React Imports
import React from "react";

export function QueryProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  // Refetch on App focus
  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (status) => {
      if (Platform.OS === "web") return;

      focusManager.setFocused(status === "active");

      return () => {
        subscription.remove();
      };
    });
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: queries(),
    mutations: mutations(),
  },
});

// Persist Query Client
const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "rn-query-persister",
});

// Refetch on reconnect
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(Boolean(state.isConnected));
  });
});

// Client Configuration
function queries(): DefaultOptions["queries"] {
  return {
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 2,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retryDelay(attemptIndex) {
      return Math.min(1000 * 2 ** attemptIndex, 1000 * 8);
    },
  };
}

function mutations(): DefaultOptions["mutations"] {
  return {};
}

// Defaults query or mutation
queryClient.setQueryDefaults(["unique"], {
  async queryFn() {
    return { msg: "hello world" };
  },
});
queryClient.setMutationDefaults(["post-demo"], {
  async mutationFn() {
    return { msg: "successly" };
  },
});
