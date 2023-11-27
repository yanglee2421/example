// Query Imports
import {
  QueryClient,
  DefaultOptions,
  onlineManager,
  focusManager,
} from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

// RN Storage Imports
import AsyncStorage from "@react-native-async-storage/async-storage";

import NetInfo from "@react-native-community/netinfo";

// ** QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: queries(),
    mutations: mutations(),
  },
});

export const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "rn-query-persister",
});

// Refetch on reconnect
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(Boolean(state.isConnected));
  });
});

// Refetch on focus

// ** Defaults
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

// ** Config
function queries(): DefaultOptions["queries"] {
  return {
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 2,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retryDelay(attemptIndex) {
      return Math.min(1000 * 2 ** attemptIndex, 30000);
    },
  };
}

function mutations(): DefaultOptions["mutations"] {
  return {};
}
